import { BigNumber, providers } from "ethers";
import { MainnetProviders, WalletAddress } from "./config";

async function main() {
  const alchemyProvider = new providers.JsonRpcProvider(
    MainnetProviders.alchemy
  );
  const chainnodesProvider = new providers.JsonRpcProvider(
    MainnetProviders.chainnodes
  );
  const chainstackProvider = new providers.JsonRpcProvider(
    MainnetProviders.chainstack
  );
  const infuraProvider = new providers.JsonRpcProvider(MainnetProviders.infura);
  const quickNodeProvider = new providers.JsonRpcProvider(
    MainnetProviders.quickNode
  );

  const promises = await Promise.all([
    await measureTime(() => getBalance(alchemyProvider), "alchemy"),
    await measureTime(() => getBalance(chainnodesProvider), "chainnodes"),
    await measureTime(() => getBalance(chainstackProvider), "chainstack"),
    await measureTime(() => getBalance(infuraProvider), "infura"),
    await measureTime(() => getBalance(quickNodeProvider), "quicknode"),
  ]);

  console.log(promises);
}

main().catch((err) => console.log(err));

async function measureTime(
  fn: () => Promise<BigNumber>,
  provider: string
): Promise<string> {
  const start = performance.now();
  let elapsed = 0;
  await fn().then(() => {
    elapsed = performance.now() - start;
  });
  return `Time with ${provider} = ${elapsed}`;
}

async function getBalance(
  provider: providers.JsonRpcProvider
): Promise<BigNumber> {
  const balance = await provider.getBalance(WalletAddress);
  return balance;
}
