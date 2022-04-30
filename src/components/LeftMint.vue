<!-- This whole component is hideous and hard to understand and needs help -->

<script setup>
import { ref, onMounted, computed } from "vue";
import { ethers } from "ethers";
import {
  prizepool,
  contract,
  cost,
} from "../store.js";

const totalMinted = ref(null);
const totalMAP = ref(null);
const ethPrice = ref(null);


async function doEthersStuff() {
    prizepool.total = await contract.PrizePool() / 1e18
    totalMinted.value = await contract.totalMinted()
    totalMAP.value = await contract.totalSupply() - totalMinted.value
    purgedBalance.value = ethers.utils.formatEther(await coinContract.balanceOf(wallet.address))
    let response = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy');
    let data = await response.json();
    ethPrice.value = data.data.amount
}

function whitepaper(){
    window.open('https://purge.game/whitepaper/');
}


onMounted(() => {
  doEthersStuff();
  setInterval(function(){doEthersStuff()}, 30000);
});

</script>

<template>
    <div
      class="
        mt-4
        p-1
        w-[75%]
        h-[150px]
        overflow-hidden
        bg-black
        border-2 border-red-700
        rounded-lg
      "
      style = "
  position: relative;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);"
    >
    <p>
    Total Prizepool : {{prizepool.total}} eth (${{parseInt(prizepool.total * ethPrice)}})
    </p>
    <p>
    Grand Prize : {{totalMinted * cost * .05 /1e18}} eth (${{parseInt(totalMinted * cost * .05 * ethPrice /1e18)}})
    </p>
    <p>
    MAP Jackpot : {{totalMAP * cost * .05 /1e18}} eth (${{parseInt(totalMAP * cost * .05 * ethPrice /1e18)}})
    </p>
    </div>
        <button
        @click="whitepaper()"
        style = "
            position: relative;
            top: 30%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);"
                >
        <img src="/buttons/whitepaper.png">

        </button>

</template>