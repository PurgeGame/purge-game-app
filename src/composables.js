import { ref } from 'vue'
import {
  traitData,
  prizepool,
  purgedTokenData,
  ownedTokenData,
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
