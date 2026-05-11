const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = (client) => {

  client.on("interactionCreate", async (interaction) => {

    try {

      // ================= DEBUG =================
      console.log("INTERACTION:", interaction.customId);

      // ================= BUTTON CHECK =================
      if (!interaction.isButton()) return;

      const { customId } = interaction;

      // ================= 🎫 CREATE TICKET =================
      if (customId === "create_ticket") {

        try {

          const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.id}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.ReadMessageHistory
                ]
              }
            ]
          });

          return interaction.reply({
            content: `🎫 Ticket created: ${channel}`,
            ephemeral: true
          });

        } catch (err) {
          console.log("❌ TICKET ERROR:", err);

          return interaction.reply({
            content: "❌ Ticket failed. Check bot permissions.",
            ephemeral: true
          });
        }
      }

      // ================= OTHER BUTTONS =================
      if (customId === "close_ticket") {
        return interaction.reply({
          content: "🔒 Closing ticket...",
          ephemeral: true
        });
      }

      if (customId === "giveaway_join") {
        return interaction.reply({
          content: "🎉 You joined giveaway!",
          ephemeral: true
        });
      }

      if (customId === "apply_staff") {
        return interaction.reply({
          content: "📩 Check your DM for application!",
          ephemeral: true
        });
      }

    } catch (err) {
      console.log("❌ INTERACTION ERROR:", err);
    }
  });

};
