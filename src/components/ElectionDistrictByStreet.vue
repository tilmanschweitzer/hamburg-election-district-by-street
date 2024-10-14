<script setup lang="ts">

import streetsOfHamburg from '../assets/streets_of_hamburg_election_2025.json'

import InputText from 'primevue/inputtext';
import Card from 'primevue/card';

import { computed, type ComputedRef, type Ref, ref, watch, watchEffect } from 'vue'
import { ALL_NUMBERS, DEBUG, EVEN_NUMBERS_ONLY, ODD_NUMBERS_ONLY } from '@/consts'

const props = defineProps<{
  selectedStreet: string,
  excludedElectionDistricts: string[],
  excludedElectionDistrictsEvaluationThreshold: number
}>()

const streetNumber: Ref<string> = ref("");


const electionDistrictsNames: Ref<string[]> = ref([]);
const electionDistrictEntries: Ref<Entry[]> = ref([]);

function addElectionDistrict(entry: Entry) {
  electionDistrictEntries.value.push(entry);

  const electionDistrict = displayElectionDistrictName(entry);
  if (!electionDistrictsNames.value.includes(electionDistrict)) {
    electionDistrictsNames.value.push(electionDistrict)
  }
}

function entryMatchesNumber(entry: Entry, streetNumber: string) {
  const number = parseInt(streetNumber);

  // All numbers
  if (entry.ns === ALL_NUMBERS) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  // Even only
  if (entry.ns === EVEN_NUMBERS_ONLY && number % 2 === 0) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  // Odd only
  if (entry.ns === ODD_NUMBERS_ONLY && number % 2 === 1) {
    return entry.min.v <= number && number <= entry.max.v;
  }
  return false
}

function entryMatchesStreetName(entry: Entry, streetName: string) {
  return entry.s.startsWith(streetName);
}

function updateElectionDistricts(streetName: string) {
  electionDistrictsNames.value = [];
  electionDistrictEntries.value = [];

  (streetsOfHamburg as Entry[]).forEach(entry => {

    if (entryMatchesStreetName(entry, streetName)) {
      addElectionDistrict(entry);
    }
  });

  electionDistrictsNames.value.sort();
  electionDistrictEntries.value.sort((entry: Entry, otherEntry: Entry) => {
    if (entry.edn === otherEntry.edn) {
      return entry.min.v - otherEntry.min.v;
    }
    return entry.edn - otherEntry.edn;
  })
}

updateElectionDistricts(props.selectedStreet)

watchEffect(() => {
  if (props.selectedStreet.trim() === '' || electionDistrictEntries.value.length <= 1) {
    streetNumber.value = '';
  }
  updateElectionDistricts(props.selectedStreet)
})

const emptyStreetNumber = computed(() => {
  return streetNumber.value.trim() === '';
})

const electionDistrictsByStreenAndNumber: ComputedRef<Entry[]> = computed(() => {
  if (emptyStreetNumber.value) {
    return [];
  }

  return electionDistrictEntries.value.filter(entry => {
    return entryMatchesNumber(entry, streetNumber.value);
  })

})

function displayNumberScheme(entry: Entry) {
  if (entry.ns === ALL_NUMBERS) {
    return ''
  }
  if (entry.ns === EVEN_NUMBERS_ONLY) {
    return 'geraden'
  }
  if (entry.ns === ODD_NUMBERS_ONLY) {
    return 'ungeraden'
  }
  throw new Error("Unknown number schema")
}

function displayNumber(number: StreetNumber) {
  if (number.s) {
    return `${number.v}${number.s}`
  }
  return `${number.v}`
}

function displayElectionDistrictName(entry: Entry): string {
  return `${entry.ed} (Wahlbezirk ${entry.edn})`
}

function showExcludedElectionDistrictWarning(): boolean {
  if (electionDistrictsNames.value.length > props.excludedElectionDistrictsEvaluationThreshold) {
    return true
  }

  return props.excludedElectionDistricts.some(excludedElectionDistrict => {
    return electionDistrictsNames.value.includes(excludedElectionDistrict);
  })
}

function getExcludedElectionDistrict() {
  return electionDistrictsNames.value.find(electionDistrictName => props.excludedElectionDistricts.includes(electionDistrictName));
}

</script>

<template>
  <div>
    <div v-if="selectedStreet === ''">
      <h2>Keine Straße ausgewählt</h2>
    </div>
    <div v-else>
      <div v-if="showExcludedElectionDistrictWarning()">
        <Card style="margin-bottom: 20px">
          <template #title>
            <i class="pi pi-exclamation-triangle"></i>
            Achtung: Keine Wahlkreisliste in {{ getExcludedElectionDistrict() }}
          </template>
          <template #content>
            <p class="m-0">
              Für diesen Bezirk haben wir keine Wahlkreisliste, aber du kannst uns trotzdem mit einer <strong>Unterschrift für die Landesliste</strong> helfen.
            </p>
          </template>
        </Card>
      </div>
      <div v-if="electionDistrictsNames.length === 0">
        <h2>Achtung: Kein Ergebnis</h2>
      </div>
      <div v-else-if="electionDistrictsNames.length === 1">
        <h2>Wahlbezirk: {{ electionDistrictsNames[0] }}</h2>

        Für die Straße <strong>{{ selectedStreet }}</strong> gibt es genau einen Wahlbezirk.
      </div>
      <div v-else>

        <Card>
          <template #title>Achtung: Kein <u>eindeutiges</u> Ergebnis!</template>
          <template #content>
            <p class="m-0">
              Für die Straße {{ selectedStreet}} gibt es {{ electionDistrictsNames.length }} Wahlkreise:
            </p>
            <ol>
              <li v-for="electionDistrictName in electionDistrictsNames">
                {{ electionDistrictName }}
              </li>
            </ol>

            <div id="street-number-research">
              <div class="flex flex-col gap-y-3">
                <label for="streetNumber">Hausnummer eingeben</label>
                <InputText id="streetNumber" v-model="streetNumber" aria-describedby="streetNumber-help" />
                <small id="streetNumber-help">Das Ergebnis weiter einschränken.</small>
              </div>

              <div v-if="!emptyStreetNumber">
                <div v-if="electionDistrictsByStreenAndNumber.length === 0">
                  <u>Kein Ergebnis</u> für die Hausnummer {{ streetNumber }}.
                </div>
                <div v-else-if="electionDistrictsByStreenAndNumber.length === 1">
                  Die Hausnummer {{ streetNumber }} gehört zum Wahlbezirk <strong>{{ displayElectionDistrictName(electionDistrictsByStreenAndNumber[0]) }}</strong>.
                </div>
                <div v-else>
                  Fehler: Mehrere Ergebnisse für die Hausnummer {{ streetNumber}}.
                </div>
              </div>
            </div>

            <h3>Zuordnung der Hausnummern</h3>
            <p class="m-0" v-for="electionDistrictEntry in electionDistrictEntries" style="padding-bottom: 10px;">
              <strong>{{ displayElectionDistrictName(electionDistrictEntry) }}</strong>:
              Alle <u>{{ displayNumberScheme(electionDistrictEntry) }}</u> Hausnummern
              von <strong>{{ displayNumber(electionDistrictEntry.min) }}</strong>
              bis <strong>{{ displayNumber(electionDistrictEntry.max) }}</strong>
              gehören dazu.

              <code v-if="DEBUG"><pre>{{ electionDistrictEntry }}</pre></code>
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>

strong {
  font-weight: bold
}

#street-number-research {
  height: 180px;
}

@media (min-width: 576px) {
  #street-number-research {
    height: 140px;
  }
}

@media (min-width: 768px) {
  #street-number-research {
    height: 100px;
  }
}

@media (min-width: 992px) {
  #street-number-research {
    height: 90px;
  }
}
</style>
