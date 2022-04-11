<script setup>
import { wallet } from "./store.js";
import MetaMaskConnection from "./components/MetaMaskConnection.vue";
import MainUserInterface from "./components/MainUserInterface.vue";
</script>

<template>
  <!-- MetaMask modal if wallet not connected, else load main interface -->
  <MetaMaskConnection />
  <div v-if="wallet.address">
    <MainUserInterface />
  </div>
</template>
