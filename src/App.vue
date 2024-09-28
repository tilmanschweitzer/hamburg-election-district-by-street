<script setup lang="ts">

import { type Ref, ref } from 'vue'
import StreetSearch from '@/components/StreetSearch.vue'
import ElectionDistrictByStreet from '@/components/ElectionDistrictByStreet.vue'
import { allStreets } from '@/street-data-provider'

const searchData: Ref<SearchData> = ref({
  street: 'Akeleiweg',
  number: ''
})

const streets = ref(allStreets);

</script>

<template>
  <header>
    <div class="wrapper">

    </div>
  </header>

  <main>
    <h1>Hamburg Wahlbezirke 2025</h1>
    <StreetSearch v-model="searchData.street" :streets="streets" />

    <div style="height: 50px"></div>

    <election-district-by-street :selected-street="searchData.street"  />
  </main>
</template>

<style scoped>

</style>
