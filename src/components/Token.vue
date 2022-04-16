<template>
  <div v-if="isReady">
    <img style="height: 100px;" :src="image">

    <div v-if="!isMinted">
      <button @click="mintToken">Mint!</button>

    </div>
    <p v-else> minted </p>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import Lightsaber from "../artifacts/contracts/Lightsaber.sol/Lightsaber.json"

export default {
  props: {
    id: {
      type: Number,
    }
  },
  data() {
    return {
      contentId: "QmQ3egh9bnENqft4Ww4dzdxD3K63aKWaVW9bzMPdwtDMQ3",
      isReady: false,
      isMinted: false
    };
  },
  methods: {
    getMintedStatus() {
      this.isMinted = window.contract.isTokenOwned(this.metadataURI);
    },
    async mintToken() {
      const connection = window.contract.connect(this.signer);

      const result = await window.contract.payToMint(connection.address, this.metadataURI, {
        value: ethers.utils.parseEther("0.05")
      })

      await result.wait();
      this.getMintedStatus();
    }
  },
  async created() {

    this.metadataURI = `https://gateway.pinata.cloud/ipfs/QmQ3egh9bnENqft4Ww4dzdxD3K63aKWaVW9bzMPdwtDMQ3/${this.id}.json`
    this.image = (await import(`../assets/lightsabers/${this.id}.png`)).default;

    this.isReady = true
  },
}
</script>