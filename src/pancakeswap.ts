import { CurrencyAmount, TradeType } from "@pancakeswap/sdk";
import { SmartRouter } from "@pancakeswap/smart-router";
import { GraphQLClient } from "graphql-request";
import type { PublicClient } from "viem";
import { createPublicClient, http } from "viem";
import { PancakeSwapSubgraphURL, ProviderURL } from "./config";
import { getPancakeswapChain } from "./helper";
import { IRouteParams } from "./types";

async function findPancakeswapRoute({
  chainName,
  token0,
  token1,
  amount,
}: IRouteParams) {
  const parsedAmount = CurrencyAmount.fromRawAmount(
    token0,
    (amount * 10 ** token0.decimals).toString()
  );

  const publicClient: PublicClient = createPublicClient({
    chain: getPancakeswapChain(chainName),
    transport: http(ProviderURL[chainName]),
    batch: {
      multicall: {
        batchSize: 1024 * 200,
      },
    },
  });

  const v3SubgraphClient = new GraphQLClient(PancakeSwapSubgraphURL);

  const quoteProvider = SmartRouter.createQuoteProvider({
    onChainProvider: () => publicClient,
  });

  const v3Pools = await SmartRouter.getV3CandidatePools({
    onChainProvider: () => publicClient,
    subgraphProvider: () => v3SubgraphClient,
    currencyA: token0,
    currencyB: token1,
  });

  const trade = await SmartRouter.getBestTrade(
    parsedAmount,
    token1,
    TradeType.EXACT_INPUT,
    {
      gasPriceWei: () => publicClient.getGasPrice(),
      maxHops: 2,
      maxSplits: 2,
      poolProvider: SmartRouter.createStaticPoolProvider(v3Pools),
      quoteProvider,
      quoterOptimization: true,
    }
  );

  console.log({ pancakeswap: trade?.routes[0].path });
}

export default findPancakeswapRoute;
