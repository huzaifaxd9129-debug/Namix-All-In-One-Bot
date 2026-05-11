module.exports = {

  // ================= CORE BOT =================
  prefix: "!",

  // ================= STATUS SYSTEM =================
  statusMessages: [
    "Moderating Premium Servers",
    "Ensuring Uptime Stability",
    "Made By Huztro",
    "Latence: 174",
    "Exculting System Diagnostics"
  ],

  statusType: "PLAYING", // PLAYING | WATCHING | LISTENING

  // ================= TICKET SYSTEM =================
  ticketCategoryName: "🎫 Tickets",
  ticketLogsChannel: "1500169351549026475",

  // ================= WELCOME SYSTEM =================
  welcomeChannelId: "1500169320683147405",
  autoRoleId: "1502738562368540774",

  // ================= STAFF APPLY =================
  staffApplyLogs: "1500169352757121204",
  staffQuestions: [
    "Why do you want to become staff?",
    "What is your experience?",
    "How active are you daily?",
    "Your age?"
  ],

  // ================= AUTOMOD =================
  automod: {
    badWords: ["fuck", "shit", "chutiye", "bkl"],
    antiLink: true,
    antiSpam: true,
    capsLimit: 70,
    muteTime: 10 * 60 * 1000 // 10 minutes
  },

  // ================= GIVEAWAY =================
  giveawayEmoji: "🎉",
  giveawayColor: "Gold",

  // ================= INVITE TRACKER =================
  inviteLogChannel: "1503462852898586797",

  // ================= LOGGING =================
  modLogsChannel: "1500169350307647488"

};
