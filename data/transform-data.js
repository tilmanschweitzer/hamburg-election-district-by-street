import fs from 'fs'
import { parseStreetData } from './hamburg-street-data-parser.js'
import { streetNumber } from './street-number-parser.js'

const filename = "data/streets_of_hamburg_election_2025.csv";
const outputFilename = "src/assets/streets_of_hamburg_election_2025.json";

const electionDistricts = [
  "Alstertal - Walddörfer",
  "Altona",
  "Altona-West",
  "Barmbek - Uhlenhorst - Dulsberg",
  "Bergedorf",
  "Billstedt - Wilhelmsburg - Finkenwerder",
  "Bramfeld – Farmsen-Berne – Steilshoop",
  "Harburg", // 16
  "Hamburg-Mitte",
  "Eppendorf – Winterhude – Hoheluft-Ost",
  "Eidelstedt – Stellingen – Eimsbüttel-West",
  "Fuhlsbüttel - Alsterdorf - Langenhorn",
  "Lokstedt - Niendorf - Schnelsen",
  "Rahlstedt",
  "Rotherbaum - Harvestehude - Eimsbüttel-Ost",
  "Süderelbe",
  "Wandsbek"
]

const content = fs.readFileSync(filename).toString()

const parsedStreetData = parseStreetData(content, {
  lineDelimiter: "\r\n",
  columnDelimiter: ",",
  fieldNames: [
    "s", // street
    "min", // min number
    "max", // max number
    "ns", // number schema
    "ed", // election district
    "edn", // election district name
    "sd", // sub district
    "d", // district
    "z" // zip code
  ],
  fieldParsers: {
    ns: parseInt,
    edn: parseInt,
    min: streetNumber,
    max: streetNumber
  },
  constraints: {
    ed: (value) => electionDistricts.includes(value),
    edn: (value) => value >= 1 && value <= 17,
    z: (value) => value.length === 5
  }

})


console.log(parsedStreetData)


fs.writeFileSync(outputFilename, JSON.stringify(parsedStreetData))


