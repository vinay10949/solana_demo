# Hello, Solana (Frontend)
A simple frontend react application to interact with the hello world program on Solana.

## Technology Stack & Tools

- [NodeJS](https://nodejs.org/en/) - v14 or greater (Testing)
- [Yarn](https://yarnpkg.com/getting-started) (Package Manager)

## Requirements
- Install [NodeJS](https://nodejs.org/en/), The recommended version is 14.16.0 or higher.
- Install [Yarn](https://yarnpkg.com/getting-started).
  1. You can check to see if Yarn is installed by using `yarn --version` in your command line.
  2. If not installed, you can install using: `npm install -g yarn`

## Setting Up
### 1. Download/Clone the Repository

### 2. Install Dependencies
`$ yarn install`

### 3. Configure Program ID
In your text editor, you'll need to edit *App.js* around line 14 
```
const [programId, setProgramId] = useState('')
```

Inside the `''` paste in the provided program ID after program deployment.

### 4. Start Frontend
`$ yarn start`
