const config = require("../config");

// ================= CONFIG =================
const BAD_WORDS = [
  "badword1",
  "badword2",
  "fuck",
  "shit"
];

// user message tracking (spam system)
const userMessages = new Map();

module.exports = (message) => {

  if (!message.guild) return;
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // ================= BAD WORD FILTER =================
  for (const word of BAD_WORDS) {
    if (content.includes(word)) {

      message.delete().catch(() => {});

      return message.channel.send({
        content: `⚠️ ${message.author}, bad language is not allowed here!`
      }).then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 3000);
      });
    }
  }

  // ================= LINK BLOCKER =================
  const linkRegex = /(https?:\/\/|discord\.gg|www\.)/gi;

  if (linkRegex.test(content)) {

    message.delete().catch(() => {});

    return message.channel.send({
      content: `🚫 ${message.author}, links are not allowed!`
    }).then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 3000);
    });
  }

  // ================= CAPS DETECTION =================
  const upperCase = message.content.replace(/[^A-Z]/g, "").length;
  const totalLetters = message.content.replace(/[^a-zA-Z]/g, "").length;

  if (totalLetters > 6 && upperCase / totalLetters > 0.7) {

    message.delete().catch(() => {});

    return message.channel.send({
      content: `⚠️ ${message.author}, please don’t use excessive caps!`
    }).then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 3000);
    });
  }

  // ================= ANTI SPAM =================
  const userId = message.author.id;
  const now = Date.now();

  if (!userMessages.has(userId)) {
    userMessages.set(userId, []);
  }

  const timestamps = userMessages.get(userId);

  timestamps.push(now);

  // keep only last 5 messages
  const recent = timestamps.filter(t => now - t < 5000);

  userMessages.set(userId, recent);

  if (recent.length > 5) {

    message.delete().catch(() => {});

    return message.channel.send({
      content: `🚨 ${message.author}, stop spamming!`
    }).then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 3000);
    });
  }
};
