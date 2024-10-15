import { Network } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();

export const ProviderURL = {
  ETHEREUM: process.env.MAINNET_PROVIDER_URL as string,
  ARBITRUM: process.env.ARBITRUM_PROVIDER_URL as string,
};

const subGraphBaseUrl = `https://gateway.thegraph.com/api/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/`;

export const UniswapSubgraphURL =
  subGraphBaseUrl + "FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM";
export const PancakeSwapSubgraphURL =
  subGraphBaseUrl + "CJYGNhb7RvnhfBDjqpRnD3oxgyhibzc7fkAMa38YV3oS";

export const AlchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const WalletAddress = process.env.WALLET_ADDRESS as string;

export const MainnetProviders = {
  alchemy: process.env.MAINNET_PROVIDER_URL,
  chainnodes: process.env.CHAINNODES_PROVIDER_URL,
  chainstack: process.env.CHAINSTACK_PROVIDER_URL,
  infura: process.env.INFURA_PROVIDER_URL,
  quickNode: process.env.QUICKNODE_PROVIDER_URL,
};
