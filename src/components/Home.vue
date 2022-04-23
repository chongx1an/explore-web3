<template>
  <h1>Balance: {{ balance }}</h1>

  <div v-if="isReady">
    <div v-for="i in 4" :key="i">
      <Token :id="i"></Token>
    </div>
  </div>

</template>

<script>
import { ethers } from "ethers";
import Lightsaber from "../artifacts/contracts/Lightsaber.sol/Lightsaber.json"
import Token from "./Token.vue";

export default {
  data() {
    return {
      balance: 0,
      isReady: false,
    };
  },
  methods: {
    async getBalance() {
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      this.balance = ethers.utils.formatEther(balance);
    },
  },
  async created() {
    this.getBalance();
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Lightsaber.abi, signer);

    window.signer = signer;
    window.contract = contract;

    this.isReady = true;
  },
  components: { Token }
}
</script>