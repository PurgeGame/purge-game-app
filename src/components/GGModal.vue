<script setup>
import { ref, onMounted } from "vue";
import {
  traitData,
  apiaddress,
  wallet,
  prizepool
} from "../store.js";


const winner = ref(null)

async function checkWinner(trait){
  const apiEndpoint = apiaddress +'/winner/' + wallet.checksumAddress() + '/' + trait.traitId
  const fetchError = ref('')

  const isWinner = await fetch(apiEndpoint)
    .then((res) => res.json())
    .catch((err) => (fetchError.value = err))
  if (isWinner) trait.prize = trait.prize + prizepool.grandprize
}

function getWinningTrait(){
  if (traitData.value){
      Object.values(traitData.value).forEach((trait) => {
          if (trait.winningtrait == 1){
              winner.value = trait
              checkWinner(trait)
              return trait
          }
      }
  )}
}

onMounted(() => {
  getWinningTrait()
});
</script>

<template>
    <div v-if="winner != null"
    class="text-center
    text-2xl">
    <div class = "text-5xl text-red-500">
      <b>GAME OVER</b>
    </div>
      WINNING TRAIT

    <img class="
          relative

        left-1/2 
         
        -translate-x-1/2 

      w-[50%]
      h-[50%]"
      :src="winner.image">
    <div v-if="winner.prize > 0">
    <div class = "text-green-500">
    YOUR WINNINGS: {{winner.prize}} eth
    </div>
    </div>
    <div></div>
    <button
      @click="$emit('closeModal')"
      class="
        relative
  
        top-2
        float-center
        bg-black
        px-2
        rounded
        text-amber-300
        font-bold
        hover:ring-1 hover:ring-amber-300
      "
    >
      Close
    </button>
    </div>
    
</template>