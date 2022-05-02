<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import {
  wallet,
  prizepool,
  provider,
  contract,
  coinContract,
  purgedBalance,
  cost,
  referralCode,
} from "../store.js";
import { compileScript } from "@vue/compiler-sfc";

const props = defineProps(["filterString"]);
let loading = ref(0)
const etherBalance = ref(null);
const ethCoin = ref(1);
// Form input bindings
const mintQuantity = ref(1);

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
  cost.value = await contract.cost();
}

async function createReferralCode() {
  if (referralCode.value) {
    await contract.createReferralCode(referralCode.value);
  } else {
    window.alert("You must enter a referral code first");
  }
}

function whitepaper() {
  window.open("https://purge.game/concept.html");
}

function purgeButton() {
  if (purgeIDs.value) {
    var tokenIds = purgeIDs.value.split(",").map(Number);
    purge(tokenIds);
  } else {
    window.alert("No token ID's to purge");
  }
}
function toggleCoin(toggle) {
  if (toggle == 0) {
    if (purgedBalance.value > cost.value / 1e15) {
      ethCoin.value = toggle;
    } else window.alert("Insufficient $PURGED balance");
  } else ethCoin.value = toggle;
}

function mintButton(mintType) {
  if (mintQuantity.value > 0) {
    if (ethCoin.value == 1) mintType(mintQuantity.value, referralCode.value);
    else if (ethCoin.value == 0) coinMintButton(mintType);
  } else {
    window.alert("Quantity must be greater than 0");
  }
}

async function mint(number, referrer) {
  const spend = BigInt(cost.value * number);
  try{ let estimate = await contract.estimateGas.mint(number, referrer, {
    value: spend,
  });
    } catch(error){
      window.alert(error.error.message);
    }
  estimate = BigInt(parseInt(estimate * 1.15));
  await contract.mint(number, referrer, { value: spend, gasLimit: estimate });
}

async function mintAndPurge(number, referrer) {
  const spend = BigInt(cost.value * number);
  try{ let estimate = await contract.estimateGas.mintAndPurge(number, referrer, {
    value: spend,
  });
    } catch(error){
      window.alert(error.error.message);
    }
  estimate = BigInt(parseInt(estimate * 1.2));
  await contract.mintAndPurge(number, referrer, {
    value: spend,
    gasLimit: estimate,
  });
}
function maxButton() {

  if (ethCoin.value) maxMint(referralCode.value);
  else maxMintCoin();
}
// maybe tone down the 1.75x estimate on mainnet
async function maxMint(referrer) {
  loading.value = 1
  etherBalance.value = ethers.utils.formatEther(
    await provider.getBalance(wallet.address)
  );
  const yourEth = etherBalance.value * 1e18;
  let max = (yourEth / cost.value).toFixed(0);
  if (max > 400) max = 400;
  if (max == 0) return;
  let spend = BigInt(cost.value * max);
  let estimate = await contract.estimateGas.mint(max, referrer, {
    value: spend,
  });
  let maxfee = await provider.getGasPrice();
  while (estimate * maxfee * 1.75 + max * cost.value > yourEth) {
    max =
      parseInt(
        max * (yourEth / (estimate * maxfee * 1.75 + max * cost.value))
      ) - 1;
    spend = BigInt(cost.value * max);
    estimate = await contract.estimateGas.mint(max, referrer, {
      value: spend,
    });
  }
  mintQuantity.value = max;
  loading.value = 0
}

async function maxMintCoin() {
  loading.value = 1
  purgedBalance.value = ethers.utils.formatEther(
    await coinContract.balanceOf(wallet.address)
  );
  const yourEth = etherBalance.value * 1e18;
  const yourPurged = purgedBalance.value * 1e18;
  let max = parseInt(yourPurged / (cost.value * 1000));
  if (max > 400) max = 400;
  if (max == 0) return;
  let estimate = await contract.estimateGas.coinMintAndPurge(max);
  let maxfee = await provider.getGasPrice();
  while (estimate * maxfee * 1.75 > yourEth) {
    max = parseInt(max * (yourEth / (estimate * maxfee * 1.75))) - 1;
    estimate = await contract.estimateGas.coinMintAndPurge(max);
  }
  mintQuantity.value = max;
  loading.value = 0
}

function coinMintButton(mintType) {
  if (mintType == mintAndPurge) coinMintAndPurge(mintQuantity.value);
  if (mintType == mint) coinMint(mintQuantity.value);
}

async function coinMint(number) {
  try{let estimate = await contract.estimateGas.coinMint(number);
    } catch(error){
      window.alert(error.error.message);
    }
  estimate = BigInt(parseInt(estimate * 1.15));
  await contract.coinMint(number, { gasLimit: estimate });
}

async function coinMintAndPurge(number) {
  try{let estimate = await contract.estimateGas.coinMintAndPurge(number);
    } catch(error){
      window.alert(error.error.message);
    }
  estimate = BigInt(parseInt(estimate * 1.2));
  await contract.coinMintAndPurge(number, { gasLimit: estimate });
}

onMounted(() => {
  doEthersStuff();
});
</script>

<template>
  <div
    class="
      fixed
      top-12
      left-0
      w-full
      -z-10
      p-5
      grid grid-cols-5
      gap-3
      md:gap-5
      lg:grid-cols-8 lg:gap-7
      2xl:grid-cols-10 2xl:gap-10
      brightness-[60%]
    "
  >
    <!-- Background cards. Yeah this is ugly. DRY = Definitely Repeat Yourself imo -->
    <div class="group35">
      <img src="/img/transparent/blue_spade_transparent.png" />
    </div>
    <div class="group62">
      <img src="/img/transparent/red_3_transparent.png" />
    </div>
    <div class="group16">
      <img src="/img/transparent/purple_5_transparent.png" />
    </div>
    <div class="group71">
      <img src="/img/transparent/brown_heart_transparent.png" />
    </div>
    <div class="group39">
      <img src="/img/transparent/orange_monero_transparent.png" />
    </div>
    <div class="group41">
      <img src="/img/transparent/purple_horseshoe_transparent.png" />
    </div>
    <div class="group19">
      <img src="/img/transparent/red_dogecoin_transparent.png" />
    </div>
    <div class="group15">
      <img src="/img/transparent/pink_2_transparent.png" />
    </div>
    <div class="group24">
      <img src="/img/transparent/orange_club_transparent.png" />
    </div>
    <div class="group26">
      <img src="/img/transparent/purple_chip_transparent.png" />
    </div>
    <div class="">
      <img src="/img/transparent/green_cashsack_transparent.png" />
    </div>
    <div class="group17">
      <img src="/img/transparent/pink_spade_transparent.png" />
    </div>
    <div class="group54">
      <img src="/img/transparent/gold_club_transparent.png" />
    </div>
    <div class="group76">
      <img src="/img/transparent/orange_4_transparent.png" />
    </div>
    <div class="group12">
      <img src="/img/transparent/green_dogecoin_transparent.png" />
    </div>
    <div class="group55">
      <img src="/img/transparent/gold_u_transparent.png" />
    </div>
    <div class="group11">
      <img src="/img/transparent/green_6_transparent.png" />
    </div>
    <div class="group14">
      <img src="/img/transparent/orange_monero_transparent.png" />
    </div>
    <div class="group56">
      <img src="/img/transparent/brown_r_transparent.png" />
    </div>
    <div class="group14">
      <img src="/img/transparent/blue_ethereum_transparent.png" />
    </div>
    <div class="group61">
      <img src="/img/transparent/gold_p_transparent.png" />
    </div>
    <div class="group32">
      <img src="/img/transparent/brown_u_transparent.png" />
    </div>
    <div class="group74">
      <img src="/img/transparent/red_r_transparent.png" />
    </div>
    <div class="group26">
      <img src="/img/transparent/orange_g_transparent.png" />
    </div>
    <div class="group17">
      <img src="/img/transparent/blue_e_transparent.png" />
    </div>
    <div class="group65">
      <img src="/img/transparent/purple_ethereum_transparent.png" />
    </div>
    <div class="group31">
      <img src="/img/transparent/green_g_transparent.png" />
    </div>
    <div class="group46">
      <img src="/img/transparent/pink_a_transparent.png" />
    </div>
    <div class="group12">
      <img src="/img/transparent/brown_m_transparent.png" />
    </div>
    <div class="group22">
      <img src="/img/transparent/red_e_transparent.png" />
    </div>
    <div class="group19">
      <img src="/img/transparent/purple_8_transparent.png" />
    </div>
    <div class="group51">
      <img src="/img/transparent/pink_1_transparent.png" />
    </div>
    <div class="group53">
      <img src="/img/transparent/red_bitcoin_transparent.png" />
    </div>
    <div class="group68">
      <img src="/img/transparent/blue_degen_transparent.png" />
    </div>
    <div class="group19">
      <img src="/img/transparent/brown_2_transparent.png" />
    </div>
    <div class="group72">
      <img src="/img/transparent/purple_horseshoe_transparent.png" />
    </div>
    <div class="group34">
      <img src="/img/transparent/brown_7_transparent.png" />
    </div>
    <div class="group46">
      <img src="/img/transparent/blue_diamond_transparent.png" />
    </div>
    <div class="group13">
      <img src="/img/transparent/blue_3_transparent.png" />
    </div>
    <div class="group32">
      <img src="/img/transparent/green_cardano_transparent.png" />
    </div>
    <div class="group21">
      <img src="/img/transparent/red_heart_transparent.png" />
    </div>
    <div class="group29">
      <img src="/img/transparent/purple_cashsack_transparent.png" />
    </div>
    <div class="group62">
      <img src="/img/transparent/blue_dogecoin_transparent.png" />
    </div>
    <div class="group13">
      <img src="/img/transparent/green_monero_transparent.png" />
    </div>
    <div class="group54">
      <img src="/img/transparent/pink_ethereum_transparent.png" />
    </div>
    <div class="group75">
      <img src="/img/transparent/orange_litecoin_transparent.png" />
    </div>
    <div class="group16">
      <img src="/img/transparent/brown_solana_transparent.png" />
    </div>
    <div class="group67">
      <img src="/img/transparent/purple_e_transparent.png" />
    </div>
    <div class="group18">
      <img src="/img/transparent/gold_degen_transparent.png" />
    </div>
    <div class="group49">
      <img src="/img/transparent/orange_bitcoin_transparent.png" />
    </div>
    <div class="group50">
      <img src="/img/transparent/pink_chip_transparent.png" />
    </div>
    <div class="group40">
      <img src="/img/transparent/blue_dogecoin_transparent.png" />
    </div>
    <div class="group10">
      <img src="/img/transparent/green_monero_transparent.png" />
    </div>
    <div class="group30">
      <img src="/img/transparent/purple_8_transparent.png" />
    </div>
    <div class="group70">
      <img src="/img/transparent/brown_m_transparent.png" />
    </div>
    <div class="group20">
      <img src="/img/transparent/blue_2_transparent.png" />
    </div>
    <div class="group10">
      <img src="/img/transparent/brown_solana_transparent.png" />
    </div>
    <div class="group60">
      <img src="/img/transparent/orange_solana_transparent.png" />
    </div>
    <div class="group30">
      <img src="/img/transparent/purple_cherries_transparent.png" />
    </div>
    <div class="group41">
      <img src="/img/transparent/orange_monero_transparent.png" />
    </div>
    <div class="group12">
      <img src="/img/transparent/orange_litecoin_transparent.png" />
    </div>
    <div class="group23">
      <img src="/img/transparent/purple_5_transparent.png" />
    </div>
    <div class="group14">
      <img src="/img/transparent/gold_solana_transparent.png" />
    </div>
    <div class="group55">
      <img src="/img/transparent/blue_degen_transparent.png" />
    </div>
    <div class="group18">
      <img src="/img/transparent/green_dogecoin_transparent.png" />
    </div>
    <div class="group49">
      <img src="/img/transparent/brown_club_transparent.png" />
    </div>
    <div class="group55">
      <img src="/img/transparent/orange_cashsack_transparent.png" />
    </div>
    <div class="group44">
      <img src="/img/transparent/brown_6_transparent.png" />
    </div>
    <div class="group22">
      <img src="/img/transparent/green_4_transparent.png" />
    </div>
    <div class="group35">
      <img src="/img/transparent/pink_cherries_transparent.png" />
    </div>
    <div class="group71">
      <img src="/img/transparent/orange_p_transparent.png" />
    </div>
    <div class="group27">
      <img src="/img/transparent/brown_m_transparent.png" />
    </div>
    <div class="group19">
      <img src="/img/transparent/green_e_transparent.png" />
    </div>
    <div class="group61">
      <img src="/img/transparent/blue_e_transparent.png" />
    </div>
    <div class="group34">
      <img src="/img/transparent/brown_bitcoin_transparent.png" />
    </div>
    <div class="group41">
      <img src="/img/transparent/brown_m_transparent.png" />
    </div>
    <div class="group25">
      <img src="/img/transparent/pink_solana_transparent.png" />
    </div>
    <div class="group33">
      <img src="/img/transparent/blue_solana_transparent.png" />
    </div>
    <div class="group64">
      <img src="/img/transparent/green_4_transparent.png" />
    </div>
    <div class="group54">
      <img src="/img/transparent/green_cherries_transparent.png" />
    </div>
  </div>

  <div>
    <img src="/main_logo_ns.png" class="w-1/2 m-auto mb-10" />

    <!-- ---------- ETH ---------- -->
    <div
      v-if="ethCoin == 1"
      class="w-full md:w-11/12 lg:w-10/12 m-auto px-4 md:px-2 lg:px-0"
    >
      <div class="bg-black border-x-2 border-t-2 border-green-800">
        <div class="inline-block w-1/2">
          <img
            src="/thumbnails/blue-ethereum.png"
            class="h-3/4 m-auto"
            title="Mint with Ethereum"
          />
        </div>
        <button
          @click="toggleCoin(0)"
          class="p-2 w-1/2 bg-zinc-700 border-l-2 border-b-2 border-green-800"
        >
          <img
            src="/thumbnails/gold-p.png"
            class="h-3/4 m-auto"
            title="Mint with $PURGED"
          />
        </button>
      </div>
      <div class="bg-black px-2 py-4 border-x-2 border-b-2 border-green-800">
        <div class="overflow-auto p-1">
          <div class="mb-8">
            <label for="mint-quantity">Quantity:</label>
            <input
              v-model="mintQuantity"
              type="number"
              name="mint-quantity"
              size="3"
              min="1"
              max="400"
              class="ml-1 px-1 text-black"
            />
            <button v-if="loading==0"
              @click="maxButton()"
              class="
                mx-2
                px-2
                bg-black
                rounded
                border
                hover:border-amber-300 hover:text-amber-300
              "
            >
              MAX
            </button>
            <button v-if="loading==1"
              @click="maxButton()"
              class="
                mx-2
                px-2
                bg-black
                rounded
                border
                hover:border-amber-300 hover:text-amber-300
              "
            >
              . . . 
            </button>
            <p v-if="cost != null" class="float-right text-amber-300">
              {{ +((mintQuantity * cost) / 1e18).toFixed(4) }} Eth
            </p>
          </div>
          <div class="float-left">
            <button
              @click="mintButton(mint)"
              class="
                px-2
                py-1
                bg-green-500
                text-black text-xl
                hover:text-white
                font-extrabold
                tracking-wide
                border border-amber-500
                rounded-lg
              "
            >
              MINT
            </button>
          </div>
          <div class="float-right">
            <button
              @click="mintButton(mintAndPurge)"
              class="
                px-2
                py-1
                bg-red-600
                text-black text-xl
                hover:text-amber-300
                font-extrabold
                border border-amber-300
                rounded-lg
              "
            >
              MINT &amp; PURGE
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ---------- END ETH ---------- -->

    <!-- ---------- $PURGED ---------- -->
    <div
      v-if="ethCoin == 0"
      class="w-full md:w-11/12 lg:w-10/12 m-auto px-4 md:px-2 lg:px-0"
    >
      <div class="bg-black border-x-2 border-t-2 border-red-700">
        <button
          @click="toggleCoin(1)"
          class="p-2 w-1/2 bg-zinc-700 border-r-2 border-b-2 border-red-700"
        >
          <img src="/thumbnails/blue-ethereum.png" class="h-3/4 m-auto" />
        </button>
        <div class="inline-block w-1/2">
          <img src="/thumbnails/gold-p.png" class="h-3/4 m-auto" />
        </div>
      </div>
      <div
        class="
          px-2
          py-8
          overflow-auto
          bg-black
          border-x-2 border-b-2 border-red-700
        "
      >
        <div class="px-1">
          <div class="mb-8">
            <label for="mint-quantity">Quantity:</label>
            <input
              v-model="mintQuantity"
              type="number"
              name="mint-quantity"
              size="3"
              min="1"
              max="400"
              class="ml-1 px-1 text-black"
            />
            <button v-if="loading==0"
              @click="maxButton()"
              class="
                mx-2
                px-2
                bg-black
                rounded
                border
                hover:border-amber-300 hover:text-amber-300
              "
            >
              MAX
            </button>
            <button v-if="loading==1"
              @click="maxButton()"
              class="
                mx-2
                px-2
                bg-black
                rounded
                border
                hover:border-amber-300 hover:text-amber-300
              "
            >
              . . . 
            </button>
            <p v-if="cost != null" class="float-right text-amber-300">
              {{ +((mintQuantity * cost * 1000) / 1e18).toFixed(1) }} $PURGED
            </p>
          </div>
          <div class="float-left">
            <button
              @click="mintButton(mint)"
              class="
                px-2
                py-1
                bg-green-500
                text-black text-xl
                hover:text-white
                font-extrabold
                tracking-wide
                border border-amber-500
                rounded-lg
              "
            >
              MINT
            </button>
          </div>
          <div class="float-right">
            <button
              @click="mintButton(mintAndPurge)"
              class="
                px-2
                py-1
                bg-red-600
                text-black text-xl
                hover:text-amber-300
                font-extrabold
                border border-amber-300
                rounded-lg
              "
            >
              MINT &amp; PURGE
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="ethCoin"
      class="
        mt-8
        mx-auto
        py-2
        px-4
        flex
        overflow-hidden
        bg-black
        border-2 border-red-700
        rounded-lg
        w-11/12
        md:w-10/12
      "
    >
      Referral Code:
      <input
        v-model="referralCode"
        placeholder="enter code"
        type="text"
        name="referral-code"
        size="10"
        class="ml-2 px-2 text-black"
      />
    </div>
  </div>
</template>