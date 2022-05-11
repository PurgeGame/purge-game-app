<script setup>
import { ref } from "vue";
import {
  contractaddress,
  bombTokenId,
  contract
} from "../store.js";

const bombTarget = ref('1');
const emit = defineEmits(["closeModal"]);

function tokenImage() {
  return `/lgtokens/${bombTarget.value}.png`;
}

async function nukeToken(_bombTokenId, targetTokenId) {
  try{
    await contract.nukeToken(_bombTokenId, targetTokenId);
  }catch(error){
    window.alert(error.error.message);
  }
}

function sellButton(SellID){
    window.open('https://testnets.opensea.io/assets/'+ contractaddress +'/' + SellID + '/sell')
}

</script>

<template>
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
      @click="nukeToken(bombTokenId.value,bombTarget), $emit('closeModal')"
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
        <button
      @click="sellButton(bombTokenId.value), $emit('closeModal')"
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
      Sell Bomb
    </button>

    <h2 class="font-bold text-xl bg-black">Enter token ID to nuke </h2>
    <input
        v-model="bombTarget"
        placeholder="enter target token ID"
        type="number"
        name="bomb-target"
        min="1"
        max="29420"
        size="10"
        class="ml-2 px-2 text-black"
      />
    <div
      class="
        mt-4
        p-4
        flex
        h-[75%]
        w-[90%]
        overflow-auto
        bg-black
        border-2 border-red-900
        rounded-lg
      "
    >

      <div class="grow overflow-auto px-1">
        
        <img 
            :src="tokenImage()"
            style="height:80%; margin-left:auto; margin-right:auto"

            />

      </div>
    </div>
</template>