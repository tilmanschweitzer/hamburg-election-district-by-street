interface SearchData {
  street: string
  number?: string
}

interface StreetNumber {
  v: number // value
  s: string // suffix
}

interface Entry {
  min: StreetNumber
  max: StreetNumber
  ed: string // election district
  edn: number // election distict number
  s: string // Street
  ns: number, // Number schema
  sd: string, // sub district
  d: string, // district
  z: string // zip code
}
