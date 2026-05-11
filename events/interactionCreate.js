const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = (client) => {

  client.on("interactionCreate", async (interaction) => {
    try {

      // ================= BUTTONS =================
      if (interaction.isButton()) {

        const { customId } = interaction;

        // ================= 🎫 CREATE TICKET =================
        if (customId === "create_ticket") {

          const existing = interaction.guild.channels.cache.find(
            c => c.name === `ticket-${interaction.user.id}`
          );

          if (existing) {
            return interaction.reply({
              content: "❌ You already have an open ticket.",
              ephemeral: true
            });
          }

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
        }

        // ================= 🔒 CLOSE TICKET =================
        if (customId === "close_ticket") {

          if (!interaction.channel.name.startsWith("ticket-"))
            return interaction.reply({
              content: "❌ This is not a ticket channel.",
              ephemeral: true
            });

          await interaction.reply({
            content: "🔒 Closing ticket in 5 seconds...",
            ephemeral: true
          });

          setTimeout(() => {
            interaction.channel.delete().catch(() => {});
          }, 5000);
        }

        // ================= 👤 CLAIM TICKET =================
        if (customId === "claim_ticket") {

          if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({
              content: "❌ Only staff can claim tickets.",
              ephemeral: true
            });
          }

          return interaction.reply({
            content: `👤 Ticket claimed by ${interaction.user}`
          });
        }

        // ================= 🎉 GIVEAWAY JOIN =================
        if (customId === "giveaway_join") {

          return interaction.reply({
            content: "🎉 You joined the giveaway!",
            ephemeral: true
          });
        }

        // ================= 🧑‍💼 STAFF APPLY BUTTON =================
        if (customId === "apply_staff") {

          // SIMPLE APPLICATION FLOW (DM STYLE)
          try {
            await interaction.user.send(`
🧑‍💼 STAFF APPLICATION

Answer these questions:

1️⃣ Why do you want staff?
2️⃣ Your experience?
3️⃣ How active are you?
4️⃣ Your age?
            `);

            return interaction.reply({
              content: "📩 Check your DMs to complete application!",
              ephemeral: true
            });

          } catch (err) {
            return interaction.reply({
              content: "❌ I couldn't DM you. Enable DMs first.",
              ephemeral: true
            });
          }
        }
      }

      // ================= MODALS (FUTURE STAFF FORM SUPPORT) =================
      if (interaction.isModalSubmit()) {

        if (interaction.customId === "staff_apply_form") {

          const q1 = interaction.fields.getTextInputValue("q1");
          const q2 = interaction.fields.getTextInputValue("q2");
          const q3 = interaction.fields.getTextInputValue("q3");
          const q4 = interaction.fields.getTextInputValue("q4");

          const logChannel = interaction.guild.channels.cache.find(
            c => c.name === "staff-applications"
          );

          if (logChannel) {
            logChannel.send(`
🧑‍💼 **NEW STAFF APPLICATION**

👤 User: ${interaction.user.tag}

1️⃣ ${q1}
2️⃣ ${q2}
3️⃣ ${q3}
4️⃣ ${q4}
            `);
          }

          return interaction.reply({
            content: "✅ Application submitted successfully!",
            ephemeral: true
          });
        }
      }

    } catch (err) {
      console.error("❌ Interaction Error:", err);
    }
  });

};
