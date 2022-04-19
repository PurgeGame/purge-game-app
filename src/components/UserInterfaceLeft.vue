<script setup>
import { ref, reactive, computed } from "vue";
import { traitData } from "../store.js";

const props = defineProps(["filterString"]);
const columnSorted = ref("remaining");
const sortOrder = ref("asc");

const columnStatus = reactive({
  floor: true,
  remaining: false,
});

const filteredTraits = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = [];

  if (traitData.value) {
    Object.values(traitData.value).forEach((trait) => {
      if (
        (typeof wordArray[1] == "undefined" &&
          trait.color.toLowerCase().includes(wordArray[0])) ||
        trait.shape.toLowerCase().includes(wordArray[0])
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
    });
  }
  return filteredList;
});

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

function buyNow(trait) {
    window.open(traitOSURL(trait));
}

function toggleColumnSorted(column) {
  columnSorted.value = column;
  Object.keys(columnStatus).forEach((key) => {
    columnStatus[key] = key == column ? true : false;
  });
  sortOrder.value = sortOrder.value == "asc" ? "desc" : "asc";
}
function traitOSURL(trait) {
  if (trait.traitId < 64) {
    return (
      "https://testnets.opensea.io/assets/purge-game-beta-test-lcyb5uwva9?search[stringTraits][0][name]=Crypto&search[stringTraits][0][values][0]=" +
      trait.color +
      "%20" +
      trait.shape +
      "&search[sortAscending]=true&search[sortBy]=PRICE"
    );
  } else if (trait.traitId < 128) {
    return (
      "https://testnets.opensea.io/assets/purge-game-beta-test-lcyb5uwva9?search[stringTraits][0][name]=Letter&search[stringTraits][0][values][0]=" +
      trait.color +
      "%20" +
      trait.shape +
      "&search[sortAscending]=true&search[sortBy]=PRICE"
    );
  } else if (trait.traitId < 192) {
    return (
      "https://testnets.opensea.io/assets/purge-game-beta-test-lcyb5uwva9?search[stringTraits][0][name]=Symbol&search[stringTraits][0][values][0]=" +
      trait.color +
      "%20" +
      trait.shape +
      "&search[sortAscending]=true&search[sortBy]=PRICE"
    );
  } else if (trait.traitId < 256) {
    return (
      "https://testnets.opensea.io/assets/purge-game-beta-test-lcyb5uwva9?search[stringTraits][0][name]=Number&search[stringTraits][0][values][0]=" +
      trait.color +
      "%20" +
      trait.shape +
      "&search[sortAscending]=true&search[sortBy]=PRICE"
    );
  }
  return "ERROR";
}
</script>

<template>
  <div class="p-4 h-full overflow-hidden">
    <div class="text-center">
      <h2 class="text-amber-300 text-xl font-bold">All Traits in Play</h2>
    </div>
    <div
      class="
        mt-4
        p-1
        flex
        h-[94%]
        overflow-hidden
        bg-black
        border-2 border-green-800
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">
        <table class="w-full">
          <thead class="sticky top-0 z-10 bg-black">
            <tr>
              <th
                
                :class="{ 'text-amber-300': columnStatus.color }"
                class="sticky top-0 z-10 border-b-2 border-amber-300"
              >
                <button class="font-bold"></button>
              </th>
              <th
                @click="toggleColumnSorted('floor')"
                :class="{ 'text-amber-300': columnStatus.floor }"
                class="sticky top-0 z-10 border-b-2 border-amber-300"
              >
                <button class="font-bold">Floor</button>
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
            <tr v-for="trait in sortedTraits">
              <td class="border-t-2 border-amber-300 text-center">
                <button
                  @click="buyNow(trait)"
                  class="mr-2 p-1 bg-os-1 border-sky-900 rounded font-bold text-white"
                >
                  <img 
                    :src='`/oslogo.png`'
                    style = width:25px;max-height:100vw;display:inline
                  >
                  Buy
                </button>
              </td>
              <td class="border-t-2 border-amber-300 text-center">
                {{ trait.floor }}
              </td>
              <td class="border-t-2 border-amber-300 text-center">
                <img
                  :src="trait.thumbnail"
                  :title="trait.color +' ' + trait.shape"
                  style="max-height:100vw;width:40px"
                  class="inline w-1/2 max-w-xs py-1"
                />
              </td>
              <!-- Optional 'total' column -->
              <!-- <td class="border-t border-amber-300 text-center">
                {{ trait[1].total }}
              </td> -->
              <td class="border-t-2 border-amber-300 text-center pr-4">
                {{ trait.remaining }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
