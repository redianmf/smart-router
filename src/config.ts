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
