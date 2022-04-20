<!-- This whole component is hideous and hard to understand and needs help -->

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import { ethers } from "ethers";
import {
  wallet,
  abi,
  contractaddress,
  coinaddress,
  coinabi,
  ownedTokenData,
  traitData,
  purgedTokenData,
  prizepool
} from "../store.js";

const props = defineProps(["filterString"]);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractaddress, abi, signer);
const coinContract = new ethers.Contract(coinaddress, coinabi, signer);

const purgedBalance = ref(null);
const etherBalance = ref(null);
const currentBlock = ref(null);
const ethCoin = ref(1)

// Form input bindings
const mintQuantity = ref(1);
const referralCode = ref("");
const purgeIDs = ref(null);

// Not sure this is the best way to wait for the API call, but it works
const ownedTokens = reactive({});
watch(ownedTokenData, () => (ownedTokens.value = ownedTokenData.value));

function thumbnailUrl(traitname) {
  const str = traitname.toLowerCase().split(" ");
  return `/thumbnails/${str[0]}-${str[1]}.png`;
}

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

function whitepaper(){
    window.open('https://purge.game/concept.html');

}

function purgeButton() {
  if (purgeIDs.value) {
    var tokenIds = purgeIDs.value.split(",").map(Number);
    purge(tokenIds);
  } else {
    window.alert("No token ID's to purge");
  }
}
function toggleCoin(toggle){
  ethCoin.value = toggle
  console.log(ethCoin.value)
}

// this function must be sent an array
async function purge(tokenIds) {
  await contract.purge(tokenIds);
}

function mintButton(mintType) {
  if (mintQuantity.value > 0) {
    if (ethCoin.value == 1) mintType(mintQuantity.value, referralCode.value);
    else if (ethCoin.value == 0) coinMintButton(mintType)
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
  estimate = BigInt(parseInt(estimate * 1.15));
  await contract.mint(number, referrer, { value: spend, gasLimit: estimate });
}

async function mintAndPurge(number, referrer) {
  const cost = await contract.cost();
  const spend = BigInt(cost * number);
  let estimate = await contract.estimateGas.mintAndPurge(number, referrer, {
    value: spend,
  });
  estimate = BigInt(parseInt(estimate * 1.2));
  await contract.mintAndPurge(number, referrer, {
    value: spend,
    gasLimit: estimate,
  });
}
function maxButton(){
  if (ethCoin.value) maxMint(referralCode.value)
  else maxMintCoin()
}

async function maxMint(referrer){
  const cost = await contract.cost(); 
  const yourEth = etherBalance.value * 1000000000000000000
  let max = (yourEth / cost).toFixed(0)
  if (max > 400) max = 400 
  if (max == 0) return
  let spend = BigInt(cost * max);
  let estimate = await contract.estimateGas.mintAndPurge(max, referrer, {
    value: spend,
  });
  let maxfee = await provider.getGasPrice()
  console.log(max)
  while (estimate * maxfee + max * cost > yourEth){
    max = parseInt(max * (yourEth / (estimate * maxfee + max * cost)))-1 
    spend = BigInt(cost * max);
    estimate = await contract.estimateGas.mintAndPurge(max, referrer, {
    value: spend,
  });
  }
  mintQuantity.value = max
}

async function maxMintCoin(){
  const cost = await contract.cost(); 
  const yourEth = etherBalance.value * 1000000000000000000
  const yourPurged = purgedBalance.value * 1000000000000000000
  let max = (yourPurged / (cost * 1000)).toFixed(0)
  if (max > 400) max = 400 
  if (max == 0) return
  let estimate = await contract.estimateGas.coinMintAndPurge(max)
  let maxfee = await provider.getGasPrice()
  while (estimate * maxfee > yourEth){
    max = (max * 1-(((estimate * maxfee ) - yourEth) / (estimate * maxfee))).toFixed(0)
    estimate = await contract.estimateGas.coinMintAndPurge(max)
  }
  mintQuantity.value = max
}




async function coinMint(number) {
  let estimate = await contract.estimateGas.coinMint(number);
  estimate = BigInt(parseInt(estimate * 1.15));
  await contract.coinMint(number, { gasLimit: estimate });
}

async function coinMintAndPurge(number) {
  let estimate = await contract.estimateGas.coinMintAndPurge(number);
  estimate = BigInt(parseInt(estimate * 1.2));
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

const filteredTokens = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = new Set();
  if (ownedTokens.value) {
    Object.values(ownedTokens.value).forEach((token) => {
      for (let trait of token.traitnames) {
        let color = trait.toLowerCase().split(" ")[0]
        let shape = trait.toLowerCase().split(" ")[1]
        if (
          (typeof wordArray[1] == "undefined" &&
          color.includes(wordArray[0])) ||
          shape.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          wordArray[1].length == 1 &&
          letters.includes(wordArray[1]) &&
          shape === wordArray[1] &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        } else if (
          typeof wordArray[1] !== "undefined" &&
          (wordArray[1].length > 1 || !letters.includes(wordArray[1])) &&
          shape.includes(wordArray[1]) &&
          color.includes(wordArray[0])
        ) {
          filteredList.add(token);
        }
      }
    });
  }
  return filteredList;
});
</script>

<template>
<div  class="fixed top-12 left-0 w-full -z-10 p-5 grid grid-cols-5 gap-3 md:gap-5
                lg:grid-cols-8 lg:gap-7 2xl:grid-cols-10 2xl:gap-10">
      <!-- Background cards. Yeah this is ugly. DRY = Definitely Repeat Yourself imo -->
      <div class="group35"><img src="/img/transparent/blue_spade_transparent.png"/></div>
      <div class="group62"><img src="/img/transparent/red_3_transparent.png"/></div>
      <div class="group16"><img src="/img/transparent/purple_5_transparent.png"></div>
      <div class="group71"><img src="/img/transparent/brown_heart_transparent.png"></div>
      <div class="group39"><img src="/img/transparent/orange_monero_transparent.png"></div>
      <div class="group41"><img src="/img/transparent/purple_horseshoe_transparent.png"></div>
      <div class="group19"><img src="/img/transparent/red_dogecoin_transparent.png"></div>
      <div class="group15"><img src="/img/transparent/pink_2_transparent.png"></div>
      <div class="group24"><img src="/img/transparent/orange_club_transparent.png"></div>
      <div class="group26"><img src="/img/transparent/purple_chip_transparent.png"></div>
      <div class=""><img src="/img/transparent/green_cashsack_transparent.png"></div>
      <div class="group17"><img src="/img/transparent/pink_spade_transparent.png"></div>
      <div class="group54"><img src="/img/transparent/gold_club_transparent.png"></div>
      <div class="group76"><img src="/img/transparent/orange_4_transparent.png"></div>
      <div class="group12"><img src="/img/transparent/green_dogecoin_transparent.png"></div>
      <div class="group55"><img src="/img/transparent/gold_u_transparent.png"></div>
      <div class="group11"><img src="/img/transparent/green_6_transparent.png"></div>
      <div class="group14"><img src="/img/transparent/orange_monero_transparent.png"></div>
      <div class="group56"><img src="/img/transparent/brown_r_transparent.png"></div>
      <div class="group14"><img src="/img/transparent/blue_ethereum_transparent.png"></div>
      <div class="group61"><img src="/img/transparent/gold_p_transparent.png"></div>
      <div class="group32"><img src="/img/transparent/brown_u_transparent.png"></div>
      <div class="group74"><img src="/img/transparent/red_r_transparent.png"></div>
      <div class="group26"><img src="/img/transparent/orange_g_transparent.png"></div>
      <div class="group17"><img src="/img/transparent/blue_e_transparent.png"></div>
      <div class="group65"><img src="/img/transparent/purple_ethereum_transparent.png"></div>
      <div class="group31"><img src="/img/transparent/green_g_transparent.png"></div>
      <div class="group46"><img src="/img/transparent/pink_a_transparent.png"></div>
      <div class="group12"><img src="/img/transparent/brown_m_transparent.png"></div>
      <div class="group22"><img src="/img/transparent/red_e_transparent.png"></div>
      <div class="group19"><img src="/img/transparent/purple_8_transparent.png"></div>
      <div class="group51"><img src="/img/transparent/pink_1_transparent.png"></div>
      <div class="group53"><img src="/img/transparent/red_bitcoin_transparent.png"></div>
      <div class="group68"><img src="/img/transparent/blue_degen_transparent.png"></div>
      <div class="group19"><img src="/img/transparent/brown_2_transparent.png"></div>
      <div class="group72"><img src="/img/transparent/purple_horseshoe_transparent.png"></div>
      <div class="group34"><img src="/img/transparent/brown_7_transparent.png"></div>
      <div class="group46"><img src="/img/transparent/blue_diamond_transparent.png"></div>
      <div class="group13"><img src="/img/transparent/blue_3_transparent.png"></div>
      <div class="group32"><img src="/img/transparent/green_cardano_transparent.png"></div>
      <div class="group21"><img src="/img/transparent/red_heart_transparent.png"></div>
      <div class="group29"><img src="/img/transparent/purple_cashsack_transparent.png"></div>
      <div class="group62"><img src="/img/transparent/blue_dogecoin_transparent.png"></div>
      <div class="group13"><img src="/img/transparent/green_monero_transparent.png"></div>
      <div class="group54"><img src="/img/transparent/pink_ethereum_transparent.png"></div>
      <div class="group75"><img src="/img/transparent/orange_litecoin_transparent.png"></div>
      <div class="group16"><img src="/img/transparent/brown_solana_transparent.png"></div>
      <div class="group67"><img src="/img/transparent/purple_e_transparent.png"></div>
      <div class="group18"><img src="/img/transparent/gold_degen_transparent.png"></div>
      <div class="group49"><img src="/img/transparent/orange_bitcoin_transparent.png"></div>
      <div class="group50"><img src="/img/transparent/pink_chip_transparent.png"></div>
      <div class="group40"><img src="/img/transparent/blue_dogecoin_transparent.png"></div>
      <div class="group10"><img src="/img/transparent/green_monero_transparent.png"></div>
      <div class="group30"><img src="/img/transparent/purple_8_transparent.png"></div>
      <div class="group70"><img src="/img/transparent/brown_m_transparent.png"></div>
      <div class="group20"><img src="/img/transparent/blue_2_transparent.png"></div>
      <div class="group10"><img src="/img/transparent/brown_solana_transparent.png"></div>
      <div class="group60"><img src="/img/transparent/orange_solana_transparent.png"></div>
      <div class="group30"><img src="/img/transparent/purple_cherries_transparent.png"></div>
      <div class="group41"><img src="/img/transparent/orange_monero_transparent.png"></div>
      <div class="group12"><img src="/img/transparent/orange_litecoin_transparent.png"></div>
      <div class="group23"><img src="/img/transparent/purple_5_transparent.png"></div>
      <div class="group14"><img src="/img/transparent/gold_solana_transparent.png"></div>
      <div class="group55"><img src="/img/transparent/blue_degen_transparent.png"></div>
      <div class="group18"><img src="/img/transparent/green_dogecoin_transparent.png"></div>
      <div class="group49"><img src="/img/transparent/brown_club_transparent.png"></div>
      <div class="group55"><img src="/img/transparent/orange_cashsack_transparent.png"></div>
      <div class="group44"><img src="/img/transparent/brown_6_transparent.png"></div>
      <div class="group22"><img src="/img/transparent/green_4_transparent.png"></div>
      <div class="group35"><img src="/img/transparent/pink_cherries_transparent.png"></div>
      <div class="group71"><img src="/img/transparent/orange_p_transparent.png"></div>
      <div class="group27"><img src="/img/transparent/brown_m_transparent.png"></div>
      <div class="group19"><img src="/img/transparent/green_e_transparent.png"></div>
      <div class="group61"><img src="/img/transparent/blue_e_transparent.png"></div>
      <div class="group34"><img src="/img/transparent/brown_bitcoin_transparent.png"></div>
      <div class="group41"><img src="/img/transparent/brown_m_transparent.png"></div>
      <div class="group25"><img src="/img/transparent/pink_solana_transparent.png"></div>
      <div class="group33"><img src="/img/transparent/blue_solana_transparent.png"></div>
      <div class="group64"><img src="/img/transparent/green_4_transparent.png"></div>
      <div class="group54"><img src="/img/transparent/green_cherries_transparent.png"></div>
    </div>
  <div class="relative h-full mx-2">
    
    <img src="/main_logo_ns.png" class=" mb-10"
      style="width:80%;max-height:100vw;margin-left:auto;margin-right:auto" />
    <div
      class="
        mt-4
        p-1
        flex
        h-[30%]
        overflow-hidden
        bg-black
        border-2 border-green-800
        rounded-lg
      "
      style="opacity:.95"
    >
    <p class="my-6">
      <button
        @click="mintButton(mint)"
        class="mr-2 p-2 bg-black border rounded"
      >
        Mint
      </button>
      <button
        @click="toggleCoin(0)"
        class="mr-2 p-2 bg-black border rounded"
      >
        <img src="/thumbnails/gold-p.png"
        style="width:100%;max-height:100vw">
      </button>
            <button
        @click="toggleCoin(1)"
        class="mr-2 p-2 bg-black border rounded"
      >
        <img src="/thumbnails/blue-ethereum.png"
        style="width:100%;max-height:100vw">
      </button>


      <button
        @click="mintButton(mintAndPurge, ethCoin.value)"
        class="mx-2 p-2 bg-black border rounded"
      >
        Mint And Purge
      </button>
            <button
        @click="maxButton()"
        class="mx-2 p-2 bg-black border rounded"
      >
        MAX
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

      <input
        v-if="ethCoin"
        v-model="referralCode"
        placeholder="enter code"
        type="text"
        name="referral-code"
        size="10"
        class="ml-2 px-2 text-black"
      />
    </p>
  </div>
      <div
      class="
        mt-4
        p-1
        flex
        h-[10%]
        w-[30%]
        overflow-hidden
        bg-black
        border-2 border-green-800
        rounded-lg
      "
      style="opacity:.95"
    >
      <button
        @click="whitepaper()"
        class="mx-2 p-2 bg-black border rounded"
      >
        Whitepaper
      </button>
    </div>
    <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
      All traits <img src="/swipe.png" class="inline px-1" /> Purged traits
    </div>
  </div>
</template>