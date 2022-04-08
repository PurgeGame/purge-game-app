<script setup>
import { ref, onMounted } from "vue";
import { wallet, traitData, prizepool, purgedTokenData, ownedTokenData  } from "../store.js";
import { ethers } from "ethers";
const allData = ref(null)


let data = ref("http://127.0.0.1:8000/everything/" + ethers.utils.getAddress(wallet.address));

async function fetchTraitData() {
  allData.value = await (await fetch(data.value)).json();
  traitData.value = allData.value[0]
  ownedTokenData.value = allData.value[1]
  purgedTokenData.value = allData.value[2]
  prizepool.value = allData.value[3]
}

onMounted(() => {
fetchTraitData();
});
</script>

<template></template>
