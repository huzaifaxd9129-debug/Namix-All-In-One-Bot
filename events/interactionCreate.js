module.exports = (client) => {

  client.on("interactionCreate", async (interaction) => {
    try {

      // ================= BUTTON HANDLING =================
      if (interaction.isButton()) {

        const { customId } = interaction;

        // ================= TICKET SYSTEM BUTTONS =================
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
            type: 0, // text channel
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ["ViewChannel"]
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
              }
            ]
          });

          return interaction.reply({
            content: `🎫 Ticket created: ${channel}`,
            ephemeral: true
          });
        }

        // ================= CLOSE TICKET =================
        if (customId === "close_ticket") {

          await interaction.reply({
            content: "🔒 Closing ticket in 5 seconds...",
            ephemeral: true
          });

          setTimeout(() => {
            interaction.channel.delete().catch(() => {});
          }, 5000);
        }

        // ================= CLAIM TICKET =================
        if (customId === "claim_ticket") {

          return interaction.reply({
            content: `👤 Ticket claimed by ${interaction.user}`,
            allowedMentions: { repliedUser: false }
          });
        }

        // ================= GIVEAWAY JOIN =================
        if (customId === "giveaway_join") {

          return interaction.reply({
            content: "🎉 You joined the giveaway!",
            ephemeral: true
          });
        }

        // ================= STAFF APPLY BUTTON =================
        if (customId === "apply_staff") {

          return interaction.reply({
            content: "🧑‍💼 Staff application opened (system coming soon)",
            ephemeral: true
          });
        }
      }

      // ================= MODALS (for future staff apply) =================
      if (interaction.isModalSubmit()) {

        // Example for staff application modal
        if (interaction.customId === "staff_apply_form") {

          const answer1 = interaction.fields.getTextInputValue("q1");
          const answer2 = interaction.fields.getTextInputValue("q2");

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
