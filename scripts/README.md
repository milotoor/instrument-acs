# Scripts

## `convert_image`

This bash script makes it easy to convert most images downloaded from the web
into the [webp](https://developers.google.com/speed/webp) format that Instrument
ACS uses. A prerequisite for using the script is to get
the [`cwebp`](https://developers.google.com/speed/webp/docs/cweb) command line
utility.

Usage:

```sh
> ./convert_image SECTION_NUMBER FILENAME_PREFIX
```

For example:

```
> ./convert_image 1 cloud
Converted image './clouds.jpeg'
```

## `scrape_aim`

This is a Python script which will scrape the FAA's AIM website to gather what
amounts to a table of contents for the AIM. It generates the `data/aim.json`
file.

Usage:

```shell
python ./scrape_aim.py
```
