import { ChainId } from "@uniswap/sdk-core";
import { arbitrum, mainnet } from "viem/chains";
import { ChainNameEnum } from "./types";

export const getUniswapChain = (chainName: ChainNameEnum) => {
  switch (chainName) {
    case ChainNameEnum.ARBITRUM:
      return ChainId.ARBITRUM_ONE;
    case ChainNameEnum.ETHEREUM:
      return ChainId.MAINNET;
  }
};

export const getPancakeswapChain = (chainName: ChainNameEnum) => {
  switch (chainName) {
    case ChainNameEnum.ARBITRUM:
      return arbitrum;
    case ChainNameEnum.ETHEREUM:
      return mainnet;
  }
};

export const getDate = (): string => {
  return new Date().toJSON().slice(0, 19).replace(/:/g, "");
};
