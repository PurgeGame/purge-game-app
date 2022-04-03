<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { wallet } from "../store.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const walletBalance = ref(null);
const currentBlock = ref(null);

async function doEthersStuff() {
  walletBalance.value = ethers.utils.formatEther(
    await provider.getBalance(wallet.address)
  );
  currentBlock.value = await provider.getBlockNumber();
}

async function signSomething() {
  await signer.signMessage("John Hancock");
}

onMounted(() => {
  doEthersStuff();
});
</script>

<template>
  <div class="relative h-full mx-2">
    <img src="/newbanner.png" class="w-full mb-10" />

    Fake ethrums balance: {{ walletBalance }}
    <br />
    Current block: {{ currentBlock }}

    <p class="mt-10">
      <button @click="signSomething()" class="p-2 bg-black border rounded">
        Click to Sign
      </button>
    </p>

    <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
      Traits <img src="/swipe.png" class="inline px-1" /> NFT's
    </div>
  </div>
</template>