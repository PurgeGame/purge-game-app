<script setup>
import { ref, reactive, computed } from "vue";
import { traitData, prizepool } from "../store.js";

const props = defineProps(["filterString"]);
const columnSorted = ref("prize");
const sortOrder = ref("desc");
const emit = defineEmits(["filter"]);

const columnStatus = reactive({
  shape: false,
  color: false,
  total: false,
  prize: true,
});

const filteredTraits = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = [];

  if (traitData.value) {
    Object.values(traitData.value).forEach((trait) => {
      if (trait.purgedByAddress > 0){
        if(
          typeof wordArray[1] == "undefined" &&
          wordArray[0].length == 1 && 
          letters.includes(wordArray[0]) &&
          trait.shape.toLowerCase() === wordArray[0]
        ) {
          filteredList.push(trait);
        } else if (
          (typeof wordArray[1] == "undefined" &&
          (wordArray[0].length > 1 || !letters.includes(wordArray[0])) &&
          (trait.color.toLowerCase().includes(wordArray[0]) ||
          trait.shape.toLowerCase().includes(wordArray[0])))
        ) {
          filteredList.push(trait);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          wordArray[1].length == 1 &&
          letters.includes(wordArray[1]) &&
          trait.shape.toLowerCase() === wordArray[1] &&
          trait.color.toLowerCase().includes(wordArray[0])
        ) {
          filteredList.push(trait);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          (wordArray[1].length > 1 || !letters.includes(wordArray[1])) &&
          trait.shape.toLowerCase().includes(wordArray[1]) &&
          trait.color.toLowerCase().includes(wordArray[0])
        ) {
          filteredList.push(trait);
        }
    }
    });
  }
  return filteredList;
});

function clickTrait(color,shape){
  if (props.filterString == color + " " + shape){
    emit('filter',"","")
  }else{
    emit('filter',color,shape)
  }
}

const sortedTraits = computed(() => {
  if (traitData.value) {
    let traitsArray = filteredTraits.value;
    traitsArray.sort((a, b) => {
      if (a[columnSorted.value] < b[columnSorted.value]) return -1;
      if (a[columnSorted.value] > b[columnSorted.value]) return 1;
      return 0;
    });
    if (sortOrder.value == "desc") {
      traitsArray.reverse();
    }
    return traitsArray;
  }
});

function toggleColumnSorted(column) {
  columnSorted.value = column;
  Object.keys(columnStatus).forEach((key) => {
    columnStatus[key] = key == column ? true : false;
  });
  sortOrder.value = sortOrder.value == "asc" ? "desc" : "asc";
}
</script>

<template>
  <div class="pt-0 p-4 h-full overflow-hidden">
      <div v-if="prizepool.value != null" class="text-center">
        <h2 class="text-emerald-200 text-2xl font-bold">Grand Prize : {{(prizepool.value.grandprize).toFixed(2)}} eth</h2>
      </div>
    <div
      class="
        mt-1
        p-1
        flex
        responsive-height
        overflow-hidden
        bg-black
        border-2 border-red-700
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">

        <table class="w-full">
          <thead class="sticky top-0 z-10 bg-black">
            <tr>

              <th 
              colspan = "2"
              class="text-center 
              text-cyan-400 
              font-bold 
              border-b-2 
              border-amber-300">
                 Your Purged Traits
              </th>


              <th
                colspan="2"
                @click="toggleColumnSorted('prize')"
                :class="{ 'text-amber-300': columnStatus.prize }"
                class="
                  sticky
                  top-0
                  z-10
                  border-b-2 border-amber-300
                  text-right
                  pr-2
                "
              >
                <button class="font-bold">Prize Value</button
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trait in sortedTraits">
              <td class="border-t-2 border-amber-300 text-center text-red-500">
                ({{ trait.purgedByAddress }})
              </td>
              <td class="border-t-2 border-amber-300 text-center">
                {{ trait.color }}&nbsp;{{ trait.shape }}
              </td>
              <td class="border-t-2 border-amber-300 text-center">
                 <button
                  @click="clickTrait(trait.color,trait.shape)">
                  <img
                    :src="trait.thumbnail"
                    :title="trait.color + ' ' + trait.shape"
                    class="inline min-w-[40px] w-[40px] py-1"
                  />
                </button>
              </td>
              <td class="border-t-2 border-amber-300 text-center pr-4">
                {{ trait.prize }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.responsive-height {
  height: 96%;
}
@media screen and (max-height: 800px) {
  .responsive-height {
    height: 94%;
  }
}
@media screen and (max-height: 600px) {
  .responsive-height {
    height: 85%;
  }
}
</style>