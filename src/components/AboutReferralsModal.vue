<script setup>
import { ref } from "vue";
import { contract } from "../store.js";
import { wallet, apiaddress } from "../store.js";

const emit = defineEmits(["closeModal"]);
const referralCode = ref("");
const discord = ref(null);

async function createReferralCode() {
  if (referralCode.value) {
    await contract.createReferralCode(referralCode.value);
  } else {
    window.alert("You must enter a referral code first");
  }
}

</script>

<template>
  <div
    class="
      relative
      w-11/12
      max-w-2xl
      m-auto
      p-8
      bg-gradient-to-br
      from-zinc-800
      to-zinc-900
      text-lg text-white
    "
  >
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
      close
    </button>
    <h2 class="font-bold text-xl">The Purge Game referral system</h2>
    <p class="my-4">
      In addition to the massive prizes available to Purge Game winners, there is another way to earn big money. 
      Sign up for the refer-a-friend program and for each token minted with your referral code, you immediately  
      recieve 5% of a free mint in $PURGED. On top of that, the top 10 referrers will split a bonus equal to 10% 
      of the total prize pool (and this comes out of my money, not the actual prize pool!) The referal leaderboard 
      will be paid out pre-reveal, Purge Game is dedicated to ensuring winners do not have to wait for their money.
    </p>

    <p class="my-4">
      The person who amasses the most referrals will recieve 40% of the leaderboard prize pool. If there are 10k 
      tokens minted, the winner will get 20 eth! This prize could even be much larger, if people are extremely 
      successful at referring their friends and the maximum number of tokens are minted, the top referrer would 
      win over 127 eth, as well as a ton of free mints! 
    </p>
    <h2 class="font-bold text-xl">How to join the referral program</h2>
    <p class="my-4">
      1. Create a referral code: (this will cost a small amount of gas). You can create multiple codes, 
      as long as they are from the same address, their stats will be combined
      <input
        v-model="referralCode"
        placeholder="YOUR-CODE-HERE"
        type="text"
        name="referral-code"
        size="15"
        class="ml-2 px-2 text-black"
      />
                    &#160;
      <button @click="createReferralCode()" class="p-1 bg-black text-amber-300 border rounded active:bg-blue-500">
        Submit
      </button>

    </p>
    <p class="my-4">
      2. Send your friends to https://purge.game/?ref=YOUR-CODE-HERE.
      This will make your referral code pre-set when they mint. 
    </p>

    <p class="my-4">
      3. On mint day, there will be a field to enter a referral code. Each token minted (or Mint and Purged)
      with your code will credit you with 50 $PURGED. Use 1000 of this ERC-20 coin to mint a Purge Game token!
    </p>

    <p class="my-4">
      4. Check the leaderboard page to see how you rank and view detailed information on your successful referrals.
      You can see the addresses which used your code and how many tokens they minted, so you can reward your best customers!
      If you registered multiple referral codes, you can view which were more effective.

    </p>
  </div>
</template>