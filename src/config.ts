import { Network } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();

export const ProviderURL = {
  ETHEREUM: process.env.MAINNET_PROVIDER_URL as string,
  ARBITRUM: process.env.ARBITRUM_PROVIDER_URL as string,
  BINANCE: process.env.BSC_PROVIDER_URL as string,
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
  alchemyWs: process.env.MAINNET_PROVIDER_URL_WS as string,
  chainnodes: process.env.CHAINNODES_PROVIDER_URL,
  chainnodesWs: process.env.CHAINNODES_PROVIDER_URL_WS as string,
  chainstack: process.env.CHAINSTACK_PROVIDER_URL,
  chainstackWs: process.env.CHAINSTACK_PROVIDER_URL_WS as string,
  infura: process.env.INFURA_PROVIDER_URL,
  infuraWs: process.env.INFURA_PROVIDER_URL_WS as string,
  quickNode: process.env.QUICKNODE_PROVIDER_URL,
  quickNodeWs: process.env.QUICKNODE_PROVIDER_URL_WS as string,
  drpc: process.env.DRPC_PROVIDER_URL as string,
  drpcWs: process.env.DRPC_PROVIDER_URL_WS as string,
  blockPi: process.env.BLOCKPI_PROVIDER_URL as string,
  blockPiWs: process.env.BLOCKPI_PROVIDER_URL_WS as string,
  publicNode: process.env.PUBLICNODE_PROVIDER_URL as string,
  publicNodeWs: process.env.PUBLICNODE_PROVIDER_URL_WS as string,
  llama: process.env.LLAMA_PROVIDER_URL as string,
  llamaWs: process.env.LLAMA_PROVIDER_URL_WS as string,
  getBlockWs: process.env.GETBLOCK_PROVIDER_URL_WS as string,
  omniaWs: process.env.OMNIA_PROVIDER_URL_WS as string,
  nowNodesWs: process.env.NOWNODES_PROVIDER_URL_WS as string,
  dwellirWs: process.env.DWELLIR_PROVIDER_URL_WS as string,
  tenderlyWs: process.env.TENDERLY_PROVIDER_URL_WS as string,
  blastWs: process.env.BLAST_PROVIDER_URL_WS as string,
  callstaticWs: process.env.CALLSTATIC_PROVIDER_URL_WS as string,
  cabinetWs: process.env.CABINET_PROVIDER_URL_WS as string,
  kaleidoWs: process.env.KALEIDO_PROVIDER_URL_WS as string,
  speedyNodesWs: process.env.SPEEDYNODES_PROVIDER_URL_WS as string,
  merkleWs: process.env.MERKLE_PROVIDER_URL_WS as string,
  zanWs: process.env.ZAN_PROVIDER_URL_WS as string,
};
