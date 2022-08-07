# Scripts

## `convert_image`

This bash script makes it easy to convert most images downloaded from the web into the [webp](https://developers.google.com/speed/webp) format that Instrument ACS uses. A prerequisite for using the script
is to get the [`cwebp`](https://developers.google.com/speed/webp/docs/cweb) command line utility.

Usage:

```sh
> ./convert_image SECTION_NUMBER FILENAME_PREFIX
```

For example:

```
> ./convert_image 1 cloud
Converted image './clouds.jpeg'
```

## `make_tsx_files`

This script generates the ACS files and directories within the `pages` directory, using the `data/acs` directory's `.toml` files as a basis for doing so. Requires `ts-node` and project dependencies to be installed. This script was useful during the early phase of the `instrument_acs` project to bootstrap the TypeScript files for each of the ACS tasks, but it doesn't have much value anymore.

Usage:

```sh
./make_tsx_files.ts
```
