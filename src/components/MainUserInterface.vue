<!-- Page header and grid layout for 3 child columns -->

<script setup>
import { ref, onMounted } from "vue";
import UserInterfaceLeft from "./UserInterfaceLeft.vue";
import UserInterfaceMiddle from "./UserInterfaceMiddle.vue";
import UserInterfaceRight from "./UserInterfaceRight.vue";
import AboutReferralsModal from "./AboutReferralsModal.vue";
import LeaderboardModal from "./LeaderboardModal.vue";
import { wallet } from "../store.js";

const middleColumn = ref(null);
const showMenu = ref(false);
const urlParams = new URL(location).searchParams.get("referral");
const referralCode = ref(null);
const typedReferralCode = ref(null);
const showAboutReferrals = ref(false);
const showLeaderboard = ref(false);

const toggleHamburgerMenu = () => {
  showMenu.value = showMenu.value == true ? false : true;
};

const onClickDisconnect = () => {
  // Fake disconnect, because MetaMask won't allow a real one from an app
  wallet.address = null;
};

const onClickReferral = () => {
  referralCode.value = typedReferralCode.value;
};

onMounted(() => {
  // Bring the middle column into view on page load. For small screens.
  middleColumn.value.scrollIntoView({ inline: "start" });

  if (urlParams) {
    referralCode.value = urlParams;
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
          hover:ring-1 hover:ring-amber-500
          text-2xl text-amber-400
          font-black
        "
      >
        ☰
      </button>
      <button
        @click="onClickDisconnect()"
        class="
          float-right
          m-1
          px-2
          py-1
          bg-black
          rounded-md
          hover:text-amber-400 hover:ring-1 hover:ring-amber-500
        "
      >
        <img src="/metamask-fox.svg" class="inline scale-75" />
        {{ wallet.address.substring(0, 5) }}...{{
          wallet.address.substring(38)
        }}
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
            hover:text-amber-400
            hover:ring-1
            hover:ring-amber-400
          "
        >
          <a href="https://purge.game/">Exit App</a>
        </li>
        <li
          class="
            rounded
            px-2
            hover:bg-black
            hover:text-amber-400
            hover:ring-1
            hover:ring-amber-400
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
            hover:text-amber-400
            hover:ring-1
            hover:ring-amber-400
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
              text-amber-400
              hover:ring-1 hover:ring-amber-400 hover:cursor-pointer
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
                text-amber-400
                hover:ring-1 hover:ring-amber-400
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
                text-amber-400
                hover:ring-1 hover:ring-amber-400
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
        <div class="snap-start snap-always h-full overflow-hidden">
          <UserInterfaceLeft />
        </div>
        <div
          ref="middleColumn"
          class="snap-start snap-always h-full overflow-auto"
        >
          <UserInterfaceMiddle />
        </div>
        <div class="snap-end snap-always h-full overflow-auto">
          <UserInterfaceRight />
        </div>
      </div>
    </div>
  </div>
  <!-- Modals -->
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
