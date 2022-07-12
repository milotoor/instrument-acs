"""
This script assists in parsing an ACS task as copied from the FAA's Instrument Rating ACS PDF
into our custom TOML format
"""

import attr
import click
from functools import cached_property
import os
from pathlib import Path
import re
import tomli_w
from typing import List


TaskLines = List[str]

AGNOSTIC_REGEX = "IR\.{number}\.{task_letter}\.{section_letter}([^\s]*)"


@attr.s(auto_attribs=True)
class TaskFile:
    section: int
    letter: str

    def convert(self):
        parsed = self.extract_meta()
        parsed.update(self.extract_section("knowledge"))
        parsed.update(self.extract_section("risk_management"))
        parsed.update(self.extract_section("skills"))
        self.write_toml(parsed)

    def extract_meta(self):
        references, _ = self.get_line_starting_with("References")
        references = re.split("; |, ", references)
        objective, _ = self.get_line_starting_with("Objective")
        return {
            "meta": {
                "letter": self.letter,
                "objective": objective,
                "name": self.raw_path.name[len("Task A. ") : -len(".txt")],
                "references": references,
            }
        }

    def extract_section(self, section: str):
        data = {}
        regex = self.make_regex(section[0].upper())
        for line in self.task_lines:
            match = re.match(regex, line)
            if match:
                element_id = section[0] + match.groups()[0].lower()
                element_text = re.sub(regex, "", line).strip()
                data[element_id] = element_text
        return {section: data}

    def get_line_starting_with(self, text: str | re.Pattern, remove: bool = True):
        line_info = None
        for i, line in enumerate(self.task_lines):
            if type(text) == str and line.startswith(text):
                line_info = (line, i)
                break
            elif type(text) == re.Pattern and re.match(text, line):
                line_info = (line, i)
                break

        if line_info is None:
            raise ValueError(f'No line in task file starts with "{text}"')

        line, i = line_info
        if remove:
            line = line[len(text) :].strip()
        return line, i

    knowledge_regex = property(lambda self: self.make_regex("K"))
    risk_management_regex = property(lambda self: self.make_regex("R"))
    skill_regex = property(lambda self: self.make_regex("S"))

    def make_regex(self, section_letter: str):
        return re.compile(
            AGNOSTIC_REGEX.format(
                number=self.roman_numeral,
                task_letter=self.letter,
                section_letter=section_letter,
            )
        )

    @property
    def roman_numeral(self):
        numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
        return numerals[self.section - 1]

    @cached_property
    def task_lines(self) -> TaskLines:
        return self.task_text.splitlines()

    @property
    def parsed_path(self):
        """Converts the raw .txt file path to the parsed .toml path"""
        parts = list(self.raw_path.parts)
        parts[-1] = parts[-1].replace(".txt", ".toml")

        # Remove the "raw" directory from the path
        raw_index = parts.index("raw")
        parts = parts[:raw_index] + parts[raw_index + 1 :]
        return Path(os.path.join(*parts))

    @cached_property
    def raw_path(self):
        """
        Given the area of operation number and the task letter, this function will look up the name
        of the AO's directory and then look up the first file it finds beginning with
        "Task [task_letter]". The raw contents of the file are returned.
        """
        area_dir = None
        file_dir = os.path.dirname(__file__)
        areas_path = os.path.join(file_dir, "../areas_of_operation/raw")
        areas_path = Path(os.path.normpath(areas_path))
        for dir_path in areas_path.iterdir():
            if dir_path.name.startswith(str(self.section)) and dir_path.is_dir():
                area_dir = dir_path
                break

        if area_dir is None:
            raise ModuleNotFoundError(f"No area of operation {self.section} found")

        # Find the task in the area directory with the expected number
        file_name = f"Task {self.letter.upper()}."
        for task_path in area_dir.iterdir():
            if task_path.name.startswith(file_name) and task_path.is_file():
                return task_path

        raise ModuleNotFoundError(
            f"No task {self.letter.upper()} found for area of operation {self.section}"
        )

    @cached_property
    def task_text(self):
        return self.raw_path.read_text()

    def write_toml(self, parsed):
        with open(self.parsed_path, "wb") as f:
            tomli_w.dump(parsed, f)


if __name__ == "__main__":
    tasks_by_section = [3, 3, 2, 2, 2, 5, 4, 1]
    letters = "ABCDE"
    for i, num_tasks in enumerate(tasks_by_section):
        for j in range(num_tasks):
            TaskFile(i + 1, letters[j]).convert()
