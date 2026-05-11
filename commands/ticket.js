const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  ChannelType
} = require("discord.js");

module.exports = {
  name: "ticket",

  async execute(message, args) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd) {
      return message.channel.send(`
🎫 **TICKET COMMANDS**

• \`ticket setup <title> | <description>\`
• \`ticket close\`
• \`ticket claim\`
• \`ticket rename <name>\`
• \`ticket add @user\`
• \`ticket remove @user\`

⚡ Professional Ticket System
      `);
    }

    // ================= SETUP PANEL =================
    if (cmd === "setup") {

      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return message.reply("❌ You need Admin permission.");

      const text = args.slice(1).join(" ");

      if (!text.includes("|"))
        return message.reply("❌ Format: ticket setup Title | Description");

      const [title, description] = text.split("|");

      const embed = new EmbedBuilder()
        .setTitle(`🎫 ${title}`)
        .setDescription(description)
        .setColor("Blue")
        .setFooter({ text: message.guild.name });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("create_ticket")
          .setLabel("Create Ticket")
          .setEmoji("🎫")
          .setStyle(ButtonStyle.Primary)
      );

      return message.channel.send({
        embeds: [embed],
        components: [row]
      });
    }

    // ================= CLOSE =================
    if (cmd === "close") {

      if (!message.channel.name.includes("ticket"))
        return message.reply("❌ This is not a ticket channel.");

      await message.channel.send("🔒 Closing ticket in 5 seconds...");

      setTimeout(() => {
        message.channel.delete().catch(() => {});
      }, 5000);
    }

    // ================= CLAIM =================
    if (cmd === "claim") {

      if (!message.channel.name.includes("ticket"))
        return;

      return message.channel.send({
        content: `👤 Ticket claimed by ${message.author}`
      });
    }

    // ================= RENAME =================
    if (cmd === "rename") {

      const name = args.slice(1).join("-");

      if (!name)
        return message.reply("❌ Provide a name.");

      await message.channel.setName(`ticket-${name}`);

      return message.channel.send(`✏ Ticket renamed to **${name}**`);
    }

    // ================= ADD USER =================
    if (cmd === "add") {

      const user = message.mentions.users.first();

      if (!user)
        return message.reply("❌ Mention a user.");

      await message.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
        SendMessages: true
      });

      return message.channel.send(`➕ ${user} added to ticket.`);
    }

    // ================= REMOVE USER =================
    if (cmd === "remove") {

      const user = message.mentions.users.first();

      if (!user)
        return message.reply("❌ Mention a user.");

      await message.channel.permissionOverwrites.delete(user.id);

      return message.channel.send(`➖ ${user} removed from ticket.`);
    }
  }
};
