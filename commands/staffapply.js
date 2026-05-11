const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  name: "staffapply",

  async execute(message, args) {

    // ================= PERMISSION =================
    if (!message.member.permissions.has("Administrator"))
      return message.reply("❌ Only admins can setup staff applications.");

    // ================= EMBED PANEL =================
    const embed = new EmbedBuilder()
      .setTitle("🧑‍💼 STAFF APPLICATION")
      .setDescription(`
Want to join our staff team?

📌 Requirements:
• Be active
• Be respectful
• Have good knowledge of server rules
• No toxicity

Click the button below to apply 👇
      `)
      .setColor("Purple")
      .setFooter({ text: message.guild.name });

    // ================= BUTTON =================
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("apply_staff")
        .setLabel("Apply Now")
        .setEmoji("📝")
        .setStyle(ButtonStyle.Success)
    );

    return message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
};
