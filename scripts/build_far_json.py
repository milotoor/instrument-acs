import json
from pathlib import Path
import requests

base_url = "https://www.ecfr.gov/api/versioner/v1/"
cited_sections = {
    43: [9],
    61: [3, 23, 51, 57, 65, 113, 195],
    68: [3, 7],
    91: [
        3,
        21,
        103,
        109,
        121,
        123,
        126,
        144,
        155,
        159,
        167,
        169,
        171,
        173,
        175,
        177,
        185,
        205,
        207,
        211,
        213,
        215,
        225,
        227,
        403,
        409,
        411,
        413,
        417,
    ],
    95: [15],
}


class FARJSONBuilder:
    """
    Builds the JSON for each section of 14 CFR cited in our application. In order to link to the sections we need to
    know some extra information about where to find its text within the CFR as a whole. For example, FAR 91.3
    (Responsibility and authority of the pilot in command) is found at the following URL:

        https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91/subpart-A/section-91.3

    Thus, in order to access it we need to know the chapter (I), subchapter (F), part (91), subpart (A) and section (3).
    When referring to it within the application it should be sufficient to specify 91.3; but that means that behind the
    scenes the application must look up the chapter, subchapter and subpart automatically. To enable this we will create
    a JSON structure ordered like so:

      {
        "43.1": [
          { "id": "C", "description": "Aircraft", "type": "subchapter" },
          {
            "id": "43",
            "description": "Maintenance, Preventive Maintenance, Rebuilding, and Alteration",
            "type": "part",
          },
          { "id": "1", "description": "Applicability.", "type": "section" }
        ],

        ...

        "61.3": [
          { "id": "D", "description": "Airmen", "type": "subchapter" },
          {
            "id": "61",
            "description": "Certification: Pilots, Flight Instructors, and Ground Instructors",
            "type": "part",
          },
          { "id": "A", "description": "General", "type": "subpart" },
          {
            "id": "61.3", "description": "Requirement for certificates, ratings, and authorizations.", "type": "section"
          }
        ]

        ...

        "91.101": [
          { "id": "F", "description": "Air Traffic and General Operating Rules", "type": "subchapter" },
          { "id": "91", "description": "General Operating and Flight Rules", "type": "part" },
          { "id": "B", "description": "Flight Rules", "type": "subpart" },
          { "id": "ECFRe4c59b5f5506932", "description": "General", "type": "subject_group" },
          { "id": "91.101", "description": "Applicability.", "type": "section" }
        ]
      }

    The top level contains the sections of interest. Nested under each is an array of identifiers, one identifier per
    parent in the CFR ontology leading to that section. Each identifier contains three keys: "type" (indicating what
    sort of parent is identified, i.e. "subchapter", "part", "subpart", etc.), "description" (the name of the identified
    parent) and "id" (the parent's ID). Together these describe precisely how to access the cited FAR section within the
    eCFR website. (Note that the CFR title (14) and chapter ("I") are omitted because they are the same across all
    citations)

    To generate this structure we make one request per cited section, using the eCFR API endpoint
    `/api/versioner/v1/ancestry/{date}/title-{title}.json`. For instance, to look up FAR 91.175 we would use the URL:

        https://www.ecfr.gov/api/versioner/v1/ancestry/2022-12-22/title-14.json?part=91&section=91.175

    Importantly, the `date` parameter must first be looked up independently using the `/api/versioner/v1/titles.json`
    endpoint. This will yield the publication date of the most recent version of title 14. After that it's just a matter
    of querying for each cited section and trimming the results.
    """

    def __init__(self):
        self.issue_date = requests.get(base_url + "titles.json").json()["meta"]["date"]
        self.json = {"subchapters": {}, "parts": {}, "subparts": {}, "subject_groups": {}, "sections": {}}

    def build_section(self, part: int, section: int):
        uri = base_url + f"ancestry/{self.issue_date}/title-14.json?part={part}&section={part}.{section}"
        section_ancestry = requests.get(uri).json()["ancestors"]

        section_identifiers = []
        for i, ancestor in enumerate(section_ancestry):
            anc_type = ancestor["type"]
            anc_id = ancestor["identifier"]
            anc_desc = ancestor["label_description"]

            # Drop the period at the end of certain elements
            if anc_desc[-1] == ".":
                anc_desc = anc_desc[:-1]

            # The title is always 14 and chapter always I. The part is included in the citation and the subchapter is
            # identifiable from the part. The section is handled differently and includes its description, not its ID.
            if anc_type in ["subpart", "subject_group"]:
                section_identifiers.append(anc_id)

            if anc_type in ["subchapter", "subject_group"]:
                self.json[anc_type + "s"][anc_id] = anc_desc
            # The part includes which subchapter it's in. The subchapter is always one above the part
            elif anc_type == "part":
                self.json["parts"][anc_id] = [section_ancestry[i - 1]["identifier"], anc_desc]
            elif anc_type == "subpart":
                self.json["subparts"][f"{part}.{anc_id}"] = anc_desc
            # The section specifies its subpart and subject group (if applicable) and appends its description
            elif anc_type == "section":
                self.json["sections"][anc_id] = section_identifiers + [anc_desc]

    def generate(self):
        """Save the results to the data directory"""
        for part, sections in cited_sections.items():
            for section in sections:
                self.build_section(part, section)

        data_dir = Path(__file__).parent.parent / "data"
        with open(data_dir / "far.json", "w") as f:
            json.dump(self.json, f, indent=2)


if __name__ == "__main__":
    builder = FARJSONBuilder()
    builder.generate()
