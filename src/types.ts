import { Currency } from "@pancakeswap/sdk";

export enum ExchangeEnum {
  UNISWAP = "UNISWAP",
  PANCAKESWAP = "PANCAKESWAP",
}

export enum ChainNameEnum {
  ETHEREUM = "ETHEREUM",
  ARBITRUM = "ARBITRUM",
}

export interface IRouteParams {
  chainName: ChainNameEnum;
  token0: Currency;
  token1: Currency;
  amount: number;
}
