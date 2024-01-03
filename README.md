# RandomSeed

## Overview

RandomSeed is a contract to request a 256 Bit random number from a Chainlink VRF oracle for a provided project name.

Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising security or usability.

https://docs.chain.link/docs/chainlink-vrf

## Setup

In order to be able to request a random number from the Chainling VRF, a subscription for that service has to be funded upfront.

1. During deployment, the contract get a subscriptionId assigned, which can be requested by calling the function `s_subscriptionId()`.

This function can be called using the (auto generated) Web UI of etherscan.

For the contract deployed on the Rinkeby testnet, it look like this :

https://rinkeby.etherscan.io/address/0xcfaac08133da18ba08c67099e97078a7481b4b25#readContract

2. Chainlink provides an management Web UI for the subscriptions :

https://vrf.chain.link

To access the admin interface for a certain subscription, access the link with `subscriptionId` at the end, i.e.:

https://vrf.chain.link/rinkeby/1718

3. To fund the subscription, the [Add Funds] button within the admin interface can be used.

Alternatively, this can be done (programmatically) by :

- sending LINK to contract
- calling `topUpSubscription(amount)`

One random number request will cost ~ 0.3 ... 0.4 $LINK.

## Related Chainlink documentation

https://www.youtube.com/watch?v=rdJ5d8j1RCg

https://docs.chain.link/docs/get-a-random-number

## Functions

The following functions are available to request and later read a random number :

### requestRandomWords(string projectNameString)

Request a random number from a Chainlink VRF oracle.

Only accounts with `RANDOM_REQUESTER_ROLE` can request a random number.

### getRandomNumber(string projectNameString) public view returns (uint256)

Using the same parameter as for `requestRandomWords`, about 1-2 minutes later, the 256 Bit random number can be read.

### getScheduleRequest(string projectNameString) public view returns (RandomRequest)

Same as `getRandomNumber`, but returns a struct with all request details.

```solidity
struct RandomRequest {
  uint48 requestTime; //  6 Bytes
  uint48 scheduledTime; //  6 Bytes
  uint48 fullFilledTime; //  6 Bytes
  uint256 requestId; // 32 Bytes
  uint256 randomNumber; // 32 Bytes
}

```

## Example usage

### Sepolia Testnet

v1.1.0

address : `0x79000355e5ccEF44dd8902bb181c4727f7BA9522`

https://sepolia.etherscan.io/address/0x79000355e5ccEF44dd8902bb181c4727f7BA9522#writeContract

The result of a random number request, which can be retrieved (after ~ 1-2 minutes) with `getScheduleRequest` looks like this (Example `sepolia-test-1`) :

```
tuple :
1704282240,
0,
1704282288,
100515050063606553729037864554752426137032236690245901376149353970738374593344,
61070570061348262458333614887762206422997625810093439968080639269999029879031

```

The last number in the struct is the random number which can by itself requested with `getRandomNumber` (Example `sepolia-test-1`) :

`61070570061348262458333614887762206422997625810093439968080639269999029879031`

## Project Setup

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solhint](https://github.com/protofire/solhint): linter
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set a BIP-39 compatible mnemonic as an environment
variable. Follow the example in `.env.example`. If you don't already have a mnemonic, use this [website](https://iancoleman.io/bip39/) to generate one.

Then, proceed with installing dependencies:

```sh
yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

## Deployment

### Deployment with Verification

In `package.json` file, we have the deploy script defined.
We can pass `network` argument as defined inside hardhat config. Before running the script, we need to set proper env vars as stated in the .env.sample file.

For `rinkeby`: `yarn run deploy --network rinkeby`

For `mainnet`: `yarn run deploy --network mainnet`

It will automatically verify on etherscan as well.

### Deploy contract via CLI providing a private key

```
PRIVATE_KEY=0xe15... yarn run deploy --network mainnet
```

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via the
[vscode-solidity](https://github.com/juanfranblanco/vscode-solidity) extension. The recommended approach to set the
compiler version is to add the following fields to your VSCode user settings:

```json
{
  "solidity.compileUsingRemoteVersion": "v0.8.4+commit.c7e474f2",
  "solidity.defaultCompiler": "remote"
}
```

Where of course `v0.8.4+commit.c7e474f2` can be replaced with any other version.
