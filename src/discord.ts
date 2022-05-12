import { config } from "@earnkeeper/ekp-sdk";
import { Client, Intents, TextChannel } from "discord.js";

export async function discordLogin() {
  const token = config("DISCORD_TOKEN");

  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  await client.login(token);

  console.log("Discord logged in");

  return client;
}

export async function sendMessageToChannel(client: Client, message: string) {
  const channel = await client.channels.fetch("968809918096347236") as TextChannel;

  const result = await channel.send(message);

  console.log(`Sent message to channel ${channel.name}`);
}

export async function sendMessageToUser(client: Client, message: string) {
  const user = await client.users.fetch("407876084156071937");

  await user.send(message);
}
