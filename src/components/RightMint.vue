<!-- This whole component is hideous and hard to understand and needs help -->

<script setup>
import { ref } from "vue";
import AboutReferralsModal from "./AboutReferralsModal.vue";

const showAboutReferrals = ref(false);



</script>

<template>
    <button
    @click="showAboutReferrals = true"
    style = "
        position: relative;
        top: 30%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);"
            >
    <img src="/buttons/refer.png">

    </button>
        <button
    @click="showAboutReferrals = true"
    style = "
        position: relative;
        top: 20%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);"
            >
    <img src="/buttons/leaderboard.png">

    </button>

    <div
    v-if="showAboutReferrals"
    class="
      absolute
      top-0
      left-0
      z-50
      w-full
      h-full
      overflow-y-scroll
      bg-zinc-800 bg-opacity-90
    "
  >
    <AboutReferralsModal @close-modal="showAboutReferrals = false" />
  </div>

</template>