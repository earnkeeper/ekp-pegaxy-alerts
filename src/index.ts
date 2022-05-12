import { config } from "@earnkeeper/ekp-sdk";
import axios from "axios";
import { Client } from "discord.js";
import { ethers } from "ethers";
import { discordLogin, sendMessageToUser } from "./discord";
import { Pega } from "./pega";

require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  config("POLYGON_JSON_RPC_PROVIDER", { default: "https://polygon-rpc.com" })
);

async function processTransaction(
  discordClient: Client,
  tran: Partial<ethers.Transaction>
) {
  const data = tran.data;

  const price = ethers.BigNumber.from("0x" + data.slice(74, 138)).toNumber();
  const tokenId = ethers.BigNumber.from("0x" + data.slice(138, 202)).toNumber();

  const pega: Pega = await axios
    .get(`https://api-apollo.pegaxy.io/v1/game-api/pega/${tokenId}`)
    .then((response) => response.data.pega);

  const message = `A pega has been purchased.\nPrice: ${(
    price / 1000000
  ).toFixed()} USDT`;

  sendMessageToUser(discordClient, message);
}

(async () => {
  const client = await discordLogin();

  await processTransaction(client, {
    hash: "0x28e87a67f53d02c68b5efdd9df885872e65c574bd453f03f331f1db49c79beeb",
    from: "0x7161B3347F1E772DD12c47E736130cd4472ACEb8",
    data: "0x0bb5eaf300000000000000000000000000000000000000000000000000000000000b5c2900000000000000000000000000000000000000000000000000000000004c4b4000000000000000000000000000000000000000000000000000000000000be2cb0000000000000000000000000000000000000000000000000000000000000000",
  });

  // provider.on(
  //     {
  //       address: "0x66e4e493bab59250d46bfcf8ea73c02952655206",
  //     },
  //     async (log: ethers.providers.Log) => {
  //       const tran = await provider.getTransaction(log.transactionHash);
  //       const data = tran.data;

  //       if (data?.toLowerCase().startsWith("0x0bb5eaf3")) {
  //         console.log(tran);
  //         await processTransaction(client, tran);
  //       }
  //     }
  //   );
})();
