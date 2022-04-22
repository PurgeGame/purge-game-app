import { ref } from 'vue'
import {
  traitData,
  prizepool,
  purgedTokenData,
  ownedTokenData,
  state,
  contract,
} from './store.js'


// API call to update all token, trait & prize data in store.js
export async function useApiGrab(walletAddress) {
  const apiEndpoint = 'http://127.0.0.1:8000/everything/' + walletAddress
  const fetchError = ref('')

  const allData = await fetch(apiEndpoint)
    .then((res) => res.json())
    .catch((err) => (fetchError.value = err))

  // Add thumbnail URL's
  Object.entries(allData[0]).forEach((trait) => {
    trait[1].thumbnail = `/thumbnails/${trait[1].color.toLowerCase()}-${trait[1].shape.toLowerCase()}.png`
  })

  traitData.value = allData[0]
  ownedTokenData.value = allData[1]
  purgedTokenData.value = allData[2]
  prizepool.value = allData[3]

  return { fetchError }

}

export async function gameState() {
  const gameOver = contract.gameOver()
  state.gameOver = await gameOver
  const reveal = contract.REVEAL()
  state.reveal = await reveal
  const coinMintStatus = contract.coinMintStatus()
  state.coinMintStatus = await coinMintStatus
  const publicSaleStatus = contract.publicSaleStatus() 
  state.publicSaleStatus = await publicSaleStatus
  const whitelistSaleStatus = contract.whitelistSaleStatus()
  state.whitelistSaleStatus = await whitelistSaleStatus
  const premint = contract.totalMinted()
  state.premint = (await premint == 0)
}