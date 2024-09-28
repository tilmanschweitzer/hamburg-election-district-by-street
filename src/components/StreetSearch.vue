<script setup lang="ts">

import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import { computed, ref } from 'vue'

const selectedStreet = defineModel()

const props = defineProps<{
  streets: string[]
}>()

const filter = ref('');

const streetSearchInput = ref(selectedStreet.value);

const filteredStreets = computed(() => {
  return props.streets.filter(street => street.startsWith(filter.value))
})

function searchStreet(event: any) {
  filter.value = event.query;
}
function clear() {
  selectedStreet.value = '';
  streetSearchInput.value = '';
}

function select() {
  selectedStreet.value = streetSearchInput.value;
}

</script>

<template>
  <div>
    <h2>Straßenname in Hamburg eingeben</h2>
    <AutoComplete v-model="streetSearchInput" :suggestions="filteredStreets" @complete="searchStreet" @item-select="select" @clear="clear"/>
    <Button icon="pi pi-times" aria-label="Clear" @click="clear"/>
  </div>
</template>

<style scoped>

</style>
