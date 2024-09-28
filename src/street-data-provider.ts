import streetsOfHamburg from './assets/streets_of_hamburg_election_2025.json'

export const allStreets: string[] = [];

streetsOfHamburg.forEach(streetOfHamburg => {
  if (!allStreets.includes(streetOfHamburg.s)) {
    allStreets.push(streetOfHamburg.s)
  }
})
