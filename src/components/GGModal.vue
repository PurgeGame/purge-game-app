<script setup>
import { ref, onMounted } from "vue";
import {
  contractaddress,
  bombTokenId,
  contract,
  traitData
} from "../store.js";

let winner ={}

function getWinningTrait(){
    if (traitData.value){
        Object.values(traitData.value).forEach((trait) => {
            console.log('a')
            if (trait.traitId == 1){
                console.log(trait)
                return trait
            }
        }
    )}
}

onMounted(() => {
  winner = getWinningTrait()

});
</script>

<template>
      <div
        class="
          p-2
          flex
          h-[75%]
          overflow-hidden
          bg-black
          border-x-2 border-b-2 border-green-800
        "
      >
              <button
        @click="getWinningTrait()"
        style = "
            position: relative;
            top: 30%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);"
                >
        <img src="/buttons/whitepaper.png">

        </button>
      </div>
    
</template>