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
} from "../store.js";
import { findProp } from "@vue/compiler-core";

const props = defineProps(["filterString"]);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractaddress, abi, signer);
const coinContract = new ethers.Contract(coinaddress, coinabi, signer);
const purgeIDs = ref([]);

// Not sure this is the best way to wait for the API call, but it works
const ownedTokens = reactive({});
watch(ownedTokenData, () => (ownedTokens.value = ownedTokenData.value));

function thumbnailUrl(traitname) {
  const str = traitname.toLowerCase().split(" ");
  return `/thumbnails/${str[0]}-${str[1]}.png`;
}

function tokenImage(tokenId) {
  if (tokenId > 65000) tokenId = "bomb";
  return `/tokens/${tokenId}.png`;
}

function toggleTokenPurge(tokenId, purge) {
  if (purge) {
    purgeIDs.value.push(tokenId);
  } else {
    purgeIDs.value.splice(purgeIDs.value.indexOf(tokenId), 1);
  }
}

function purgeButton(purgeIDs) {
  if (purgeIDs.length > 0) {
    // purge(purgeIDs);
    console.log("Token ID's to purge: " + purgeIDs);
  } else {
    window.alert("No token ID's to purge");
  }
}

// this function must be sent an array
async function purge(tokenIds) {
  await contract.purge(tokenIds);
}

async function nukeToken(bombTokenId, targetTokenId) {
  await contract.nukeToken(bombTokenId, targetTokenId);
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
  if (ownedTokens.value) {
    Object.values(ownedTokens.value).forEach((token) => {
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
    <p v-if="purgeIDs.length > 0">
      <button
        @click="purgeButton(purgeIDs)"
        class="mr-2 p-2 bg-black border rounded"
      >
        Purge selected
      </button>
    </p>
  </div>
  <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
    All traits <img src="/swipe.png" class="inline px-1" /> Purged traits
  </div>
</template>