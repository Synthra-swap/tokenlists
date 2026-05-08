# Synthra Token List

This repository generates the default token list used by Synthra products.

Generated list:

- [`generated/synthra.tokenlist.json`](./generated/synthra.tokenlist.json)

## Make Changes To The Synthra Token List

To change the Synthra token list, edit files in [`src/tokenlists/synthra`](./src/tokenlists/synthra).

1. `metadata.ts` changes high-level token list metadata.
2. `tokens/<network>.ts` adds or removes tokens for a network.
3. `overwrites.ts` overrides token metadata that is missing or incorrect on-chain.

Regenerate the list with:

```shell
npm run generate
```

This updates `/generated/synthra.tokenlist.json`.
The generated token list version is derived from `package.json`.

## NPM Package

The generated list is prepared to be published as:

```ts
import SYNTHRA_TOKEN_LIST from '@synthra-swap/default-token-list'
```

Publishing requires `NPM_TOKEN` in GitHub Actions.

## Development

Some networks use configured public RPC endpoints. If a network does not have a public RPC configured, generation can require these environment variables:

```shell
INFURA_KEY=xxx
POKT_KEY=xxx
ALCHEMY_KEY=xxx
```
