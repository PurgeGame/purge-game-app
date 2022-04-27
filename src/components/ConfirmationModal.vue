<script setup>
import { computed } from "vue";
import {
  ownedTokenData,
  purgeArray,
  contract
} from "../store.js";

const emit = defineEmits(["closeModal"]);

const purgingTokens = computed(() => {
  let filteredList = new Set();
  if (ownedTokenData.value) {
    Object.values(ownedTokenData.value).forEach((token) => {
      if (purgeArray.value.includes(token.tokenId)) {
        filteredList.add(token);
      }
    });
  }
  return filteredList;
});
function tokenImage(tokenId) {
  if (tokenId > 65000) tokenId = "bomb";
  return `/tokens/${tokenId}.png`;
}

async function purge(tokenIds) {
  let estimate = await contract.purge(tokenIds);
  estimate = BigInt(parseInt(estimate * 1.15));
  await contract.purge(tokenIds);
}
</script>

<template>
<!-- this is not formatted well but works -->
    <button
      @click="$emit('closeModal')"
      class="
        sticky
        top-2
        float-right
        bg-black
        px-2
        rounded
        text-amber-300
        font-bold
        hover:ring-1 hover:ring-amber-300
      "
    >
      Cancel
    </button>
        <button
      @click="purge(purgeArray.value), $emit('closeModal')"
      class="
        sticky
        top-2
        float-right
        bg-black
        px-2
        rounded
        text-amber-300
        font-bold
        hover:ring-1 hover:ring-amber-300
      "
    >
      Confirm
    </button>
    <h2 class="font-bold text-xl bg-black">Purging these tokens </h2>
            <div
      class="
        mt-4
        p-4
        flex
        h-[90%]
        overflow-auto
        bg-black
        border-2 border-red-900
        rounded-lg
      "
    >
      <div class="grow overflow-auto px-1">
        <div v-for="token in purgingTokens" class="inline-block w-1/5 my-0 p-1">
          <div class="relative grid place-items-center">
            <img
              :src="tokenImage(token.tokenId)"
              />
            </div>
          </div>
        </div>
      </div>


</template>