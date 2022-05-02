<script setup>
import { ref, watchEffect, onMounted, onBeforeMount } from "vue";
import {
  wallet,
  state,
  purgedBalance,
  discordstatus,
  referralCode,
} from "../store.js";
import { gameState } from "../composables.js";
// Child components
import UserInterfaceLeft from "./UserInterfaceLeft.vue";
import Mint from "./Mint.vue";
import UserInterfaceRight from "./UserInterfaceRight.vue";
import TokenDisplay from "./TokenDisplay.vue";
import AboutReferralsModal from "./AboutReferralsModal.vue";
import LeaderboardModal from "./LeaderboardModal.vue";
import LeftMint from "./LeftMint.vue";
import RightMint from "./RightMint.vue";

const typedReferralCode = ref(null);
const filterString = ref("");
const showMenu = ref(false);
const showDiscordModal = ref(false);
const showAboutReferrals =ref(false);
const showLeaderboard = ref(false);
const middleColumn = ref(null);
const discord = ref(null);

const toggleHamburgerMenu = () => {
  showMenu.value = showMenu.value == true ? false : true;
};

const onClickDisconnect = () => {
  // Fake disconnect, because MetaMask won't allow a real one from an app
  wallet.address = null;
};

const resetDiscord = () => {
  discordstatus.value = 0;
};

const onClickReferral = () => {
  referralCode.value = typedReferralCode.value;
};

async function submitDiscord() {
  const discordID = discord.value.split("#");
  if (
    isNaN(discordID[1]) ||
    parseInt(discordID[1]) > 9999 ||
    parseInt(discordID[1]) < 0 ||
    discordID[0].length > 32
  ) {
    window.alert("invalid discord ID");
    return;
  }
  const signature = await signer.signMessage(
    '"Sign to verify address ownership"'
  );
  const postData = {};
  postData["address"] = wallet.checksumAddress();
  postData["username"] = discordID[0];
  postData["discriminator"] = discordID[1];
  postData["signature"] = signature;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  };
  fetch(apiaddress + "/discord/", requestOptions);
  // fetch('http://127.0.0.1:8000:8000/discord/', requestOptions)
  discordstatus.value = 1;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

watchEffect(() => {
  // Bring the middle column into view on page load. For small screens.
  if (state.reveal != null && middleColumn.value != null)
    middleColumn.value.scrollIntoView({ inline: "start" });
});

onBeforeMount(() => {
  // Load API data, todo: something with error
  gameState();
});

onMounted(() => {
  const params = new URLSearchParams(document.location.search);
  const urlParamsRef = params.get("ref");
  if (urlParamsRef) {
    document.cookie =
      "ref=" + urlParamsRef + "; expires=Sun, 1 Jan 2023 12:00:00 UTC";
    referralCode.value = urlParamsRef;
  } else {
    referralCode.value = getCookie("ref");
  }
  if (params.get("showreferrals") == 1) {
    showAboutReferrals.value = true;
  }
  if (params.get("leaderboard") == 1) {
    showLeaderboard.value = true;
  }
});
</script>


<template>
  <div class="flex flex-col h-screen max-w-screen-2xl overscroll-none mx-auto">
    <div class="static mb-2 bg-black bg-opacity-50">
      <input
        v-if="state.reveal"
        v-model="filterString"
        placeholder="&#x1F50E;&#xFE0E; filter traits"
        class="
          w-2/5
          md:w-min
          m-2
          px-1
          bg-zinc-400
          border-2 border-red-900
          outline-none
          focus:bg-amber-200
          text-black
          font-bold
          placeholder:font-normal placeholder:text-zinc-600
        "
      />

      <!-- Discord form on medium and large displays-->
      <div v-if="discordstatus.value == null" class="hidden md:inline-block">
        <input
          v-model="discord"
          placeholder="Enter discord NAME#XXXX"
          class="
            w-2/5
            md:w-min
            px-1
            bg-zinc-400
            border-2 border-red-900
            outline-none
            focus:bg-amber-200
            text-black
            font-bold
            placeholder:font-normal placeholder:text-zinc-600
          "
        />
        <button
          @click="submitDiscord()"
          class="
            border-2 border-red-900
            m-1
            px-2
            py-0
            bg-black
            rounded-md
            active:bg-blue-500
            hover:text-amber-300 hover:ring-1 hover:ring-amber-300
          "
        >
          Submit
        </button>
      </div>
      <div v-if="discordstatus.value != null" class="hidden md:inline-block">
        <div v-if="!discordstatus.value">
          <input
            v-model="discord"
            placeholder="Enter discord NAME#XXXX"
            class="
              w-2/5
              md:w-min
              px-1
              bg-zinc-400
              border-2 border-red-900
              outline-none
              focus:bg-amber-200
              text-black
              font-bold
              placeholder:font-normal placeholder:text-zinc-600
            "
          />
          <button
            @click="submitDiscord()"
            class="
              border-2 border-red-900
              m-1
              px-2
              py-0
              bg-black
              rounded-md
              active:bg-blue-500
              hover:text-amber-300 hover:ring-1 hover:ring-amber-300
            "
          >
            Submit
          </button>
        </div>
      </div>
      <!-- End Discord for medium and large displays-->

      <!-- Discord button, for small screens only-->
      <button @click="showDiscordModal = true" class="inline-block md:hidden">
        <img src="/discord.png" class="inline h-[36px] ml-2" />
      </button>

      <!-- MetaMask  -->
      <button
        @click="onClickDisconnect()"
        class="
          float-right
          m-1
          h-[36px]
          md:h-auto
          px-2
          py-1
          bg-black
          rounded-md
          hover:text-amber-300 hover:ring-1 hover:ring-amber-300
        "
      >
        <img src="/metamask-fox.svg" class="h-[28px] hidden md:inline" />
        ...{{ wallet.address.substring(38) }}
      </button>

      <!-- Purged Balance -->
      <div
        v-if="purgedBalance != null"
        class="float-right m-1 px-1 md:px-4 py-1 bg-black rounded-md"
      >
        <img src="/thumbnails/gold-p.png" class="inline h-[28px]" />
        {{ purgedBalance }}
      </div>
    </div>

    <div
      @click="showMenu = false"
      class="
        grow
        overflow-x-scroll
        lg:overflow-x-auto
        overflow-hidden
        snap-mandatory snap-x
        lg:snap-none
      "
    >
      <!-- Wait for state loading -->
      <div v-if="state.reveal == null">
        <img class="h-[70vh] portrait:h-auto m-auto" :src="`loadscreen.gif`" />
      </div>

      <!-- Load mint page if pre-reveal -->
      <div
        v-if="state.reveal == 0"
        class="
          grid grid-cols-3
          h-full
          w-[300vw]
          md:w-[150vw]
          lg:w-full
          touch-pan-x
        "
      >
        <div class="snap-start snap-always h-full overflow-hidden">
          <LeftMint />
        </div>
        <div
          ref="middleColumn"
          class="snap-start snap-always h-full overflow-auto"
        >
          <Mint />
        </div>
        <div class="snap-end snap-always h-full overflow-auto">
          <RightMint />
        </div>
      </div>

      <!-- Load main UI if post-reveal -->
      <div
        v-if="state.reveal == 1"
        class="
          grid grid-cols-3
          h-full
          w-[300vw]
          md:w-[150vw]
          lg:w-full
          touch-pan-x
        "
      >
        <div class="snap-start snap-always h-full overflow-hidden">
          <UserInterfaceLeft :filter-string="filterString" />
        </div>
        <div
          ref="middleColumn"
          class="snap-start snap-always h-full overflow-auto"
        >
          <TokenDisplay :filter-string="filterString" />
        </div>
        <div class="snap-end snap-always h-full overflow-auto">
          <UserInterfaceRight :filter-string="filterString" />
        </div>
      </div>
    </div>
  </div>

  <!-- Discord modal, for small screens -->
  <div
    v-if="showDiscordModal"
    class="
      absolute
      top-0
      left-0
      z-50
      w-full
      h-full
      overflow-y-scroll
      bg-zinc-700 bg-opacity-80
    "
  >
    <div
      class="relative top-36 w-11/12 m-auto p-4 bg-black text-center rounded-lg"
    >
      <button
        @click="showDiscordModal = false"
        class="px-3 py-1 rounded ring-1 ring-red-900 float-right"
      >
        X
      </button>
      <br /><br /><br />
      <div v-if="discordstatus.value == null" class="">
        <span class="text-amber-300">Connect Discord Account</span>
        <input
          v-model="discord"
          placeholder="Discord NAME#XXXX"
          class="
            w-3/5
            md:w-min
            px-1
            bg-zinc-400
            border-2 border-red-900
            outline-none
            focus:bg-amber-200
            text-black
            font-bold
            placeholder:font-normal placeholder:text-zinc-600
          "
        />
        <button
          @click="submitDiscord()"
          class="
            border-2 border-red-900
            m-1
            px-2
            py-0
            bg-black
            rounded-md
            active:bg-blue-500
            hover:text-amber-300 hover:ring-1 hover:ring-amber-300
          "
        >
          Submit
        </button>
      </div>
      <div v-if="discordstatus.value != null" class="">
        <div v-if="!discordstatus.value">
          <span class="text-amber-300">Connect Discord Account</span>
          <input
            v-model="discord"
            placeholder="Discord NAME#XXXX"
            class="
              w-3/5
              md:w-min
              px-1
              bg-zinc-400
              border-2 border-red-900
              outline-none
              focus:bg-amber-200
              text-black
              font-bold
              placeholder:font-normal placeholder:text-zinc-600
            "
          />
          <button
            @click="submitDiscord()"
            class="
              border-2 border-red-900
              m-1
              px-2
              py-0
              bg-black
              rounded-md
              active:bg-blue-500
              hover:text-amber-300 hover:ring-1 hover:ring-amber-300
            "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
   <div
    v-if="showLeaderboard"
    class="
      absolute
      top-0
      left-0
      z-50
      w-full
      h-full
      overflow-y-scroll
      bg-zinc-700 bg-opacity-80
    "
  >
    <LeaderboardModal @close-modal="showLeaderboard = false" />
  </div>
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
      bg-zinc-700 bg-opacity-80
    "
  >
    <AboutReferralsModal @close-modal="showAboutReferrals = false" />
  </div>

</template>
