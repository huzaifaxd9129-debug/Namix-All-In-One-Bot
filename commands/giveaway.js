const {
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "giveaway",

  async execute(message, args, client) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd) {
      return message.channel.send(`
🎉 **GIVEAWAY COMMANDS**

• \`giveaway gstart <time>s/m/h <winners> <prize>\`
• \`giveaway reroll <messageID>\`

📌 Example:
\`giveaway gstart 10m 1 Nitro\`
      `);
    }

    // ================= START GIVEAWAY =================
    if (cmd === "gstart") {

      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
        return message.reply("❌ You need Manage Server permission.");

      const time = args[1];
      const winners = parseInt(args[2]);
      const prize = args.slice(3).join(" ");

      if (!time || !winners || !prize)
        return message.reply("❌ Format: gstart <time> <winners> <prize>");

      let duration;

      if (time.endsWith("s")) duration = parseInt(time) * 1000;
      else if (time.endsWith("m")) duration = parseInt(time) * 60000;
      else if (time.endsWith("h")) duration = parseInt(time) * 3600000;
      else return message.reply("❌ Use s/m/h for time.");

      const embed = new EmbedBuilder()
        .setTitle("🎉 GIVEAWAY STARTED")
        .setDescription(`
🎁 Prize: **${prize}**
🏆 Winners: **${winners}**
⏰ Ends in: **${time}**
📢 Hosted by: ${message.author}
        `)
        .setColor("Gold")
        .setFooter({ text: "React with 🎉 to join!" })
        .setTimestamp(Date.now() + duration);

      const msg = await message.channel.send({ embeds: [embed] });

      await msg.react("🎉");

      // ================= END GIVEAWAY =================
      setTimeout(async () => {

        const fetched = await msg.fetch();

        const reaction = fetched.reactions.cache.get("🎉");
        if (!reaction) return;

        const users = await reaction.users.fetch();
        const validUsers = users.filter(u => !u.bot);

        if (validUsers.size === 0) {
          return message.channel.send("❌ No participants for giveaway.");
        }

        const winnersList = validUsers
          .randomKey(winners > validUsers.size ? validUsers.size : winners);

        let winnerText = "";

        if (Array.isArray(winnersList)) {
          winnersList.forEach(id => {
            winnerText += `<@${id}> `;
          });
        } else {
          winnerText = `<@${winnersList}>`;
        }

        const endEmbed = new EmbedBuilder()
          .setTitle("🎉 GIVEAWAY ENDED")
          .setDescription(`
🎁 Prize: **${prize}**
🏆 Winner(s): ${winnerText}

🎊 Congratulations!
          `)
          .setColor("Green");

        message.channel.send({ embeds: [endEmbed] });

      }, duration);
    }

    // ================= REROLL =================
    if (cmd === "reroll") {

      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
        return;

      const messageId = args[1];
      if (!messageId) return;

      const msg = await message.channel.messages.fetch(messageId);

      const reaction = msg.reactions.cache.get("🎉");
      if (!reaction) return;

      const users = await reaction.users.fetch();
      const validUsers = users.filter(u => !u.bot);

      const winner = validUsers.random();

      message.channel.send(`🔁 New Winner: <@${winner.id}>`);
    }
  }
};
