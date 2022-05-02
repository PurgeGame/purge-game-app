<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import {
  wallet,
  contractaddress,
  ownedTokenData,
  purgedTokenData,
  purgeArray,
  bombTokenId,
  purgeIDs,
  state,
} from "../store.js";
import ConfirmationModal from "./ConfirmationModal.vue";
import BombModal from "./BombModal.vue";
import GGModal from "./GGModal.vue";
import { useApiGrab } from "../composables.js";

const props = defineProps(["filterString"]);
// const purgeIDs = ref([]);
const showConfirmationModal = ref(false);
const showBombModal = ref(false);
const showPurgedTokens = ref(0);

// Not sure this is the best way to wait for the API call, but it works
// const ownedTokens = reactive({});
// watch(ownedTokenData, () => (ownedTokens.value = ownedTokenData.value));

// const purgedTokens = reactive({});
// watch(purgedTokenData, () => (purgedTokens.value = purgedTokenData.value));

function thumbnailUrl(traitname) {
  const str = traitname.toLowerCase().split(" ");
  return `/thumbnails/${str[0]}-${str[1]}.png`;
}

function tokenImage(tokenId) {
  if (tokenId > 64500) tokenId = "bomb";
  return `/tokens/${tokenId}.png`;
}

function toggleTokenPurge(tokenId, purge) {
  if (tokenId < 64500) {
    if (purge) {
      purgeIDs.value.push(tokenId);
    } else {
      purgeIDs.value.splice(purgeIDs.value.indexOf(tokenId), 1);
    }
  } else {
    bombTokenId.value = tokenId;
    showBombModal.value = true;
  }
}

function sellButton(PurgeIDs) {
  for (const tokenId of PurgeIDs) {
    window.open(
      "https://testnets.opensea.io/assets/" +
        contractaddress +
        "/" +
        tokenId +
        "/sell"
    );
  }
}

function selectAll() {
  for (const token of filteredTokens.value) {
    if (token.tokenId < 64500) toggleTokenPurge(token.tokenId, true);
  }
}

function clearPurges() {
  for (const token of Object.values(ownedTokenData.value)) {
    if (token.tokenId < 64500) toggleTokenPurge(token.tokenId, false);
  }
}

function toggleTokenDisplay() {
  if (showPurgedTokens.value == 0) showPurgedTokens.value = 1;
  else showPurgedTokens.value = 0;
}

function showConfirmation() {
  purgeArray.value = purgeIDs.value;
  showConfirmationModal.value = true;
}

// function signSomething() {
//   let number = document.getElementById("number").value;
//   let referrer = document.getElementById("string").value;
//   mintAndPurge(number, referrer);
// }

const filteredTokens = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = new Set();
  if (ownedTokenData.value) {
    Object.values(ownedTokenData.value).forEach((token) => {
      for (let trait of token.traitnames) {
        let color = trait.toLowerCase().split(" ")[0];
        let shape = trait.toLowerCase().split(" ")[1];
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
  filteredList = Array.from(filteredList).reverse();
  return filteredList;
});

const filteredTokensPurged = computed(() => {
  const wordArray = props.filterString.toLowerCase().split(" ");
  const letters = ["p", "u", "r", "g", "e", "a", "m"];
  let filteredList = new Set();
  if (purgedTokenData.value) {
    Object.values(purgedTokenData.value).forEach((token) => {
      for (let trait of token.traitnames) {
        let color = trait.toLowerCase().split(" ")[0];
        let shape = trait.toLowerCase().split(" ")[1];
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

onMounted(() => {
  // Load API data, todo: something with error
  const { error } = useApiGrab(wallet.checksumAddress());
});
setInterval(function () {
  const { error } = useApiGrab(wallet.checksumAddress());
}, 30000);
</script>

<template>
  <div class="relative h-full">
    <!-- ---------- OWNED TOKENS ---------- -->
    <div v-if="showPurgedTokens == 0" class="h-full pt-2 px-4 md:px-2 lg:px-0">
      <div class="bg-black border-x-2 border-t-2 border-green-800">
        <div class="inline-block p-2 w-1/2 text-xl text-center text-amber-300">
          Owned Tokens
        </div>
        <button
          @click="toggleTokenDisplay()"
          class="
            p-2
            w-1/2
            bg-zinc-700
            border-l-2 border-b-2 border-green-800
            text-lg text-center text-zinc-300
          "
        >
          Purged Tokens
        </button>
      </div>
      <div
        class="
          p-2
          flex
          owned-height
          overflow-hidden
          bg-black
          border-x-2 border-b-2 border-green-800
        "
      >
        <div class="grow overflow-auto px-1">
          <div
            v-for="token in filteredTokens"
            class="inline-block w-1/3 my-0 p-1"
          >
            <div class="relative grid place-items-center">
              <img
                :src="tokenImage(token.tokenId)"
                @click="toggleTokenPurge(token.tokenId, true)"
                :title="'Token #' + token.tokenId"
                class="cursor-pointer"
              />
              <div
                v-if="purgeIDs.includes(token.tokenId)"
                @click="toggleTokenPurge(token.tokenId, false)"
                class="
                  absolute
                  flex
                  justify-center
                  items-center
                  w-full
                  h-full
                  z-10
                  bg-black/75
                  cursor-pointer
                "
              >
                <img
                  :src="`/fireoverlay.png`"
                  class="w-1/3"
                  :title="'Token #' + token.tokenId"
                />
                <!-- <div class="text-6xl">🔥</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-1 py-2">
        <div>
          <button
            @click="selectAll()"
            class="w-full text-center py-2 rounded bg-black text-amber-300"
          >
            Select all
          </button>
        </div>
        <div>
          <button
            @click="clearPurges()"
            class="w-full text-center py-2 rounded"
            :class="[
              purgeIDs.length == 0
                ? 'bg-zinc-700 text-slate-500'
                : 'bg-black text-amber-300',
            ]"
            :disabled="purgeIDs.length == 0"
          >
            Clear
          </button>
        </div>
        <div>
          <button
            @click="sellButton(purgeIDs)"
            class="w-full text-center py-2 rounded"
            :class="[
              purgeIDs.length == 1
                ? 'bg-green-900 text-amber-300'
                : 'bg-zinc-700 text-slate-500',
            ]"
            :disabled="purgeIDs.length != 1"
          >
            Sell
          </button>
        </div>
        <div>
          <button
            @click="showConfirmation()"
            class="w-full text-center py-2 rounded"
            :class="[
              purgeIDs.length == 0
                ? 'bg-zinc-700 text-slate-500'
                : 'bg-red-700 text-amber-300',
            ]"
            :disabled="purgeIDs.length == 0"
          >
            Purge
          </button>
        </div>
      </div>
    </div>
    <!-- ---------- END OWNED TOKENS ---------- -->

    <!-- ---------- PURGED TOKENS ---------- -->
    <div v-if="showPurgedTokens == 1" class="h-full pt-2 px-4 md:px-2 lg:px-0">
      <div class="bg-black border-x-2 border-t-2 border-red-700">
        <button
          @click="toggleTokenDisplay()"
          class="
            p-2
            w-1/2
            bg-zinc-700
            border-r-2 border-b-2 border-red-700
            text-lg text-center text-zinc-300
          "
        >
          Owned Tokens
        </button>
        <div class="inline-block p-2 w-1/2 text-xl text-center text-amber-300">
          Purged Tokens
        </div>
      </div>
      <div
        class="
          p-2
          flex
          purged-height
          overflow-hidden
          bg-black
          border-x-2 border-b-2 border-red-700
        "
      >
        <div class="grow overflow-auto px-1">
          <div
            v-for="token in filteredTokensPurged"
            class="inline-block w-1/3 my-0 p-1"
          >
            <div class="relative grid place-items-center">
              <img
                :src="tokenImage(token.tokenId)"
                :title="'Token #' + token.tokenId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ---------- END PURGED TOKENS ---------- -->

    <!-- ---------- FOOTER SWIPE ICON ---------- -->
    <div class="absolute bottom-0 w-full my-2 text-center lg:hidden">
      All traits <img src="/swipe.png" class="inline px-1" /> Purged traits
    </div>
  </div>

  <!-- ---------- MODALS ---------- -->
  <div
    v-if="showConfirmationModal"
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
    <ConfirmationModal @close-modal="showConfirmationModal = false" />
  </div>
  <div
    v-if="showBombModal"
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
    <BombModal @close-modal="showBombModal = false" />
  </div>
  <!-- <div
    v-if="state.gameOver"
        class="
          absolute 
          top-1/2 
          left-1/2 
          transform 
          -translate-x-1/2 
          -translate-y-1/2
      z-50
      w-25
      h-25
      overflow-y-scroll
      bg-zinc-700 bg-opacity-80
    ">
    <GGModal />
    </div> -->
</template>

<style scoped>
.owned-height {
  height: 81%;
}
@media screen and (max-height: 810px) {
  .owned-height {
    height: 75%;
  }
}
@media screen and (max-height: 640px) {
  .owned-height {
    height: 67%;
  }
}

.purged-height {
  height: 87%;
}
@media screen and (max-height: 800px) {
  .purged-height {
    height: 84%;
  }
}
@media screen and (max-height: 650px) {
  .purged-height {
    height: 78%;
  }
}
</style>
>>>>>>> Stashed changes
