<script setup>
import { ref } from "vue";
import AboutReferralsModal from "./AboutReferralsModal.vue";
import LeaderboardModal from "./LeaderboardModal.vue";
const emit = defineEmits(["closeModal"]);
let scrollPosition = 0
const showAboutReferrals = ref(false);
const showLeaderboard = ref(false);
window.addEventListener('scroll', (event) => {
  toggleCardVisibility()
})

// Page scroll position as an integer between 0-99 
function calculateScrollPosition() {
  oldScrollPosition = scrollPosition
  el = document.scrollingElement
  scrollPosition = Math.floor((el.scrollTop / el.scrollHeight) * 100)
  return oldScrollPosition, scrollPosition
}

// Turn card group visibility on/off based on scroll position
// This is kinda buggy when reversing direction mid-page
function toggleCardVisibility() {
  calculateScrollPosition()
  els = document.querySelectorAll(('.group' + scrollPosition))

  // Toggle visibility on new scroll positions
  if (scrollPosition != oldScrollPosition) {
    els.forEach(el => 
      // 'opacity-0' is a Tailwind CSS utility class
      el.classList.toggle('opacity-0')
    )
  }

  // Reset all at top of page (bug fix)
  if (scrollPosition == 0) {
    allCards = document.querySelectorAll('div[class*="group"]')
    allCards.forEach(card => {
      card.classList.remove('opacity-0')
    })
  }

  // Hide all at bottom of page (bug fix)
  if (scrollPosition >= 75) {
    allCards = document.querySelectorAll('div[class*="group"]')
    allCards.forEach(card => {
      card.classList.add('opacity-0')
    })
  }
}

</script>

<template>
    <div  class="fixed top-12 left-0 w-full -z-10 p-5 grid grid-cols-5 gap-3 md:gap-5
        lg:grid-cols-8 lg:gap-7 2xl:grid-cols-10 2xl:gap-10" style = 'filter: brightness(60%)'>
      <!-- Background cards. Yeah this is ugly. DRY = Definitely Repeat Yourself imo -->
      <div class="group35"><img src="/img/transparent/blue_spade_transparent.png" /></div>
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
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet"> 
    <div class="sticky top-0 left-0 w-full h-12 bg-gradient-to-b from-zinc-900 to-zinc-700 shadow shadow-zinc-600">
        
      <div class="float-left h-12 p-2 ml-3">
        <a href="https://purge.game"><img src="/img/smallbanner.png" class="h-full p-1 rounded-md hover:bg-zinc-600 hover:ring-2 ring-amber-500"/></a>
      </div>
      <div class="float-right h-10 my-1 mr-5">
          
        <a href="https://discord.com/invite/em98KKUfhq"><img src="/img/discord.png" class="inline h-full mx-1 p-1 rounded-md hover:bg-zinc-600 hover:ring-2 ring-amber-500" alt="Discord logo" /></a>
        <a href="https://twitter.com/purge_game"><img src="/img/twitter.png" class="inline h-full mx-1 p-1 rounded-md hover:bg-zinc-600 hover:ring-2 ring-amber-500" alt="Twitter logo" /></a>
      </div>
          <button
      @click="$emit('closeModal')"
      class="
        sticky
        top-2
        float
        bg-black
        px-2
        rounded
        text-amber-300
        font-bold
        hover:ring-1 hover:ring-amber-300
      "
    >
      Close
    </button>
    </div>
   

    <div class="w-11/12 lg:w-9/12 2xl:w-4/16 max-w-5xl mx-auto mt-8">
    
	<section class="max-w-60 mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4 text-lg">
      <img src="/img/nobullshit_dkbg.png" class="max-full mx-auto p-3" alt="Purge Game logo" fetchpriority="high"/> 
	 </section>
    </div>
    <main class="w-11/12 lg:w-9/12 2xl:w-4/16 mx-auto mt-12 space-y-24">
    
      <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4 text-lg">
        <p>Purge Game is NFT trading distilled to its essence and strapped to a 
        rocket engine. 🚀 It is a game of interwoven luck and skill. Anyone can win, but sharp
        players can increase their odds by concocting superior social and 
        economic strategies. The rules of the game dictate that some tokens 
        <b>must</b> moon to multiple eth and one will eventually be worth several 
        hundred times the mint cost.</p>
		
		<div style="font-family: Staatliches" class ="text-3xl">The goal of Purge Game is to completely eliminate a trait 
          from the collection.</div>

        <p>The game is mechanically simple. At any given time you have three 
        options for your game piece:</p>

        <p>🔥 <b>Purge</b> - Purging your NFT will permanently destroy it and 
        create your ticket to the payout when the game is over, as well as 
        granting you $PURGED.</p>

        <p>💰 <b>Sell</b> - Like any other NFT, you may sell your game piece for 
        whatever someone else is willing to pay.</p>

        <p>💎🤲 <b>Hold</b> - The biggest payoffs come to those with patience, 
        but ultimately you must burn to earn!</p>
      </section>

      <div class="md:max-w-5xl mx-auto md:grid md:grid-cols-5 md:gap-5">
        <section class="md:col-span-3 p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
          <h2 class="text-3xl font-black grid place-items-center">How it Works</h2>

          <p>Players mint NFTs, which will be then be revealed at the start of the 
          game. Each token has four traits, some of which are more rare than 
          others. Ownership of a token will grant you access to the discord 
          channels corresponding with its traits, where you can formulate 
          strategies with fellow owners to win the game.</p>

          <p>When a player chooses to purge a game piece, the NFT is destroyed and 
          a ticket is created in the game's memory. This ticket entitles the 
          player to a payout at the end of the game if their token contained the 
          winning trait.</p>
		  
          <p>The game is over as soon as any one trait has been completely purged. 
          When a trait ceases to exist, everyone who purged a token with that 
          trait will receive a large payout, with a massive bonus going to the 
          player who completes the extermination. </p>

          <p>Speculators who just want to test their luck also have the option to 
          "Mint and Purge" as many tokens as they would like. Players who 
          choose this option will receive a ticket to the rewards generated exactly 
		  the same way as someone who minted and immediately purged their token.
		  This method saves gas and is the simplest way to have a chance to win big.</p> 
           
		  <p>Tickets generated in this fashion will be eligible for the MAP Jackpot. 
		  10% of the prize pool generated by Mint and Purging will go towards this 
		  jackpot instead of the main prize. One ticket will be randomly selected 
		  near the start of the game to win the entire jackpot.</p>

          <p>Players are granted some $PURGED for each token they purge. 
          This ERC20 token can be burned to mint Purge Game NFTs in future seasons.</p>

        </section>
        <section class="md:col-span-2 my-36 lg:my-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
          
          <h2 class="text-3xl font-black grid place-items-center">Example Game Piece</h2>
          <p>All Purge Game NFTs have a trait in each quadrant of the game piece.</p>
          <p></p>
          <img src="/img/example.png" class="max-full mx-auto p-3" alt="Example Token" /> 
          <div class="w-4/5 mx-auto text-lg">
            <p><b>This NFT has these traits:</b></p>
            <ul class="list-disc list-inside text-base">
              <li>Red Bitcoin (uncommon)</li>
              <li>Blue P (rare)</li>
              <li>Gold Spade (precious)</li>
              <li>Pink 8 (common)</li>
            </ul>
          </div>
          <p></p>
        </section>
      </div>
      <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
        <h2 class="text-3xl font-black grid place-items-center">The Endgame</h2>
        <p>As the number of remaining tokens dwindles, the stakes get higher. 
        If you are the one who completes the extermination of a trait,
        you receive a massive bonus equal to 10% 
        of the prize pool minus the MAP Jackpot.</p>

        <p>Holders of NFTs with the same trait are thus incentivized to both 
        cooperate and compete with one another. This is why, despite the
        uncomplicated mechanics, the game is strategically complex. Players 
        are able to gain an edge through a diverse blend of both social and 
        economic skills.</p>

        <p>Purge Game staff will <b>NEVER</b> assist in any sort of dealmaking. All 
          agreements between players are made at your own risk. Deceiving 
          other players about your intentions is explicitly allowed.</p>
      </section>
      <div class="md:max-w-5xl mx-auto md:grid md:grid-cols-5 md:gap-5">
        <section class="md:col-span-2 my-24 md:mt-0 md:my-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
          <h2 class="text-3xl font-black grid place-items-center">Payouts</h2>
          <p>50% of revenue from primary sales will be placed into the prize pool 
          and paid to the winners. These funds are 🔒locked into the contract and
		  the <b>ONLY</b> way they can be released is by someone purging a token that
		  eliminates a trait or winning the MAP Jackpot.</p>

          <p>Players who have purged multiple winning game pieces receive an
          additive payout for each token purged. All winnings will be distributed 
          in the same transaction as the purge which fulfils the victory condition. Prizes will be sent to the
		  address which purged the token, no exceptions.</p>
		  
		  <p>Because of how the contract is written, the game is unruggable.
		  After I hit the reveal button, the entire dev team could die or the keys to
		  the owner account could get stolen and the game would still work as intended.
		  The prize money is safely locked by the game logic and guaranteed to be paid out
		  in the manner described. The contract will be publicly available for review by 
		  nerds to confirm this fact before launch.
		  </p>
        </section>
        <section class="md:col-span-3 p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
          <h2 class="text-3xl font-black grid place-items-center">Example Payout</h2>
          <div class="grid grid-cols-5 gap-5">
            <table class="col-span-2">
              <tr class="border-b border-zinc-400">
                <td>Mint Cost</td>
                <td class="text-right">Ξ&nbsp;0.100</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td>Tokens Minted</td>
                <td class="text-right">6969</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td>Mint and Purges</td>
                <td class="text-right">4420</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td>Prize Pool</td>
                <td class="text-right">Ξ&nbsp;569.45</td>
              </tr>
              <tr>
                <td># of Winners</td>
                <td class="text-right">133</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td colspan="2" class="pt-8 text-right font-bold">Prize</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td>Blue Spade Purgers</td>
                <td class="text-right">Ξ&nbsp;3.88</td>
              </tr>
              <tr class="border-b border-zinc-400">
                <td>Blue Spade Eliminator</td>
                <td class="text-right">Ξ&nbsp;34.85</td>
              </tr>
              <tr>
                <td>MAP Jackpot</td>
                <td class="text-right">Ξ&nbsp;22.10</td>
              </tr>
            </table>
            <div class="col-span-3">
              <h3 class="mt-4 mb-8 text-xl font-bold grid place-items-center">Winning Trait</h3>
              <img src="/img/example2.png" class="max-full mx-auto p-3" alt="Example Winning Trait" /> 
            </div>
          </div>
          <p class="pt-8">In In this example, there were 6969 actual tokens 
          minted and another 4420 tokens Mint and Purged for a cost of .1 eth 
          each, leading to a prize pool of 569.45 eth. The
          exterminated trait was Blue Spade, which was present on 133 tokens, 
          132 of which receive a payout of 3.88 eth.</p>

          <p>The player who purged the final token and eliminated the Blue Spade 
          trait from the game wins a massive <b>34.85 eth payday!</b> Additionally, a 
          randomly selected speculator who chose to Mint and Purge their token at 
          the start wins a <b>22.1 eth jackpot!</b></p>
        </section>
      </div>
            <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
        <h2 class="text-3xl font-black grid place-items-center">Referral Program</h2>
        <p>There is another way to make a profit off Purge Game that comes with no risk!           <button
          @click="showAboutReferrals = true"
          class="
            rounded
            px-1
            hover:bg-black
            hover:text-amber-300
            hover:ring-1
            hover:ring-amber-300
            hover:cursor-pointer
          "
        >
          <u>Sign up for the referral program</u>
        </button>
          and get your friends to mint. For each token minted using your referral code, you
          will recieve 5% of a free mint in $PURGED. </p>
        <p>The top ten referrers will additionally recieve a huge bonus paid out in eth before reveal. They will split an amount equal to 10% of
          the total prize pool (this does not come out of the actual prize money), with 40% of that amount going to the person with the most referrals. 
          This could be up to 127 eth paid out to the most talented marketer.         
          <button
          @click="showLeaderboard = true"
          class="
            rounded
            px-1
            hover:bg-black
            hover:text-amber-300
            hover:ring-1
            hover:ring-amber-300
            hover:cursor-pointer
          "
        >
          <u>Click here</u>
        </button>
          for full payout information.
        </p>
      </section>
	  	        <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
        <h2 class="text-3xl font-black grid place-items-center">💣The Bomb Token💣</h2>
        <p>Purge Game is intended to be a fast-paced, exciting game that pays off quickly. There are some
		strategies and circumstances which could lead to a stalemate situation. To resolve
		this potential issue, if the game has not concluded by two weeks after reveal, a limited new token will enter the 
		game. Starting at that time, once per day a single Bomb token will be airdropped into the 
		account of a random player who has purged at any point.</p>
		<p>The bomb token can be sold or consumed to erase ANY token remaining in the game. This mechanic guarantees that the game
		will end in a reasonable timeframe. </p>
		
		<p>The bomb could be a huge windfall to the random player who recieves it:
		if there is a trait with only two tokens remaining, either player could purchase the bomb, use it to
		destroy	the other token, then purge theirs to win the grand prize.</p>
      </section>
      <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
        <h2 class="text-3xl font-black grid place-items-center">My Inspiration</h2>
        <p>I had three main sources of inspiration for the idea behind Purge Game.</p>

        <p>I've had this idea in my head for a while now, but the impetus that 
        drove me to actually create it came from playing other NFT games. I 
        enjoy them, and they satisfy my need for gambling and strategy, but 
        basically every one of them suffers from the same absolutely 
        infuriating problem. The devs can never follow through on their 
        promises and they meet their own self-imposed deadlines approximately 
        0% of the time. Most of this occurs after they have collected a huge 
        payday and half the time their game is immediately paused because it 
        doesn't even work at all. Most of the other half, the game is buggy 
        or exploitable by bad actors, as well as having too many on-chain 
        gameplay actions that require paying a large gas tax.</p>

        <p>One day, after a few particularly egregious examples of this 
        occurring back-to-back-to-back, by 🤡 devs who had each made millions 
        of dollars from their NFT sales I had had enough. At that time, I 
        resolved to make a game that was mechanically simple, while 
        strategically complex, and would actually work, from start to 
        finish. Purge Game has only one contract interaction, it costs a 
        moderate amount of gas and it can only be done once per token. </p>
		
		<p>I will not set deadlines until the product is ready to go. I have run
        dozens of mock games on testnet to iron out all the bugs.
        If Purge Game is a success, I’m sure there will be copy/paste “devs” 
        who release their own version of it, so I want my version to remain 
        the gold standard that people will return to again and again.</p>

        <p>My primary income source for the last twenty years has been playing 
        poker professionally. I love gambling, I love strategy games and I 
        really love action-filled games in which it is possible to be profitable in 
        the long term when you apply the proper strategies. NFT trading is 
        all of this and Purge Game is gamified NFT trading, stripped 
        of the funny ape jpegs and played on fast forward. Each trait is 
        essentially its own mini-collection and one of those collections is 
        mechanically guaranteed to moon. Like poker, this game should appeal to 
        the degenerate as well as the brilliant strategist (and especially 
        the degen strategist).</p>

        <p>The final, less serious, source of inspiration came from certain PFP 
        NFT collections which are great, but have one common trait that is so 
        undesirable that it is like an anchor for the floor. If only owners of 
        tokens with that trait could be incentivized to send them all to the 
        burn address, the whole collection would benefit.</p>
      </section>
      <section class="max-w-5xl mx-auto p-3 bg-black bg-opacity-93 rounded-lg border-4 border-green-800 space-y-4">
        <h2 class="text-3xl font-black grid place-items-center">The Future</h2>
        <p>This is Purge Game - Season One. I think that NFT degens and gamers 
        will enjoy the experience and this is only the beginning. I have made 
        this version extremely simple and easy to understand. As people 
        familiarize themselves with the game and discover winning strategies, I 
        have plans for future seasons to gradually make the game more 
        strategically complex (without introducing any additional gas-consuming 
        mechanics). Learning the intricacies of Purge Game now will give you a 
        big edge over newcomers as the game increases in popularity. Don’t worry, 
        risk-lovers, there will always be opportunities for a fair game of chance 
        with a decent return as well.</p>
        <p>Will there be utility for the remaining unpurged tokens in the future?
          Maybe!
        </p>
      </section>
    </main>
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