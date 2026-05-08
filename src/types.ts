export enum Network {
  Ethereum = '1',
  Goerli = '5',
  Optimism = '10',
  Gnosis = '100',
  Polygon = '137',
  Zkevm = '1101',
  Base = '8453',
  Arbitrum = '42161',
  Avalanche = '43114',
  Sepolia = '11155111',
  Telos = '40',
  Meter = '82',
  TelosTestnet = '41',
  Artela = '11820',
  ArtelaBetanet = '11822',
  Taiko = '167000',
  Etherlink = '42793',
  Uomi = '4386',
  Irys = '1270',
  Helios = '42000',
  arc = '5042002',
  robinhood = '46630',
}

export interface Version {
  major: number
  minor: number
  patch: number
}

export interface TokenInfo {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI?: string
  tags?: string[]
  extensions?: Record<string, unknown>
}

export interface TokenList {
  name: string
  timestamp: string
  version: Version
  tokens: TokenInfo[]
  keywords?: string[]
  logoURI?: string
  tags?: Record<string, { name: string; description: string }>
}

export interface Config {
  name: string
  rpc?: string
  coingecko: {
    platformId: string
  }
  trustWalletNetwork: string
  addresses: {
    multicaller: string
  }
}

export type Configs = Record<Network, Config>

export type PartialTokenInfoMap = {
  [address: string]: Partial<TokenInfo>
}

export type TokenListMetadata = Pick<
  TokenList,
  'name' | 'logoURI' | 'keywords' | 'version'
>

export type TokensForList = Record<Network, string[]>
export type OverwritesForList = Partial<
  Record<Network, Record<string, Partial<TokenInfo>>>
>
