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
  },
}

