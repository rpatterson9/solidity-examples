require("dotenv").config()

// uncomment to include contract sizing in test output
// require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require(`@nomiclabs/hardhat-etherscan`)
require("solidity-coverage")
// uncomment to include gas reporting in test output
//require('hardhat-gas-reporter')
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("@openzeppelin/hardhat-upgrades")
require("./tasks")
const PRIVATE_KEY = 'edd43767ade6730cce6c8cbb123ef2cad1f9b4fd37524508b3b569cb16ec57ea'
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

function getMnemonic(networkName) {
    if (networkName) {
        const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()]
        if (mnemonic && mnemonic !== "") {
            return mnemonic
        }
    }

    const mnemonic = process.env.MNEMONIC
    if (!mnemonic || mnemonic === "") {
        return "test test test test test test test test test test test junk"
    }

    return mnemonic
}

function accounts(chainKey) {
    return { mnemonic: getMnemonic(chainKey) }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },

    // solidity: "0.8.4",
    contractSizer: {
        alphaSort: false,
        runOnCompile: true,
        disambiguatePaths: false,
    },

    namedAccounts: {
        deployer: {
            default: 0, // wallet address 0, of the mnemonic in .env
        },
        proxyOwner: {
            default: 1,
        },
    },

    mocha: {
        timeout: 100000000,
    },

    networks: {
        ethereum: {
            url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
            chainId: 1,
            accounts:  [PRIVATE_KEY]
        },
        bsc: {
            url: "https://bsc-dataseed1.binance.org",
            chainId: 56,
            accounts: [PRIVATE_KEY],
        },
        avalanche: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: [PRIVATE_KEY],
        },
        polygon: {
            url: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
            accounts: [PRIVATE_KEY],
        },
        arbitrum: {
            url: `https://arb1.arbitrum.io/rpc`,
            chainId: 42161,
            accounts: [PRIVATE_KEY],
        },
        optimism: {
            url: `https://mainnet.optimism.io`,
            chainId: 10,
            accounts: [PRIVATE_KEY],
        },
        fantom: {
            url: `https://rpcapi.fantom.network`,
            chainId: 250,
            accounts: [PRIVATE_KEY],
        },
        metis: {
            url: `https://andromeda.metis.io/?owner=1088`,
            chainId: 1088,
            accounts: [PRIVATE_KEY],
        },

        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/AD-N1iR0VJttlCiKWXqA7B4zETNwnDzc",
            accounts: [PRIVATE_KEY],
            chainId: 5,
    
        },
        "bsc-testnet": {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: [PRIVATE_KEY],
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            chainId: 43113,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            accounts: [PRIVATE_KEY],
        },
        "arbitrum-goerli": {
            url: `https://goerli-rollup.arbitrum.io/rpc/`,
            chainId: 421613,
            accounts: [PRIVATE_KEY],
        },
        "optimism-goerli": {
            url: `https://goerli.optimism.io/`,
            chainId: 420,
            accounts: [PRIVATE_KEY],
        },
        "fantom-testnet": {
            url: `https://rpc.ankr.com/fantom_testnet`,
            chainId: 4002,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
          optimisticGoerli: 'H3JJFGFZCDWRHB3CHNW6VNPV5N1JGXNF7C',
        }
      }
    }