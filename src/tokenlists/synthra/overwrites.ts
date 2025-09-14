/* eslint-disable max-len */
import { Network, OverwritesForList } from '../../types'

export const overwrites: OverwritesForList = {
  [Network.Uomi]: {
    '0x911b4000D3422F482F4062a913885f7b035382Df': {
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    }, //USDC
    '0x1b8FA17f94DB8481E17152AaB8D242d438180BCf': {
      logoURI:
        'https://pbs.twimg.com/profile_images/1803434790680506368/tEAb8qfo_400x400.jpg',
    }, //WUOMI
    '0x5B727Bf35dDba2A8DA966E29f7c769823e4Faf41': {
      logoURI:
        'https://raw.githubusercontent.com/Synthra-swap/tokenlists/refs/heads/main/src/assets/images/tokens/0x5B727Bf35dDba2A8DA966E29f7c769823e4Faf41.png',
    }, //Synthra
    '0x04B03e3859A25040E373cC9E8806d79596D70686': {
      logoURI:
        'https://raw.githubusercontent.com/Synthra-swap/tokenlists/refs/heads/main/src/assets/images/tokens/0x04B03e3859A25040E373cC9E8806d79596D70686.png',
    }, //Simulacra
  },
}

