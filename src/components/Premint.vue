<script setup>
import { ref } from "vue";
import AboutReferralsModal from "./AboutReferralsModal.vue";

const showAboutReferrals =ref(false);
function whitepaper(){
    window.open('https://purge.game/whitepaper/');
}
function discord(){
    window.open('https://discord.com/invite/em98KKUfhq');
}


</script>


<template>
  <div
     class="fixed top-12 left-0 w-full -z-10 p-5 grid grid-cols-5 gap-3 md:gap-5
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
      <div class="group13"><img src="/img/transparent/pink_dogecoin_transparent.png"></div>
      <div class="group54"><img src="/img/transparent/pink_ethereum_transparent.png"></div>
      <div class="group75"><img src="/img/transparent/orange_litecoin_transparent.png"></div>
      <div class="group16"><img src="/img/transparent/brown_solana_transparent.png"></div>
      <div class="group67"><img src="/img/transparent/purple_e_transparent.png"></div>
      <div class="group18"><img src="/img/transparent/gold_degen_transparent.png"></div>
      <div class="group49"><img src="/img/transparent/orange_bitcoin_transparent.png"></div>
      <div class="group50"><img src="/img/transparent/pink_chip_transparent.png"></div>
      <div class="group40"><img src="/img/transparent/blue_dogecoin_transparent.png"></div>
      <div class="group10"><img src="/img/transparent/pink_dogecoin_transparent.png"></div>
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
<div></div>
  <div
    class="
      absolute
      top-0
      left-0
      w-full
      h-full
      bg-black bg-opacity-70
    "
  >

      <img 
        :src='`main_logo_ns.png`'
        style="min-width:200px;width:20%;max-height:100vw;margin-left:auto;margin-right:auto"
    >
      <button 
      @click="whitepaper()"
      class="
        absolute 
        top-1/2
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2">
      <img src="/buttons/whitepaper.png"
      class="max-h-15">
      </button>
            <button 
      @click="showAboutReferrals = true"
      class="
        absolute 
        top-3/4
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2">
      <img src="/buttons/referralprogram.png"
      class = "max-h-15">
      </button>
           <button 
      @click="discord()"
      class="
        absolute 
        bottom-0
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2">
      <img src="/buttons/joindiscord.png"
      class = "h-14">
      </button>
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
