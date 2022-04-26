# Hello, Solana
A simple hello world program on Solana.

## Technology Stack & Tools

- [Rust](https://rustup.rs/) (Writing Smart Contract/Program)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) (Deploy Program)
- [NodeJS](https://nodejs.org/en/) - v14 or greater (Testing)

## Requirements
- Install [NodeJS](https://nodejs.org/en/), The recommended version is 14.16.0 or higher.
- Install [Rust](https://rustup.rs/).
- Install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools).

## Setting Up
### 1. Download/Clone the Repository

### 2. Set Environment to Dev Network:
`$ solana config set --url https://api.devnet.solana.com`

### 3. Create a keypair for our Account
`$ solana-keygen new --force`

### 4. Airdrop SOL Tokens to our Account
`$ solana airdrop 5`

### 5. Build Hello World Program
`$ npm run build:program-rust`

### 6. Deploy Program to the devnet Environment
`$ solana program deploy dist/program/helloworld.so`

You can then visit [https://explorer.solana.com/?cluster=devnet](https://explorer.solana.com/?cluster=devnet) and search for the program ID to find your deployed program.

For the frontend of the application, you will need the generated program ID.

## Saying Hello to the program via Terminal
### 1. Install Dependencies
`$ npm install`

### 2. Say Hello with
`$ npm run start`
