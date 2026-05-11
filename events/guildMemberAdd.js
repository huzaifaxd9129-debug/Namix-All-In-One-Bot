const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

  client.on("guildMemberAdd", async (member) => {

    try {

      // ================= CONFIG =================
      const welcomeChannelId = "1500169320683147405";
      const autoRoleId = "1502738562368540774"; // optional

      const channel = member.guild.channels.cache.get(welcomeChannelId);
      if (!channel) return;

      // ================= AUTO ROLE =================
      if (autoRoleId) {
        const role = member.guild.roles.cache.get(autoRoleId);
        if (role) {
          member.roles.add(role).catch(() => {});
        }
      }

      // ================= WELCOME EMBED =================
      const embed = new EmbedBuilder()
        .setTitle("👋 Welcome to the Server!")
        .setDescription(`
Hey ${member} 👋

Welcome to **${member.guild.name}** 🎉

📌 You are member #${member.guild.memberCount}

💬 Read rules before chatting
🎫 Open a ticket if you need help
🚀 Enjoy your stay!
        `)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor("Green")
        .setFooter({ text: "We are happy to have you here ❤️" })
        .setTimestamp();

      // ================= SEND MESSAGE =================
      channel.send({ embeds: [embed] });

    } catch (err) {
      console.error("❌ GuildMemberAdd Error:", err);
    }

  });

};
