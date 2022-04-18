<!-- This whole component is hideous and hard to understand and needs help -->

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { ethers } from "ethers";
import {
  wallet,
  abi,
  contractaddress,
  coinaddress,
  coinabi,
  ownedTokenData,
  traitData,
  purgedTokenData,
  prizepool,
  purgeArray,
  bombTokenId,
} from "../store.js";
import { findProp } from "@vue/compiler-core";
import ConfirmationModal from "./ConfirmationModal.vue";
import BombModal from "./BombModal.vue";


const props = defineProps(["filterString"]);
const purgeIDs = ref([]);
const showConfirmationModal = ref(false);
const showBombModal = ref(false);
const showPurgedTokens = ref(0)

// Not sure this is the best way to wait for the API call, but it works
// const ownedTokens = reactive({});
// watch(ownedTokenData, () => (ownedTokens.value = ownedTokenData.value));

// const purgedTokens = reactive({});
// watch(purgedTokenData, () => (purgedTokens.value = purgedTokenData.value));

function thumbnailUrl(traitname) {
  const str = traitname.toLowerCase().split(" ");
  return `/thumbnails/${str[0]}-${str[1]}.png`;
}

function tokenImage(tokenId) {
  if (tokenId > 64500) tokenId = "bomb";
  return `/tokens/${tokenId}.png`;
}

function toggleTokenPurge(tokenId, purge) {

  if (tokenId < 64500) {
    if (purge) {
      purgeIDs.value.push(tokenId);
    } else {
      purgeIDs.value.splice(purgeIDs.value.indexOf(tokenId), 1);
    }
  }
  else {
    bombTokenId.value = tokenId
    showBombModal.value = true
  }
}

function sellButton(PurgeIDs){
  for (const tokenId of PurgeIDs){
    window.open('https://testnets.opensea.io/assets/'+ contractaddress +'/' + tokenId + '/sell')
  }
}

function selectAll(){  
  for (const token of filteredTokens.value){
    if (token.tokenId < 64500) toggleTokenPurge(token.tokenId, true)
  }
}

function clearPurges(){
  for(const token of Object.values(ownedTokenData.value)){
    if (token.tokenId < 64500) toggleTokenPurge(token.tokenId, false)
  }
}

function toggleTokenDisplay(){
  if(showPurgedTokens.value == 0) showPurgedTokens.value =1
  else showPurgedTokens.value = 0
}

function showConfirmation(){
  purgeArray.value = purgeIDs.value
  showConfirmationModal.value = true
}



// function signSomething() {
//   let number = document.getElementById("number").value;
//   let referrer = document.getElementById("string").value;
//   mintAndPurge(number, referrer);
// }

const filteredTokens = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = new Set();
  if (ownedTokenData.value) {
    Object.values(ownedTokenData.value).forEach((token) => {
      for (let trait of token.traitnames) {
        let color = trait.toLowerCase().split(" ")[0];
        let shape = trait.toLowerCase().split(" ")[1];
        if (
          (typeof wordArray[1] == "undefined" &&
            color.includes(wordArray[0])) ||
          shape.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          wordArray[1].length == 1 &&
          letters.includes(wordArray[1]) &&
          shape === wordArray[1] &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          (wordArray[1].length > 1 || !letters.includes(wordArray[1])) &&
          shape.includes(wordArray[1]) &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        }
      }
    });
  }
  filteredList = Array.from(filteredList).reverse()
  return filteredList;
});

const filteredTokensPurged = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = new Set();
  if (purgedTokenData.value) {
    Object.values(purgedTokenData.value).forEach((token) => {
      for (let trait of token.traitnames) {
        let color = trait.toLowerCase().split(" ")[0];
        let shape = trait.toLowerCase().split(" ")[1];
        if (
          (typeof wordArray[1] == "undefined" &&
            color.includes(wordArray[0])) ||
          shape.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          wordArray[1].length == 1 &&
          letters.includes(wordArray[1]) &&
          shape === wordArray[1] &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          (wordArray[1].length > 1 || !letters.includes(wordArray[1])) &&
          shape.includes(wordArray[1]) &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        }
      }
    });
  }
  return filteredList;
});
</script>

<template>
  <template v-if="showPurgedTokens == 0">
    <div
      class="
        mt-4
        p-4
        flex
        h-[78%]
        overflow-hidden
        bg-black
        border-2 border-red-900
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">
        <div v-for="token in filteredTokens" class="inline-block w-1/3 my-0 p-1">
          <div class="relative grid place-items-center">
            <img
              :src="tokenImage(token.tokenId)"
              @click="toggleTokenPurge(token.tokenId, true)"
              class="cursor-pointer"
            />
            <div
              v-if="purgeIDs.includes(token.tokenId)"
              @click="toggleTokenPurge(token.tokenId, false)"
              class="
                absolute
                flex
                justify-center
                items-center
                w-full
                h-full
                z-10
                bg-black/75
                cursor-pointer
              "
            >
              <div class="text-6xl">🔥</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative h-5% mx-2">
      <p v-if="purgeIDs.length ==1">
        <button
          @click="showConfirmation()"
          class="mr-2 p-2 bg-black border rounded"
        >
          Purge selected
        </button>
        <button
          @click="sellButton(purgeIDs)"
          class="mr-2 p-2 bg-black border rounded"
          >
            Sell
          </button>
          <button
          @click="clearPurges()"
          class="mr-2 p-2 bg-black border rounded"
          >
            Clear Purges
          </button>
      </p>
      <p v-else-if="purgeIDs.length >0">
        <button
          @click="showConfirmation()"
          class="mr-2 p-2 bg-black border rounded"
        >
          Purge selected
        </button>
          <button
          @click="clearPurges()"
          class="mr-2 p-2 bg-black border rounded"
          >
            Clear Purges
          </button>
      </p>
      <p>
          <button
          @click="selectAll()"
          class="mr-2 p-2 bg-black border rounded"
          >
            Select All
          </button>
          <button v-if="purgeIDs.length == 0"
          @click="toggleTokenDisplay()"
          class="mr-2 p-2 bg-black border rounded"
        >
          View Purged Tokens
        </button>
      </p>
    </div>
  </template>
  <template v-if="showPurgedTokens == 1">
        <div
      class="
        mt-4
        p-4
        flex
        h-[78%]
        overflow-hidden
        bg-black
        border-2 border-red-900
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">
        <div v-for="token in filteredTokensPurged" class="inline-block w-1/3 my-0 p-1">
          <div class="relative grid place-items-center">
            <img
              :src="tokenImage(token.tokenId)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="relative h-5% mx-2">
      <p>
        <button
          @click="toggleTokenDisplay()"
          class="mr-2 p-2 bg-black border rounded"
        >
          View Owned Tokens
        </button>
      </p>
    </div>
  </template>
  <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
    All traits <img src="/swipe.png" class="inline px-1" /> Purged traits
  </div>

  <div
    v-if="showConfirmationModal"
    class="
      absolute
      top-0
      left-0
      z-50
      w-full
      h-full
      overflow-y-scroll
      bg-zinc-700 bg-opacity-80
    "
  >
    <ConfirmationModal @close-modal="showConfirmationModal = false" />
  </div>
  <div
    v-if="showBombModal"
    class="
      absolute
      top-0
      left-0
      z-50
      w-full
      h-full
      overflow-y-scroll
      bg-zinc-700 bg-opacity-80
    "
  >
    <BombModal @close-modal="showBombModal = false" />
  </div>
</template>