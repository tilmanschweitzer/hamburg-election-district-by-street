<script setup lang="ts">

import streetsOfHamburg from '../assets/streets_of_hamburg_election_2025.json'

import { type Ref, ref, watchEffect } from 'vue'

const props = defineProps<{
  selectedStreet: string,
}>()

const electionDistricts: Ref<string[]> = ref([]);

function electionDistrictFromEntry(entry: Entry): string {
  return entry.edn + " - " + entry.ed;
}

function addElectionDistrict(entry: Entry) {
  const electionDistrict = electionDistrictFromEntry(entry);
  if (!electionDistricts.value.includes(electionDistrict)) {
    electionDistricts.value.push(electionDistrict)
  }
}

function entryMatchesNumber(entry: Entry, searchData: SearchData) {
  const number = parseInt(searchData.number);

  // All numbers
  if (entry.ns === 3) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  // Even only
  if (entry.ns === 2 && number % 2 === 0) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  // Odd only
  if (entry.ns === 1 && number % 2 === 1) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  return false
}

function entryMatchesSearch(entry: Entry, searchData: SearchData) {
  if (!entry.s.startsWith(searchData.street)) {
    return false;
  }
  if (searchData.number && !entryMatchesNumber(entry, searchData)) {
    return false;
  }
  return true;
}

function updateElectionDistricts(searchData: SearchData) {
  electionDistricts.value = [];

  (streetsOfHamburg as Entry[]).forEach(entry => {

    if (entryMatchesSearch(entry, searchData)) {
      addElectionDistrict(entry);
    }
  });

  electionDistricts.value.sort();
}

updateElectionDistricts({street: props.selectedStreet})

watchEffect(() => {
  updateElectionDistricts({street: props.selectedStreet})
})

</script>

<template>
  <div>
    <div v-if="selectedStreet === ''">
      <h2>Keine Straße ausgewählt</h2>
    </div>
    <div v-else>
      <h2>Ausgewählte Straße: {{ selectedStreet }}</h2>

      <div v-if="electionDistricts.length === 0">
        <h2>Achtung: Kein Ergebnis</h2>
      </div>
      <div v-if="electionDistricts.length > 1">
        Achtung: Kein <u>eindeutiges</u> Ergebnis
        <div>
          <ul>
            <li v-for="electionDistrict in electionDistricts">{{ electionDistrict }}</li>
          </ul>
        </div>
      </div>
      <div v-if="electionDistricts.length === 1">
        <h2>{{ electionDistricts[0] }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
