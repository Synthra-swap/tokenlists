export default {
  name: 'avalanche',
  rpc: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  coingecko: {
    platformId: 'avalanche',
  },
  trustWalletNetwork: 'avalanchec',
  addresses: {
    multicaller: '0xca11bde05977b3631167028862be2a173976ca11',
  },
}
