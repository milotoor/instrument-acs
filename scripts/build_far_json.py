import json
from pathlib import Path
import requests

base_url = "https://www.ecfr.gov/api/versioner/v1/"
child_key = "children"
description_key = "label_description"
id_key = "identifier"
range_separator = " – "


class FARJSONBuilder:
    """
    Builds the JSON for each FAR part of interest. In order to link to the sections cited within our application we need
    to know some extra information about where to find its text within the CFR as a whole. For example, FAR 91.3
    (Responsibility and authority of the pilot in command) is found at the following URL:

        https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-A/section-91.3

    Thus, in order to access it we need to know the chapter (I), subchapter (F), part (91), subpart (A) and section (3).
    When referring to it within the application it should be sufficient to specify 91.3; but that means that behind the
    scenes the application must look up the chapter, subchapter and subpart automatically. To enable this we will create
    a JSON structure ordered like so:

      {
        "43": {
          "description": "Maintenance, Preventive Maintenance, Rebuilding, and Alteration",
          "chapter": "I",
          "subchapter": "C",
          "sections": {
            "1": "Applicability.",
            ...
          }
        },
        "61": {
          ...
          "subparts": {
            "A": {
              ...
              "section_range": [1, 60],
              "sections": {
                "1": "Applicability and definitions.",
                ...
              }
            },
            ...
          }
        },
        ...
      }

    The top level contains the parts of interest. Nested under that is some metadata as well as subparts and sections.
    If a part has no subparts (e.g. part 43) it contains the sections directly; if it does (e.g. part 61), it lists its
    subparts and each subpart lists its contained sections.

    To generate this structure we make two requests. The first is to `/api/versioner/v1/titles.json` to determine the
    most recent version of title 14. With that information we then query for the entire structure of title 14 and winnow
    it down to only the parts of interest.
    """

    def __init__(self, parts: list[int]):
        self.parts = parts

        issue_date = requests.get(base_url + "titles.json").json()["meta"]["date"]
        title_14 = requests.get(base_url + f"structure/{issue_date}/title-14.json").json()

        # All parts of interest are contained in chapter 1 of title 14
        self.json = title_14[child_key][0]

    @property
    def subchapters(self):
        return self.json[child_key]

    @staticmethod
    def get_children(json_obj, child_type: str):
        return [child for child in json_obj[child_key] if child["type"] == child_type]

    @staticmethod
    def get_range(json_obj):
        descendant_range = json_obj["descendant_range"]

        def drop_prefix(range_str):
            return int(range_str.split(".")[-1] if "." in range_str else range_str)

        if range_separator in descendant_range:
            start, end = json_obj["descendant_range"].split(range_separator)
            start = drop_prefix(start)
            end = drop_prefix(end)
        else:
            descendant_range = drop_prefix(descendant_range)
            start = end = descendant_range
        return start, end

    @classmethod
    def get_sections(cls, children: list) -> dict:
        sections = {}
        subject_groups = {}

        for child in children:
            child_type = child["type"]
            if child_type == "section" and not child["reserved"]:
                section_num = child[id_key].split(".")[-1]
                sections[section_num] = child[description_key]
            # Some subparts are further divided into "subject groups"--see part 91, section B
            elif child_type == "subject_group":
                subject_groups[child[id_key]] = cls.get_range(child)
                sections.update(cls.get_sections(child[child_key])["sections"])

        section_dict = {"sections": sections}
        if subject_groups:
            section_dict["subject_groups"] = subject_groups
        return section_dict

    def build_part(self, part_num: int):
        part, subchapter = self.find_part(part_num)
        part_dict = {"chapter": "I", "description": part[description_key], "subchapter": subchapter[id_key]}

        subparts = self.get_children(part, "subpart")
        if subparts:
            part_dict["subparts"] = {
                subpart[id_key]: {
                    "description": subpart[description_key],
                    "section_range": self.get_range(subpart),
                    **self.get_sections(subpart[child_key]),
                }
                for subpart in subparts
            }
        else:
            # If there are no subparts there should be "sections" instead
            part_dict.update(self.get_sections(part[child_key]))

        return part_dict

    def find_part(self, part_num: int):
        # First find the subchapter containing it
        subchapter_with_part = None
        for subchapter in self.subchapters:
            part_range = self.get_range(subchapter)
            if part_range[0] <= part_num <= part_range[1]:
                subchapter_with_part = subchapter
                break

        err = f"Unable to find part {part_num}"
        if not subchapter_with_part:
            raise ValueError(err)

        subchapter_parts = subchapter_with_part[child_key]
        for part in subchapter_parts:
            if int(part[id_key]) == part_num:
                return part, subchapter_with_part
        raise ValueError(err)

    def generate(self):
        """Save the results to the data directory"""
        far_data = {part: self.build_part(part) for part in self.parts}
        data_dir = Path(__file__).parent.parent / "data"
        with open(data_dir / "far.json", "w") as f:
            json.dump(far_data, f, indent=2)


if __name__ == "__main__":
    builder = FARJSONBuilder(parts=[43, 61, 68, 91, 95])
    builder.generate()
