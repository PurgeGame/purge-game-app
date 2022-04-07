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
const etherBalance = ref(null);
const currentBlock = ref(null);

// Form input bindings
const mintQuantity = ref(1);
const referralCode = ref("");
const purgeIDs = ref(null);

async function doEthersStuff() {
  etherBalance.value = ethers.utils.formatEther(
    await provider.getBalance(wallet.address)
  );
  purgedBalance.value = ethers.utils.formatEther(
    await coinContract.balanceOf(wallet.address)
  );
  currentBlock.value = await provider.getBlockNumber();
}

async function createReferralCode() {
  if (referralCode.value) {
    await contract.createReferralCode(referralCode.value);
  } else {
    window.alert("You must enter a referral code first");
  }
}

function purgeButton() {
  if (purgeIDs.value) {
    var tokenIds = purgeIDs.value.split(",").map(Number);
    purge(tokenIds);
  } else {
    window.alert("No token ID's to purge");
  }
}

// this function must be sent an array
async function purge(tokenIds) {
  await contract.purge(tokenIds);
}

function mintButton(mintType) {
  if (mintQuantity.value > 0) {
    mintType(mintQuantity.value, referralCode.value);
  } else {
    window.alert("Quantity must be greater than 0");
  }
}

function coinMintButton(mintType) {
  mintType(mintQuantity.value);
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

// function signSomething() {
//   let number = document.getElementById("number").value;
//   let referrer = document.getElementById("string").value;
//   mintAndPurge(number, referrer);
// }

onMounted(() => {
  doEthersStuff();
});
</script>

<template>
  <div class="relative h-full mx-2">
    <img src="/newbanner.png" class="w-full mb-10" />

    Fake ethrums balance: {{ etherBalance }}
    <br />
    $PURGED balance: {{ purgedBalance }}
    <br />
    Current block: {{ currentBlock }}
    <hr />
    <p class="my-6">
      <button
        @click="mintButton(mint)"
        class="mr-2 p-2 bg-black border rounded"
      >
        Mint
      </button>

      <button
        @click="mintButton(mintAndPurge)"
        class="mx-2 p-2 bg-black border rounded"
      >
        Mint And Purge
      </button>

      <label for="mint-quantity">Quantity:</label>
      <input
        v-model="mintQuantity"
        type="number"
        name="mint-quantity"
        size="3"
        min="1"
        class="ml-1 px-1 text-black"
      />
    </p>
    <hr />
    <p class="my-6">
      <button @click="createReferralCode()" class="p-2 bg-black border rounded">
        Create Referral Code
      </button>

      <input
        v-model="referralCode"
        placeholder="enter code"
        type="text"
        name="referral-code"
        size="10"
        class="ml-2 px-2 text-black"
      />
    </p>
    <hr />
    <!-- <label for="secondnumber">number:</label>
    <input type="number" id="secondnumber" name="secondnumber" size="10"> -->
    <p class="my-6">
      <button
        @click="coinMintButton(coinMint)"
        class="mr-2 p-2 bg-black border rounded"
      >
        Coin Mint
      </button>

      <button
        @click="coinMintButton(coinMintAndPurge)"
        class="mx-2 p-2 bg-black border rounded"
      >
        Coin Mint And Purge
      </button>
    </p>
    <hr />
    <p class="my-6">
      <button @click="purgeButton()" class="mr-2 p-2 bg-black border rounded">
        Purge
      </button>
      <input
        v-model="purgeIDs"
        placeholder="csv of token IDs"
        type="text"
        name="purge-IDs"
        class="px-2 text-black"
      />
    </p>
    <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
      All traits <img src="/swipe.png" class="inline px-1" /> Purged traits
    </div>
  </div>
</template>