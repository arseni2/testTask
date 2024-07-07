<script setup lang="ts">

import SearchIcon from "./icons/SearchIcon.vue";
import TableItem from "./components/TableItem.vue";
import TableHead from "./components/TableHead.vue";
import {onBeforeMount, ref, watch} from "vue";
import TableItemSkeleton from "./components/TableItemSkeleton.vue";
import {IData} from "./types";
import EmptyTable from "./components/EmptyTable.vue";

const isLoading = ref(true);
const searchQuery = ref('');
const deals = ref([]);
const fetchData = async (query?: string) => {
  try {
    let url = "http://localhost:8000/api/accumulate"
    if(query) {
      url = `http://localhost:8000/api/accumulate?query=${query}`
    }
    const response = await fetch(url);
    const data: IData[] = await response.json();
    console.log(data)
    deals.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const handleSearchInput = (query: string) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    isLoading.value = true
    fetchData(query);
  }, 300);
};

watch(searchQuery, (newQuery) => {
  handleSearchInput(newQuery);
});


onBeforeMount(() => {
  fetchData().then(() => {isLoading.value = false;})
});
</script>

<template>
  <div class="p-4 h-full">
    <div class="relative mr-3 w-[400px] mb-4">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <SearchIcon/>
      </div>
      <input  v-model="searchQuery" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" name="email_address" aria-label="Email Address" placeholder="Введите название сделки" required="" type="email">
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <TableHead/>
        </thead>
        <tbody class="w-full">

        <template v-if="isLoading">
          <TableItemSkeleton v-for="n in 3" :key="n" />
        </template>
        <template v-else-if="deals.length === 0 && isLoading === false">
          <EmptyTable />
        </template>
        <template v-else>
          <TableItem v-for="deal in deals" :key="deal.id" :deal="deal" />
        </template>


        </tbody>
      </table>
    </div>
  </div>
</template>
