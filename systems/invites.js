const invitesCache = new Map();

module.exports = (client) => {

  // ================= CACHE INVITES ON READY =================
  client.once("ready", async () => {

    console.log("📊 Invite system loading...");

    client.guilds.cache.forEach(async (guild) => {

      try {
        const invites = await guild.invites.fetch();
        invitesCache.set(guild.id, new Map(invites.map(i => [i.code, i.uses])));
      } catch (err) {
        console.log("❌ Cannot fetch invites for:", guild.name);
      }

    });

    console.log("✅ Invite system ready!");
  });

  // ================= MEMBER JOIN =================
  client.on("guildMemberAdd", async (member) => {

    try {

      const guild = member.guild;

      const newInvites = await guild.invites.fetch();
      const oldInvites = invitesCache.get(guild.id);

      invitesCache.set(guild.id, new Map(newInvites.map(i => [i.code, i.uses])));

      if (!oldInvites) return;

      const usedInvite = newInvites.find(i =>
        oldInvites.get(i.code) < i.uses
      );

      if (!usedInvite) return;

      const inviter = usedInvite.inviter;

      console.log(`📊 ${member.user.tag} joined using invite from ${inviter.tag}`);

      // ================= OPTIONAL: SEND LOG =================
      const logChannel = guild.channels.cache.find(c =>
        c.name === "invite-logs"
      );

      if (logChannel) {
        logChannel.send(
          `📊 **Invite Tracker**\n👤 ${member.user.tag} joined\n🔗 Invited by: ${inviter.tag}\n📈 Invite Code: ${usedInvite.code}`
        );
      }

    } catch (err) {
      console.log("❌ Invite tracking error:", err);
    }
  });

};
