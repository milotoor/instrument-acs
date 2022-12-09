from bs4 import BeautifulSoup, Tag
from pathlib import Path
import re
import requests
import tomli_w

base_url = "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/"
paragraph_name_regex = re.compile(r"(\d+-\d+-\d+.) (.*)")

NamesList = list[str]
NamesAndSubsections = tuple[str, "AIMData"]
AIMData = NamesList | list[NamesAndSubsections]


def fetch_url(url: str):
    page = requests.get(url)
    return BeautifulSoup(page.content, "html.parser")


def get_chapters():
    """
    Retrieves the AIM index page (at base_url) to parse the top-level chapters. Returns a list of strings; the string at
    index n represents the (1-indexed) nth chapter name.
    """
    soup = fetch_url(base_url)

    i = 1
    chapters = []
    while True:
        chapter_nodes = soup.find_all(class_=f"chap_{i}")
        if len(chapter_nodes) == 0:
            break
        elif len(chapter_nodes) > 1:
            raise ValueError(f"Unexpected number of nodes with class `chap_{i}`")
        name = chapter_nodes[0].text
        chapters.append(name)
        i += 1

    return chapters


def get_sections(chapter_num: int) -> list[NamesAndSubsections]:
    """
    Retrieves the index page for a given chapter of the AIM and parses the results. Returns a list of 2-tuples; the nth
    tuple represents the nth section of the chapter; the first element of the tuple is the section name and the second
    is a list of paragraph names under the section.
    """
    soup = fetch_url(base_url + f"chap_{chapter_num}.html")
    toc_node = soup.find("ul", class_="book-chapter")
    sections = []

    for section_list_item in toc_node.children:
        # The last child is sometimes an empty string
        if not isinstance(section_list_item, Tag):
            break

        section_name = section_list_item.find("a", class_="section-link").text
        paragraphs = section_list_item.find_all("a", class_="paragraph-link")

        # The paragraph names include the "1-2-3." in front. The second matched group is the actual paragraph name
        paragraph_names = [paragraph_name_regex.match(paragraph.text).groups()[1] for paragraph in paragraphs]
        sections.append((section_name, paragraph_names))

    return sections


def create_toml_object(data: AIMData):
    if type(data[0]) == str:
        return {str(i + 1): datum.strip() for i, datum in enumerate(data)}
    return {str(i + 1): {"name": name.strip(), **create_toml_object(subdata)} for i, (name, subdata) in enumerate(data)}


def write_to_file(data: AIMData):
    """Save the results to the data directory"""
    results = create_toml_object(data)
    data_dir = Path(__file__).parent.parent / "data"
    with open(data_dir / "aim.toml", "bw") as f:
        tomli_w.dump(results, f)


def scrape():
    """
    Main scraping function. Sends out an initial request to retrieve the AIM chapters, then one additional request per
    chapter to acquire chapter-level structure. Synthesizes the results into an object and writes it to a TOML file
    """
    chapters = get_chapters()
    aim_data = [(chapter, get_sections(i + 1)) for i, chapter in enumerate(chapters)]
    write_to_file(aim_data)


if __name__ == "__main__":
    scrape()
