import { arbitrumTokens, ethereumTokens } from "@pancakeswap/tokens";
import { RouterInstanceFactory } from "./routerFactory";
import { ChainNameEnum, ExchangeEnum } from "./types";

async function main() {
  const routerInstanceFactory = new RouterInstanceFactory();

  const swapUni = routerInstanceFactory.create(ExchangeEnum.UNISWAP);
  swapUni.route({
    chainName: ChainNameEnum.ETHEREUM,
    token0: ethereumTokens.usdc,
    token1: ethereumTokens.dai,
    amount: 100,
  });
  swapUni.route({
    chainName: ChainNameEnum.ARBITRUM,
    token0: arbitrumTokens.usdc,
    token1: arbitrumTokens.stg,
    amount: 10,
  });

  const swapPancake = routerInstanceFactory.create(ExchangeEnum.PANCAKESWAP);
  swapPancake.route({
    chainName: ChainNameEnum.ETHEREUM,
    token0: ethereumTokens.usdc,
    token1: ethereumTokens.dai,
    amount: 100,
  });
  swapPancake.route({
    chainName: ChainNameEnum.ARBITRUM,
    token0: arbitrumTokens.usdc,
    token1: arbitrumTokens.gmx,
    amount: 10,
  });
}

main().catch((e) => console.log(e));
