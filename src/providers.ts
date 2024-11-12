import { BigNumber, providers } from "ethers";
import { MainnetProviders, WalletAddress } from "./config";

interface BenchmarkResponse {
  providerName: string;
  time: number;
}
interface BenchmarkResult {
  providerName: string;
  time: number[];
  average: number;
  averageWithoutFirstCall: number;
}

async function main() {
  // const alchemyProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.alchemy
  // );
  // const chainnodesProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.chainnodes
  // );
  // const chainstackProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.chainstack
  // );
  // const infuraProvider = new providers.JsonRpcProvider(MainnetProviders.infura);
  // const quickNodeProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.quickNode
  // );
  // const drpcProvider = new providers.JsonRpcProvider(MainnetProviders.drpc);
  // const blockPiProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.blockPi
  // );
  // const publicNodeProvider = new providers.JsonRpcProvider(
  //   MainnetProviders.publicNode
  // );
  // const llamaProvider = new providers.JsonRpcProvider(MainnetProviders.llama);

  const alchemyProviderWs = new providers.WebSocketProvider(
    MainnetProviders.alchemyWs
  );
  const chainnodesProviderWs = new providers.WebSocketProvider(
    MainnetProviders.chainnodesWs
  );
  const chainstackProviderWs = new providers.WebSocketProvider(
    MainnetProviders.chainstackWs
  );
  const infuraProviderWs = new providers.WebSocketProvider(
    MainnetProviders.infuraWs
  );
  const quickNodeProviderWs = new providers.WebSocketProvider(
    MainnetProviders.quickNodeWs
  );
  const drpcProviderWs = new providers.WebSocketProvider(
    MainnetProviders.drpcWs
  );
  const blockPiProviderWs = new providers.WebSocketProvider(
    MainnetProviders.blockPiWs
  );
  const publicNodeProviderWs = new providers.WebSocketProvider(
    MainnetProviders.publicNodeWs
  );
  const llamaProviderWs = new providers.WebSocketProvider(
    MainnetProviders.llamaWs
  );
  const getBlockProviderWs = new providers.WebSocketProvider(
    MainnetProviders.getBlockWs
  );
  const omniaProviderWs = new providers.WebSocketProvider(
    MainnetProviders.omniaWs
  );

  let benchmarkResult: BenchmarkResult[] = [];

  for (let i = 0; i < 7; i++) {
    const promises = await Promise.all([
      // measureTime(() => getBalance(alchemyProvider), "alchemy"),
      measureTime(() => getBalance(alchemyProviderWs), "alchemy ws"),
      // measureTime(() => getBalance(chainnodesProvider), "chainnodes"),
      measureTime(() => getBalance(chainnodesProviderWs), "chainnodes ws"),
      // measureTime(() => getBalance(chainstackProvider), "chainstack"),
      measureTime(() => getBalance(chainstackProviderWs), "chainstack ws"),
      // measureTime(() => getBalance(infuraProvider), "infura"),
      measureTime(() => getBalance(infuraProviderWs), "infura ws"),
      // measureTime(() => getBalance(quickNodeProvider), "quicknode"),
      measureTime(() => getBalance(quickNodeProviderWs), "quicknode ws"),
      // measureTime(() => getBalance(drpcProvider), "drpc"),
      measureTime(() => getBalance(drpcProviderWs), "drpc ws"),
      // measureTime(() => getBalance(blockPiProvider), "blockPi"),
      measureTime(() => getBalance(blockPiProviderWs), "blockPi ws"),
      // measureTime(() => getBalance(publicNodeProvider), "publicNode"),
      measureTime(() => getBalance(publicNodeProviderWs), "publicNode ws"),
      // measureTime(() => getBalance(llamaProvider), "Llama"),
      measureTime(() => getBalance(llamaProviderWs), "Llama ws"),
      measureTime(() => getBalance(getBlockProviderWs), "getblock ws"),
      measureTime(() => getBalance(omniaProviderWs), "omnia ws"),
    ]);

    if (i === 0) {
      const transformedRes: BenchmarkResult[] = promises.map((item) => ({
        providerName: item.providerName,
        time: [item.time],
        average: 0,
        averageWithoutFirstCall: 0,
      }));
      benchmarkResult = transformedRes;
    } else {
      promises.forEach((response, idx) => {
        benchmarkResult[idx].time.push(response.time);
      });
    }
  }

  const calculatedAverageTime = benchmarkResult
    .map((result) => ({
      ...result,
      time: result.time.join(", "),
      average:
        result.time.reduce((acccumulator, time) => acccumulator + time, 0) /
        result.time.length,
      averageWithoutFirstCall:
        result.time
          .filter((_, idx) => idx !== 0)
          .reduce((acccumulator, time) => acccumulator + time, 0) /
        (result.time.length - 1),
    }))
    .sort((a, b) => a.averageWithoutFirstCall - b.averageWithoutFirstCall);

  console.table(calculatedAverageTime);
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.log(err));

async function measureTime(
  fn: () => Promise<BigNumber>,
  provider: string
): Promise<BenchmarkResponse> {
  const start = performance.now();
  let elapsed = 0;
  await fn().then(() => {
    elapsed = performance.now() - start;
  });

  const response: BenchmarkResponse = {
    providerName: provider,
    time: Number(elapsed.toFixed(4)),
  };
  return response;
}

async function getBalance(
  provider: providers.JsonRpcProvider
): Promise<BigNumber> {
  const balance = await provider.getBalance(WalletAddress);
  return balance;
}
