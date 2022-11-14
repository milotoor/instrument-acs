# The Instrument ACS

The [Instrument Airmen Certification Standards
(ACS)](https://www.faa.gov/training_testing/testing/acs/media/instrument_rating_acs_change_1.pdf)
is a document specifying the aeronautical knowledge, risk management, and flight
proficiency standards for the FAA's instrument rating. Pilots seeking to acquire
an instrument rating must demonstrate proficiency, in both knowledge and skill,
for every task in the ACS. It is the foundational document for the instrument
check ride, and every instrument student should know it inside and out.

[This website](https://milo.aero/) is one student's attempt to prepare for the
practical test in a visual pleasing and shareable way. I hope you find it
useful! If you see something incorrect, please contact me or open an issue.

## Disclaimer

***PLEASE NOTE:*** the author of this project is not an authority figure of any
sort. I am not an instrument ground instructor, CFII or DPE. The information
presented on this website has been procured from various sources, many of which
are explicitly cited where appropriate. HOWEVER, my own opinions and preferences
are also presented here, and it is left to the reader to determine which
information is fact or fiction. Use the cited sources and trust me at your own
peril!

## Structure

To quote the ACS itself:

> The ACS consists of ***Areas of Operation*** arranged in a logical sequence,
> beginning with Preflight Preparation and ending with Postflight Procedures.
> Each Area of Operation includes ***Tasks*** appropriate to that Area of
> Operation. Each Task begins with an ***Objective*** stating what the applicant
> should know, consider, and/or do. The ACS then lists the aeronautical
> knowledge, risk management, and skill elements relevant to the specific Task,
> along with the conditions and standards for acceptable performance.

To a great extent, this project seeks to mirror the structure of the ACS. Within
the `pages` directory there are 8 subdirectories, one per ACS Area of Operation
(AO). Every task within each AO has its own file within the subdirectory. Each
is a `.tsx` file--i.e. a [React](https://reactjs.org/) file written in
[TypeScript](https://www.typescriptlang.org/). The project uses
[Next.js](https://nextjs.org/) to structure the codebase and build the
application. Separately, each ACS task gets its own `.toml` file within a
subdirectory of the `acs` directory.

## Development

Pull requests and issues are welcome. To develop locally: clone the repository,
install dependencies and run `npm run dev`:

``` shell
git clone git@github.com:milotoor/instrument-acs.git
cd instrument-acs
npm run install
npm run dev
```

Alternatively, issues can be reported from the "Issues" tab.
