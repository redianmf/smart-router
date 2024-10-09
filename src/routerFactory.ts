import findPancakeswapRoute from "./pancakeswap";
import { ExchangeEnum, IRouteParams } from "./types";
import findUniswapRoute from "./uniswap";

abstract class RouterInstance {
  constructor() {}

  abstract route({ chainName, token0, token1, amount }: IRouteParams): void;
}

class UniswapRouterInstance extends RouterInstance {
  public route({ ...args }: IRouteParams): void {
    findUniswapRoute({
      chainName: args.chainName,
      token0: args.token0,
      token1: args.token1,
      amount: args.amount,
    });
  }
}

class PancakeswapRouterInstance extends RouterInstance {
  public route({ ...args }: IRouteParams): void {
    findPancakeswapRoute({
      chainName: args.chainName,
      token0: args.token0,
      token1: args.token1,
      amount: args.amount,
    });
  }
}

export class RouterInstanceFactory {
  public create(exchange: ExchangeEnum) {
    switch (exchange) {
      case ExchangeEnum.UNISWAP:
        return new UniswapRouterInstance();
      case ExchangeEnum.PANCAKESWAP:
        return new PancakeswapRouterInstance();
    }
  }
}
