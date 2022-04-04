<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import {
  wallet,
  abi,
  contractaddress,
  coinaddress,
  coinabi,
} from "../store.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractaddress, abi, signer);
const coinContract = new ethers.Contract(coinaddress, coinabi, signer);

const purgedBalance = ref(null);
const walletBalance = ref(null);
const currentBlock = ref(null);

async function doEthersStuff() {
  walletBalance.value = ethers.utils.formatEther(
    await provider.getBalance(wallet.address)
  );
  purgedBalance.value = ethers.utils.formatEther(
    await coinContract.balanceOf(wallet.address)
  );
  currentBlock.value = await provider.getBlockNumber();
}

async function createReferralCode() {
  const referralCode = document.getElementById("string").value;
  await contract.createReferralCode(referralCode);
}

async function purgeButton() {
  let purges = document.getElementById("purge").value;
  var tokenIds = purges.split(",").map(Number);
  purge(tokenIds);
}

// this function must be sent an array
async function purge(tokenIds) {
  await contract.purge(tokenIds);
}

async function mintButton(mintType) {
  const number = document.getElementById("number").value;
  const referrer = document.getElementById("string").value;
  mintType(number, referrer);
}

async function coinMintButton(mintType) {
  let number = document.getElementById("number").value;
  mintType(number);
}

async function mint(number, referrer) {
  const cost = await contract.cost();
  const spend = BigInt(cost * number);
  let estimate = await contract.estimateGas.mint(number, referrer, {
    value: spend,
  });
  estimate = BigInt(parseInt(estimate * 1.05));
  await contract.mint(number, referrer, { value: spend, gasLimit: estimate });
}

async function mintAndPurge(number, referrer) {
  const cost = await contract.cost();
  const spend = BigInt(cost * number);
  let estimate = await contract.estimateGas.mintAndPurge(number, referrer, {
    value: spend,
  });
  estimate = BigInt(parseInt(estimate * 1.05));
  await contract.mintAndPurge(number, referrer, {
    value: spend,
    gasLimit: estimate,
  });
}

async function coinMint(number) {
  let estimate = await contract.estimateGas.coinMint(number);
  estimate = BigInt(parseInt(estimate * 1.05));
  await contract.coinMint(number, { gasLimit: estimate });
}

async function coinMintAndPurge(number) {
  let estimate = await contract.estimateGas.coinMintAndPurge(number);
  estimate = BigInt(parseInt(estimate * 1.05));
  await contract.coinMintAndPurge(number, { gasLimit: estimate });
}

async function nukeToken(bombTokenId, targetTokenId) {
  await contract.nukeToken(bombTokenId, targetTokenId);
}

async function signSomething() {
  let number = document.getElementById("number").value;
  let referrer = document.getElementById("string").value;
  mintAndPurge(number, referrer);
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
    $PURGED balance: {{ purgedBalance }}
    <br />
    Current block: {{ currentBlock }}

    <p class="mt-10">
      <button @click="mintButton(mint)" class="p-2 bg-black border rounded">
        Mint
      </button>
      <button
        @click="mintButton(mintAndPurge)"
        class="p-2 bg-black border rounded"
      >
        Mint And Purge
      </button>
      <button @click="createReferralCode()" class="p-2 bg-black border rounded">
        Create Referral Code
      </button>
    </p>
    <p>
      <label for="number">Mints:</label>
      <input type="number" id="number" name="number" size="10" min="1" />
    </p>
    <p>
      <label for="string">Referral Code:</label>
      <input type="text" id="string" name="string" size="10" />
    </p>
    <!-- <label for="secondnumber">number:</label>
    <input type="number" id="secondnumber" name="secondnumber" size="10"> -->
    <p>
      <button
        @click="coinMintButton(coinMint)"
        class="p-2 bg-black border rounded"
      >
        Coin Mint
      </button>
      <button
        @click="coinMintButton(coinMintAndPurge)"
        class="p-2 bg-black border rounded"
      >
        Coin Mint And Purge
      </button>
    </p>
    <p>
      <br />
    </p>
    <label for="purge">Purge:</label>
    <input type="text" id="purge" name="purge" size="10" min="1" />
    <p>
      <button @click="purgeButton()" class="p-2 bg-black border rounded">
        Purge
      </button>
    </p>
    <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
      Traits <img src="/swipe.png" class="inline px-1" /> NFT's
    </div>
  </div>
</template>