/* eslint-disable max-len */
import { Network, OverwritesForList } from '../../types'

export const overwrites: OverwritesForList = {
  [Network.Uomi]: {
    '0xAA9C4829415BCe70c434b7349b628017C59EC2b1': {
      logoURI:
        'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    }, //USDC
    '0x5FCa78E132dF589c1c799F906dC867124a2567b2': {
      logoURI:
        'https://pbs.twimg.com/profile_images/1803434790680506368/tEAb8qfo_400x400.jpg',
    }, //WUOMI
    '0x2922B2Ca5EB6b02fc5E1EBE57Fc1972eBB99F7e0': {
      logoURI:
        'https://raw.githubusercontent.com/Synthra-swap/tokenlists/refs/heads/main/src/assets/images/tokens/0x2922B2Ca5EB6b02fc5E1EBE57Fc1972eBB99F7e0.png',
    }, //Synthra
    '0x04B03e3859A25040E373cC9E8806d79596D70686': {
      logoURI:
        'https://raw.githubusercontent.com/Synthra-swap/tokenlists/refs/heads/main/src/assets/images/tokens/0x04B03e3859A25040E373cC9E8806d79596D70686.png',
    }, //Simulacra
  },
}

