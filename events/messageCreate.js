const config = require("../config");

module.exports = (client) => {

  client.on("messageCreate", async (message) => {
    try {

      // ================= BASIC CHECKS =================
      if (!message.guild) return;
      if (message.author.bot) return;
      if (!message.content.startsWith(config.prefix)) return;

      const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/);

      const cmd = args.shift().toLowerCase();

      // ================= COMMAND HANDLER =================
      const command = client.commands.get(cmd);
      if (command) {
        return command.execute(message, args, client);
      }

      // ================= AUTOMOD SYSTEM (HOOK READY) =================
      // You will later connect automod.js here
      // Example:
      // require("../systems/automod")(message);

    } catch (err) {
      console.error("❌ MessageCreate Error:", err);
    }
  });

};
