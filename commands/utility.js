const {
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "utility",

  async execute(message, args, client) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd) {
      return message.channel.send(`
🧰 **UTILITY COMMANDS**

• \`utility ping\`
• \`utility userinfo @user\`
• \`utility serverinfo\`
• \`utility avatar @user\`
• \`utility id\`

⚡ Simple & Fast Utility System
      `);
    }

    // ================= PING =================
    if (cmd === "ping") {

      const msg = await message.channel.send("🏓 Pinging...");

      const ping = msg.createdTimestamp - message.createdTimestamp;

      return msg.edit(`🏓 Pong!\nLatency: **${ping}ms**\nAPI: **${client.ws.ping}ms**`);
    }

    // ================= USERINFO =================
    if (cmd === "userinfo") {

      const member = message.mentions.members.first() || message.member;

      const embed = new EmbedBuilder()
        .setTitle("👤 USER INFORMATION")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: "Username", value: member.user.tag, inline: true },
          { name: "ID", value: member.id, inline: true },
          { name: "Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
          { name: "Account Created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true }
        )
        .setColor("Blue");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= SERVER INFO =================
    if (cmd === "serverinfo") {

      const guild = message.guild;

      const embed = new EmbedBuilder()
        .setTitle("🌐 SERVER INFORMATION")
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: "Server Name", value: guild.name, inline: true },
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Members", value: `${guild.memberCount}`, inline: true },
          { name: "Boost Level", value: `${guild.premiumTier}`, inline: true },
          { name: "Channels", value: `${guild.channels.cache.size}`, inline: true },
          { name: "Roles", value: `${guild.roles.cache.size}`, inline: true }
        )
        .setColor("Purple");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= AVATAR =================
    if (cmd === "avatar") {

      const member = message.mentions.members.first() || message.member;

      const avatar = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

      const embed = new EmbedBuilder()
        .setTitle(`🖼️ ${member.user.tag}'s Avatar`)
        .setImage(avatar)
        .setColor("Green");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= ID =================
    if (cmd === "id") {

      const member = message.mentions.members.first() || message.member;

      return message.channel.send(`
🆔 **ID INFO**

👤 User: ${member.user.tag}
🆔 ID: ${member.id}
      `);
    }

  }
};
