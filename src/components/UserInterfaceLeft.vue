<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const props = defineProps(["filterString"]);

const traitData = ref(null);
const columnSorted = ref("color");
const sortOrder = ref("asc");
// dataSource is expected to eventually be an API endpoint
const dataSource = ref("http://127.0.0.1:8000/alltraits");

const columnStatus = reactive({
  shape: false,
  color: true,
  total: false,
  remaining: false,
});

const sortedTraits = computed(() => {
  if (traitData.value) {
    let traitsArray = [];
    Object.entries(traitData.value).forEach((entry) => {
      traitsArray.push(entry[1]);
    });
    traitsArray.sort((a, b) => {
      if (a[columnSorted.value] < b[columnSorted.value]) {
        return -1;
      }
      if (a[columnSorted.value] > b[columnSorted.value]) {
        return 1;
      }
      return 0;
    });
    if (sortOrder.value == "desc") {
      traitsArray.reverse();
    }
    return traitsArray;
  }
});

const filteredTraits = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ")
  const letters = ['p','u','r','g','e','a','m']
  const filteredList = new Map();
  if (sortedTraits.value) {
    Object.values(sortedTraits.value).forEach((value) => {
      if (
        (typeof(wordArray[1]) == 'undefined' &&
        value.shape.toLowerCase().includes(props.filterString.toLowerCase()) ||
        value.color.toLowerCase().includes(props.filterString.toLowerCase()))
      ) {
        filteredList.set(value.color + "-" + value.shape, {
          shape: value.shape.charAt(0).toUpperCase() + value.shape.slice(1),
          color: value.color.charAt(0).toUpperCase() + value.color.slice(1),
          total: value.total,
          remaining: value.remaining,
          imageUrl: `/thumbnails/${value.color}-${value.shape}.png`,
        });
      } else if (
          typeof(wordArray[1]) !== 'undefined' &&
          wordArray[1].length == 1 &&
          letters.includes(wordArray[1]) &&
          value.shape.toLowerCase()===wordArray[1] &&
          value.color.toLowerCase().includes(wordArray[0])
      ){
        filteredList.set(value.color + "-" + value.shape, {
          shape: value.shape.charAt(0).toUpperCase() + value.shape.slice(1),
          color: value.color.charAt(0).toUpperCase() + value.color.slice(1),
          total: value.total,
          remaining: value.remaining,
          imageUrl: `/thumbnails/${value.color}-${value.shape}.png`,
        });
      } else if (
          typeof(wordArray[1]) !== 'undefined' &&
          (wordArray[1].length > 1 || 
          !letters.includes(wordArray[1]))&&
          value.shape.toLowerCase().includes(wordArray[1]) &&
          value.color.toLowerCase().includes(wordArray[0])
        ){
        filteredList.set(value.color + "-" + value.shape, {
          shape: value.shape.charAt(0).toUpperCase() + value.shape.slice(1),
          color: value.color.charAt(0).toUpperCase() + value.color.slice(1),
          total: value.total,
          remaining: value.remaining,
          imageUrl: `/thumbnails/${value.color}-${value.shape}.png`,
        });
        }
      });
  }
  return filteredList;
});

async function fetchTraitData() {
  traitData.value = await (await fetch(dataSource.value)).json();
}

function toggleColumnSorted(column) {
  columnSorted.value = column;
  Object.keys(columnStatus).forEach((key) => {
    columnStatus[key] = key == column ? true : false;
  });
  sortOrder.value = sortOrder.value == "asc" ? "desc" : "asc";
}

onMounted(() => {
  fetchTraitData();
});
</script>

<template>
  <div class="p-4 h-full overflow-hidden">
    <div class="text-center">
      <h2 class="text-amber-300 text-xl font-bold">All Traits in Play</h2>
    </div>
    <div
      class="
        mt-4
        p-4
        flex
        h-[95%]
        overflow-hidden
        bg-black
        border-2 border-red-900
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">
        <table class="w-full">
          <thead class="sticky top-0 z-10 bg-black">
            <tr>
              <th
                @click="toggleColumnSorted('color')"
                :class="{ 'text-amber-300': columnStatus.color }"
                class="sticky top-0 z-10 border-b-2 border-amber-300"
              >
                <button class="font-bold">Color</button>
              </th>
              <th
                @click="toggleColumnSorted('shape')"
                :class="{ 'text-amber-300': columnStatus.shape }"
                class="sticky top-0 z-10 border-b-2 border-amber-300"
              >
                <button class="font-bold">Symbol</button>
                <!-- </th>
              <th class="sticky top-0 z-10 border-b-2 border-amber-300">
                &nbsp;
              </th> -->
                <!-- Header for optional 'total' column -->
                <!-- <th
                @click="toggleColumnSorted('total')"
                :class="{ 'text-amber-300': columnStatus.total }"
                class="sticky top-0 z-10 border-b-2 border-amber-300"
              >
                <button class="font-bold">Total</button>
              </th> -->
              </th>

              <th
                colspan="2"
                @click="toggleColumnSorted('remaining')"
                :class="{ 'text-amber-300': columnStatus.remaining }"
                class="
                  sticky
                  top-0
                  z-10
                  border-b-2 border-amber-300
                  text-right
                  pr-2
                "
              >
                <button class="font-bold">Remaining</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trait in filteredTraits">
              <td class="border-t border-amber-300 text-center">
                {{ trait[1].color }}
              </td>
              <td class="border-t border-amber-300 text-center">
                {{ trait[1].shape }}
              </td>
              <td class="border-t border-amber-300 text-center">
                <img
                  :src="trait[1].imageUrl"
                  class="inline w-1/2 max-w-xs py-1"
                />
              </td>
              <!-- Optional 'total' column -->
              <!-- <td class="border-t border-amber-300 text-center">
                {{ trait[1].total }}
              </td> -->
              <td class="border-t border-amber-300 text-center pr-4">
                {{ trait[1].remaining }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
