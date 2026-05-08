import 'dotenv/config'
import {
  Network,
  PartialTokenInfoMap,
  TokenInfo,
  TokenList,
  TokenListMetadata,
} from './types'
import { fetchOnchainMetadata } from './lib/fetchers/onchain'
import { fetchExistingMetadata } from './lib/fetchers/existing'
import { merge } from 'lodash'
import fs from 'fs'
import { getAddress } from 'ethers'
import chalk from 'chalk'
import { getTokenlistSrc, isEqualTokenlists, safeStringify } from './lib/utils'
import packageJson from '../package.json'

/**
 * Primary generation function.
 *
 * Run via `npm run generate`
 */
async function run() {
  const tokenlistsToBuild = ['synthra']

  for (const tokenlist of tokenlistsToBuild) {
    console.log(chalk.bgGreen(`Building tokenlist: ${tokenlist}`))
    await build(tokenlist)
    console.log(
      chalk.bgCyan(`Built tokenlist: /generated/${tokenlist}.tokenlist.json`)
    )
  }
}

;(async () => {
  try {
    await run()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

// ----------------------------------------------------------------]

/**
 * Data hierarchy:
 * 1. Existing data, includes overwrites and local images
 * 3. Onchain data
 * 4. Coingecko data (last resort on address my address basis)
 */

async function build(tokenlistName: string) {
  let network: Network
  let allTokens: TokenInfo[] = []
  const { metadata, tokens, overwrites, existingTokenList } =
    await getTokenlistSrc(tokenlistName)

  for (network in tokens) {
    console.log(chalk.cyan(`Starting build for ${network}`))
    const tokenAddresses = tokens[network]

    console.time(chalk.cyan(`Fetched onchain metadata for chain ${network}`))
    const onchainMetadata = await fetchOnchainMetadata(network, tokenAddresses)
    console.timeEnd(chalk.cyan(`Fetched onchain metadata for chain ${network}`))

    console.time(chalk.cyan(`Fetched existing metadata for chain ${network}`))
    const existingMetadata = await fetchExistingMetadata(
      network,
      overwrites,
      existingTokenList
    )
    console.timeEnd(
      chalk.cyan(`Fetched existing metadata for chain ${network}`)
    )

    console.time(chalk.cyan(`Generated tokens for chain ${network}`))
    const tokenInfo = await generateTokens(
      network,
      tokenAddresses,
      onchainMetadata,
      existingMetadata
    )
    allTokens = allTokens.concat(tokenInfo)
    console.timeEnd(chalk.cyan(`Generated tokens for chain ${network}`))
  }

  const tokenList = buildTokenList(
    withPackageVersion(metadata),
    allTokens,
    existingTokenList
  )

  fs.writeFileSync(
    `./generated/${tokenlistName}.tokenlist.json`,
    safeStringify(tokenList)
  )
}

function withPackageVersion(metadata: TokenListMetadata): TokenListMetadata {
  const [major, minor, patch] = packageJson.version.split('.').map(Number)

  if ([major, minor, patch].some((part) => !Number.isInteger(part))) {
    throw new Error(`Invalid package version: ${packageJson.version}`)
  }

  return {
    ...metadata,
    version: { major, minor, patch },
  }
}

function buildTokenList(
  metadata: TokenListMetadata,
  tokens: TokenInfo[],
  existingTokenList: TokenList | undefined
): TokenList {
  const newTokenList = {
    ...metadata,
    timestamp: new Date().toISOString(),
    tokens,
  }

  if (existingTokenList && isEqualTokenlists(newTokenList, existingTokenList)) {
    newTokenList.timestamp = existingTokenList.timestamp
  }

  return newTokenList
}

async function generateTokens(
  network: Network,
  tokenAddresses: string[],
  onchainMetadata: PartialTokenInfoMap,
  existingMetadata: PartialTokenInfoMap
): Promise<TokenInfo[]> {
  const tokens: TokenInfo[] = []

  for (const tokenAddress of tokenAddresses) {
    const existingToken = existingMetadata[tokenAddress]
    const onchainToken = onchainMetadata[tokenAddress]
    const tokenInfo = await setTokenInfo(
      tokenAddress,
      network,
      existingToken,
      onchainToken
    )
    if (tokenInfo) tokens.push(tokenInfo)
  }

  return tokens
}

function satisfiesTokenInfoSchema({
  token,
  includeOptionals,
}: {
  token: Partial<TokenInfo>
  includeOptionals: boolean
}): boolean {
  const requiredKeys = ['chainId', 'address', 'name', 'symbol', 'decimals']
  if (includeOptionals) requiredKeys.push('logoURI')

  return requiredKeys.every((key) => token?.[key as keyof TokenInfo] != null)
}

async function setTokenInfo(
  address: string,
  network: Network,
  existingMetadata: Partial<TokenInfo>,
  onchainMetadata: Partial<TokenInfo>
): Promise<TokenInfo | undefined> {
  // combine existingMetadata and overwriteMetadata (precedence last to first)
  // We want the onchain data to be used only if it's missing from existing data.
  let metadata = merge(
    { chainId: Number(network), address: getAddress(address) },
    onchainMetadata,
    existingMetadata
  )

  if (metadata.decimals) {
    metadata = merge(metadata, { decimals: Number(metadata.decimals) })
  }

  if (satisfiesTokenInfoSchema({ token: metadata, includeOptionals: true })) {
    return formatMetadata(metadata)
  }

  // const coingeckoMetadata = await fetchCoingeckoMetadata(network, address)
  // // Again, we want the coingecko data to be used only if it's missing from existing data.
  // metadata = merge(coingeckoMetadata, metadata)

  // if (satisfiesTokenInfoSchema({ token: metadata, includeOptionals: false })) {
  //   return formatMetadata(metadata)
  // }
  else {
    console.warn('Failed to generate token info for:', metadata)
    return undefined
  }
}

function formatMetadata(metadata: Partial<TokenInfo>): TokenInfo {
  // Order provided metadata by specified key order.
  const orderedByKey = Object.assign(
    {
      chainId: undefined,
      address: undefined,
      name: undefined,
      symbol: undefined,
      decimals: undefined,
      logoURI: undefined,
    },
    metadata
  )
  // Remove undefined values.
  Object.keys(orderedByKey).forEach((key) =>
    orderedByKey[key as keyof TokenInfo] === undefined
      ? delete orderedByKey[key as keyof TokenInfo]
      : {}
  )
  return orderedByKey as unknown as TokenInfo
}
