require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType
} = require("discord.js");

// ================= CLIENT =================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember]
});

// ================= COMMAND HANDLER =================
client.commands = new Map();
require("./handlers/commandHandler")(client);

// ================= EVENTS =================
require("./events/messageCreate")(client);
require("./events/interactionCreate")(client);
require("./events/guildMemberAdd")(client);

// ================= SYSTEMS =================
require("./systems/automod")(client);
require("./systems/invites")(client);

// ================= READY EVENT =================
client.once("clientReady", () => {
  console.log("Bot is ready");
});

  console.log(`
✅ BOT ONLINE
🤖 ${client.user.tag}
📊 Servers: ${client.guilds.cache.size}
  `);

  // ================= MULTIPLE STATUSES =================
  const statuses = [
    { name: "Moderating Premium Servers", type: ActivityType.Playing },
    { name: "Ensuring Uptime Stability", type: ActivityType.Watching },
    { name: "Made By Huztro", type: ActivityType.Listening },
    { name: "Latence: 174ms", type: ActivityType.Playing },
    { name: "Exculting System Diagnostics", type: ActivityType.Watching }
  ];

  let i = 0;

  setInterval(() => {

    const status = statuses[i];

    client.user.setActivity(status.name, {
      type: status.type
    });

    i = (i + 1) % statuses.length;

  }, 5000); // change every 5 seconds

});

// ================= ERROR HANDLING =================
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// ================= LOGIN =================
client.login(process.env.TOKEN);
