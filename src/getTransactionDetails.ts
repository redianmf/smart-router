import { Alchemy, AssetTransfersCategory } from "alchemy-sdk";
import { providers, utils } from "ethers";
import { AlchemyConfig, ProviderURL } from "./config";

async function main(providerUrl: string, txHash: string) {
  const alchemy = new Alchemy(AlchemyConfig);

  const provider = new providers.JsonRpcProvider(providerUrl);
  const txReceipt = await provider.waitForTransaction(txHash);
  console.log(txReceipt.logs[0].topics);

  const assetTransfer = await alchemy.core.getAssetTransfers({
    fromBlock: utils.hexlify(txReceipt.blockNumber),
    toBlock: utils.hexlify(txReceipt.blockNumber),
    fromAddress: txReceipt.from,
    toAddress: txReceipt.to,
    excludeZeroValue: false,
    category: [
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC1155,
    ],
  });

  console.log(assetTransfer);
}

main(
  ProviderURL.ARBITRUM,
  "0x419284f416287ebe106ef8a1487e566d906f4bee58610dea6fcf4cbb818957e5"
).catch((e) => console.log(e));
