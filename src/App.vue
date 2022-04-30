<script setup>
import { wallet } from "./store.js";
import MetaMaskConnection from "./components/MetaMaskConnection.vue";
import MainUserInterface from "./components/MainUserInterface.vue";
import Preconnection from "./components/Preconnection.vue";
</script>

<template>
  <!-- MetaMask modal if wallet not connected, else load main interface -->
    <Preconnection />
  <!-- <MetaMaskConnection /> -->
  <div v-if="wallet.address">
    <MainUserInterface />
  </div>
  <!-- <div v-else>
    <Preconnection />
  </div> -->
</template>
