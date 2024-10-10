import { Percent, TradeType } from "@uniswap/sdk-core";
import {
  AlphaRouter,
  CachingV3PoolProvider,
  CurrencyAmount,
  NodeJSCache,
  SwapOptionsSwapRouter02,
  SwapType,
  UniswapMulticallProvider,
  V3PoolProvider,
  V3SubgraphProvider,
} from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import NodeCache from "node-cache";
import { ProviderURL, UniswapSubgraphURL } from "./config";
import { getDate, getUniswapChain } from "./helper";
import { saveToFile } from "./persistence";
import { IRouteParams } from "./types";

async function findUniswapRoute({
  chainName,
  token0,
  token1,
  amount,
}: IRouteParams) {
  const chain = getUniswapChain(chainName);
  const providerUrl = ProviderURL[chainName];
  const parsedAmount = CurrencyAmount.fromRawAmount(
    token0,
    (amount * 10 ** token0.decimals).toString()
  );

  const provider = new ethers.providers.JsonRpcProvider(providerUrl, chain);

  const multicall2Provider = new UniswapMulticallProvider(chain, provider);

  const v3PoolProvider = new CachingV3PoolProvider(
    chain,
    new V3PoolProvider(chain, multicall2Provider),
    new NodeJSCache(new NodeCache({ stdTTL: 360, useClones: false }))
  );

  const v3SubgraphProvider = new V3SubgraphProvider(
    chain,
    2,
    30000,
    true,
    0.01,
    Number.MAX_VALUE,
    UniswapSubgraphURL
  );

  const router = new AlphaRouter({
    chainId: chain,
    provider,
    v3PoolProvider,
    v3SubgraphProvider,
  });

  const options: SwapOptionsSwapRouter02 = {
    recipient: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    slippageTolerance: new Percent(50, 10000),
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
  };

  const route = await router.route(
    parsedAmount,
    token1,
    TradeType.EXACT_INPUT
    // options
  );

  const data = JSON.stringify(route);
  const date = getDate();

  await saveToFile(`UNISWAP-${chainName}-${date}.json`, data);
}

export default findUniswapRoute;
