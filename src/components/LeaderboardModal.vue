<script setup>
import { ref, onMounted } from "vue";
import {
  wallet,
  prizepool,
  contract,
  referralData,
  apiaddress
} from "../store.js";
const rewards =[.04,.02,.01,.008,.006,.005,.004,.003,.002,.002]



const emit = defineEmits(["closeModal"]);

onMounted(() => {
  leaderboardApiGrab()
});

async function leaderboardApiGrab() {
  prizepool.total = await contract.PrizePool() / 1e18
  const walletAddress = wallet.checksumAddress()
  const apiEndpoint = apiaddress + '/referrals/' + walletAddress
  // const apiEndpoint = 'http://127.0.0.1:8000/referrals/' + walletAddress
  const fetchError = ref('')
  const data = await fetch(apiEndpoint)
    .then((res) => res.json())
    .catch((err) => (fetchError.value = err))
  referralData.leaders = data.leaders
  referralData.totalreferrals = data.totalreferrals
  referralData.referrals = data.referrals
  referralData.codes = data.codes
  return { fetchError }
}

function prizePool(){
  if (prizepool.total < .1) return 500
  else return prizepool.total
}

function buildJSON(){
  const data = {};
  data.referrals = referralData.referrals;
  data.codes = referralData.codes;
  return data
  const json = JSON.stringify(data);
  const dataURL = `data:application/json,${json}`;
}

function download(content, fileName, contentType) {
 const a = document.createElement("a");
 const file = new Blob([content], { type: contentType });
 a.href = URL.createObjectURL(file);
 a.download = fileName;
 a.click();
}
function onDownload(){
 download(JSON.stringify(buildJSON()), "referrals.json", "text/plain");
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
      from-zinc-300
      to-zinc-300
      text-lg text-black
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
    <h2 class="font-bold text-xl">Referral Leaderboard</h2>
    <p>
      Current leaderboard pool : <b>{{prizePool() / 10}} eth</b> (based on 10k mints if pre-mint)
    </p>
    <div
      class="
        mt-4
        p-1
        flex
        h-[94%]
        overflow-hidden
        bg-black
        border-4 border-red-700
        rounded-lg
      "
    >

      <div class="grow overflow-auto px-1">
        <div v-if="referralData.leaders != null">
          <table class="w-full">
            <tbody class="text-white">
              <tr v-for="user, index in referralData.leaders">
                <td class="border-b-2 border-amber-300 text-center">
                  # {{index +1}}
                </td>
                <td class="border-b-2 border-amber-300 text-center">
                  {{ user }}
                </td>
                <td class="border-b-2 border-amber-300 text-center">
                  {{rewards[index] * 1000}} %
                </td>

                <td class="border-b-2 border-amber-300 text-center pr-4">
                  {{(rewards[index] * prizePool()).toFixed(4)}} eth  
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <div v-else class="">
          <img class="
          h-80            
          relative 
          left-1/2         
          transform 
          -translate-x-1/2 " 
          :src="`loadscreen.gif`" />
        </div>

      </div>

    </div>
              <div v-if="referralData.totalreferrals > 0"
              class="text-center text-black">
            <b>Your Total Referrals : {{referralData.totalreferrals}}</b>
            <p>
              <button
                @click="onDownload()"
                class="mx-2 p-1 bg-black border rounded text-white">
                Download detailed information
               </button>
            </p>
          </div>
  </div>
</template>