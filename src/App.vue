<script setup lang="ts">

import { type Ref, ref } from 'vue'
import StreetSearch from '@/components/StreetSearch.vue'
import ElectionDistrictByStreet from '@/components/ElectionDistrictByStreet.vue'
import { allStreets } from '@/street-data-provider'

const selectedStreet: Ref<string> = ref('')

const streets = ref(allStreets);

</script>

<template>
  <header>
    <div class="wrapper">

    </div>
  </header>

  <main>
    <h1>Hamburg Wahlkreise 2025</h1>
    <StreetSearch v-model="selectedStreet" :streets="streets" />

    <div style="height: 50px"></div>

    <election-district-by-street :selected-street="selectedStreet"  />
  </main>

  <footer>
    <p>
      Dies ist ein Recherchewerkzeug für
      <a href="https://voltdeutschland.org/hamburg">Volt Hamburg</a>
      basierend auf einem
      <a href="https://www.statistik-nord.de/wahlen/wahlen-in-hamburg/buergerschaftswahlen/2025">Datensatz von Statistik Nord</a>.
    </p>
    <p>
      Es werden keine Nutzungsdaten erhoben.
    </p>
    <p>
      <a href="https://voltdeutschland.org/datenschutz">Datenschutz</a> |
      <a href="https://voltdeutschland.org/impressum">Impressum</a> |
      <a href="https://volteuropa.workplace.com/chat/t/100027937265763">Support/Feedback via Workplace</a>
    </p>
  </footer>
</template>

<style scoped>

  main {
    padding-bottom: 180px;
  }
  footer {
    position: absolute;
    bottom: 60px;
    font-size: 0.8rem;
  }
</style>
