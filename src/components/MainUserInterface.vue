<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { wallet, state, purgedBalance, discordstatus, referralCode, apiaddress, signer } from "../store.js";
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
const showAboutReferrals = ref(false);
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

const resetDiscord = () =>{
  discordstatus.value = 0
}

const onClickReferral = () => {
  referralCode.value = typedReferralCode.value;
};

async function submitDiscord(){
  const discordID = discord.value.split('#')
  if (
    isNaN(discordID[1]) || 
    parseInt(discordID[1]) > 9999 ||
    parseInt(discordID[1]) < 0 ||
    discordID[0].length > 32
  ){
    window.alert("invalid discord ID")
    return
  }
  const signature = await signer.signMessage('"Sign to verify address ownership"')
  const postData = {}
  postData['address'] = wallet.checksumAddress()
  postData['username'] = discordID[0]
  postData['discriminator'] = discordID[1]
  postData['signature'] = signature
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  }
  fetch(apiaddress + '/discord/', requestOptions)
  // fetch('http://127.0.0.1:8000:8000/discord/', requestOptions)
  discordstatus.value = 1
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


onBeforeMount(() => {
  // Load API data, todo: something with error
  gameState()

 });

onMounted(() => {
  // Bring the middle column into view on page load. For small screens.
  middleColumn.value.scrollIntoView({ inline: "start" });
  // Do referral and cookie stuff (incomplete)
  const params = new URLSearchParams(document.location.search);
  const urlParams = params.get("ref");
  if (urlParams) {
    document.cookie = "ref=" +urlParams +"; expires=Sun, 1 Jan 2023 12:00:00 UTC"
    referralCode.value = urlParams;
  }
  else{
    referralCode.value = getCookie('ref')
  }
});
</script>


<template>
  <div
    @keydown.esc="showMenu = false"
    class="flex flex-col h-screen max-w-screen-2xl overscroll-none mx-auto"
  >
    <div class="static mb-2 bg-black bg-opacity-50">
      <button
        @click="toggleHamburgerMenu()"
        class="
          mx-4
          my-1
          px-2
          py-1
          bg-black
          rounded-md
          ring-1 ring-red-900
          hover:ring-1 hover:ring-amber-300
          text-2xl
          hover:text-amber-300

          font-black
        "
      >
        ☰
      </button>

      <input
        v-if="state.reveal"
        v-model="filterString"
        placeholder="&#x1F50E;&#xFE0E; filter traits"
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
      <div v-if="discordstatus.value==null"
        class="inline-block">
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
      <div v-if="discordstatus.value != null"
      class="inline-block">
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
          "/>
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
      <button
        @click="onClickDisconnect()"
        class="
          float-right
          m-1
          px-2
          py-0
          bg-black
          rounded-md
          hover:text-amber-300 hover:ring-1 hover:ring-amber-300
        "
      >
        <img src="/metamask-fox.svg" 
          class="scale-75 hidden md:inline" 
          style="
          height:42px
          max-width:100mx"
        />
        ...{{
          wallet.address.substring(38)
        }}
      </button>

      <button v-if="purgedBalance !=null"
        class="
          float-right
          m-1
          px-2
          py-0
          bg-black
          rounded-md
          hover:text-amber-300 hover:ring-1 hover:ring-amber-300
        "
      >
        <img src="/thumbnails/gold-p.png" 
        class="scale-75 inline" 
        style="
          height:42px
          max-width:100mx"
        />
               {{ purgedBalance }}
      </button>
    </div>
    <div
      v-if="showMenu"
      class="
        absolute
        top-12
        left-6
        z-20
        bg-gradient-to-br
        from-zinc-500
        to-zinc-400
        px-1
        py-2
        rounded
        border border-black
        shadow-lg
        text-black
        font-bold
      "
    >
      <ul class="list-none">
        <li
          class="
            rounded
            px-2
            hover:bg-black
            hover:text-amber-300
            hover:ring-1
            hover:ring-amber-300
          "
        >
          <a href="https://purge.game/">Exit App</a>
        </li>
        <li
          @click="resetDiscord()"
          class="
            rounded
            px-2
            hover:bg-black
            hover:text-amber-300
            hover:ring-1
            hover:ring-amber-300
            hover:cursor-pointer
          "
        >
          Connect Discord 
        </li>
        <li
          @click="showLeaderboard = true"
          class="
            rounded
            px-2
            hover:bg-black
            hover:text-amber-300
            hover:ring-1
            hover:ring-amber-300
            hover:cursor-pointer
          "
        >
          Leaderboard
        </li>
        <hr class="my-2 border-1 border-zinc-800" />

        <li class="px-2">
          <h4 class="inline-block font-normal text-sm">Referral Code</h4>
          <div
            @click="showAboutReferrals = true"
            class="
              float-right
              align-middle
              bg-black
              my-1
              px-2
              rounded-xl
              font-normal
              text-amber-300
              hover:ring-1 hover:ring-amber-300 hover:cursor-pointer
            "
          >
            ?
          </div>
          <br />
          <div v-if="referralCode">
            {{ referralCode }}
            <button
              @click="referralCode = ''"
              class="
                float-right
                align-middle
                bg-black
                mt-1
                px-2
                rounded
                font-normal
                text-amber-300
                hover:ring-1 hover:ring-amber-300
              "
            >
              edit
            </button>
          </div>

          <div v-else>
            <input
              @keydown.enter="onClickReferral()"
              v-model="typedReferralCode"
              placeholder="enter code"
              class="bg-zinc-200"
            />
            <br />
            <button
              @click="onClickReferral()"
              class="
                float-right
                align-middle
                bg-black
                mt-1
                px-2
                rounded
                font-normal
                text-amber-300
                hover:ring-1 hover:ring-amber-300
              "
            >
              submit
            </button>
          </div>
        </li>
      </ul>
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
      <div
        class="
          grid grid-cols-3
          h-full
          w-[300vw]
          md:w-[150vw]
          lg:w-full
          touch-pan-x
        "
      >
      <!-- Wait for state loading -->

        <div v-if="state.reveal == null"
        class="snap-start snap-always h-full overflow-hidden">
        </div>
        <div v-if="state.reveal == null">
          <div
            ref="middleColumn"
            class="snap-end snap-always h-full overflow-auto">
            <img 
              :src="`loadscreen.gif`"
              style="width:70%; margin-left:auto; margin-right:auto"
            />
          </div>
        </div>

        <!-- load mint page if pre-reveal -->

        <div v-if="state.reveal == 0"
        class="snap-start snap-always h-full overflow-hidden">
        <LeftMint/>
        </div>
        <div v-if="state.reveal == 0"
          ref="middleColumn"
          class="snap-start snap-always h-full overflow-auto">
          <Mint />
        </div>
        <div v-if="state.reveal == 0"
        class="snap-end snap-always h-full overflow-auto">
        <RightMint/>
        </div>

      <!-- Load main UI if post-reveal -->

        <div v-if="state.reveal == 1"
        class="snap-start snap-always h-full overflow-hidden">
          <UserInterfaceLeft :filter-string="filterString" />
        </div>
        <div v-if="state.reveal == 1"
          ref="middleColumn"
          class="snap-start snap-always h-full overflow-auto"
        >
          <TokenDisplay :filter-string="filterString" />
        </div>
        <div v-if="state.reveal == 1"
        class="snap-end snap-always h-full overflow-auto">
          <UserInterfaceRight :filter-string="filterString" />
        </div>
      </div>
    </div>
  </div>
  <!-- ____________________ Modals ____________________ -->
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
</template>
