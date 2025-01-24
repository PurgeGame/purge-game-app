<script setup>
import { onMounted } from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import { wallet } from "../store.js";

const isMetaMaskInstalled = () => {
  if (
    typeof ethereum !== "undefined" &&
    typeof ethereum.isMetaMask !== "undefined"
  ) {
    return true;
  }
};

const getAccounts = async () => {
  if (isMetaMaskInstalled) {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    wallet.address = accounts[0] || null;
    const chainId = await ethereum.request({ method: "eth_chainId" });
    // Use Rinkeby testnet for dev, beta. 0x1 for production
    if (chainId !== "0x4") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
    }
  }
};

const handleChainChanged = (_chainId) => {
  window.location.reload();
};

const handleAccountsChanged = () => {
  window.location.reload();
};

const onboarding = new MetaMaskOnboarding();

const onClickInstall = () => {
  onboarding.startOnboarding();
};

const onClickConnect = async () => {
  await ethereum.request({ method: "eth_requestAccounts" });
  getAccounts();
};

onMounted(() => {
  getAccounts();

  if (ethereum) {
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);
  }
});
</script>

<template>
  <div
    v-if="!wallet.address"
    class="
      absolute
      top-0
      left-0
      w-full
      h-full
      bg-black bg-opacity-70
      grid
      place-content-center
    "
  >
    <div class="inline bg-white p-4 rounded-lg text-black text-xl text-center">
      MetaMask connection required<br />
      <button
        v-if="isMetaMaskInstalled()"
        @click="onClickConnect()"
        class="
          mt-2
          px-4
          py-1
          mt-2
          bg-zinc-400
          rounded-md
          hover:ring
          ring-amber-300
        "
      >
        <img src="/metamask-fox.svg" class="inline" />
        Connect Wallet
      </button>
      <button
        v-else
        @click="onClickInstall()"
        class="
          mt-2
          px-4
          py-1
          mt-2
          bg-zinc-400
          rounded-md
          hover:ring
          ring-amber-300
        "
      >
        <img src="/metamask-fox.svg" class="inline" />
        Install MetaMask
      </button>
    </div>
  </div>
</template>
