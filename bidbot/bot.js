const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const TOKEN = "7754183054:AAHXE924a_m6TtJppf0Bqcdhv9q9gzc9hnk";
const API_URL = "http://localhost:5000";
const bot = new TelegramBot(TOKEN, { polling: true });
const userState = new Map();

console.log("🚀 BidBot ishga tushdi va murojaatlarni ham qabul qiladi!");

const mainMenu = {
  reply_markup: {
    keyboard: [
      ["🆕 Buyurtma yaratish", "📨 Mening murojaatlarim"],
      ["💬 Qo‘llab-quvvatlash"],
    ],
    resize_keyboard: true,
  },
};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "foydalanuvchi";

  const text = `
👋 Salom, <b>${firstName}</b>!
🏪 <b>Dashly-Uz Buyurtma Bot</b>

Bu yerda siz:
🛍 Yangi buyurtma yarata olasiz
💬 Qo‘llab-quvvatlash bilan bog‘lana olasiz
`;

  await bot.sendMessage(chatId, text, {
    parse_mode: "HTML",
    ...mainMenu,
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();
  const state = userState.get(chatId);

  if (!text || text.startsWith("/")) return;

  if (text === "📨 Mening murojaatlarim") {
    try {
      const res = await axios.get(`${API_URL}/messages?userId=${chatId}`);
      const msgs = res.data;

      if (msgs.length === 0)
        return bot.sendMessage(chatId, "📭 Sizda murojaatlar mavjud emas.", mainMenu);

      const keyboard = msgs.map((m) => [
        { text: `📂 ${m.topic}`, callback_data: `open_chat_${m.id}` },
      ]);

      await bot.sendMessage(chatId, "📋 Murojaatlarni tanlang:", {
        reply_markup: { inline_keyboard: keyboard },
      });
    } catch (err) {
      console.error(err.message);
      bot.sendMessage(chatId, "❌ Xatolik murojaatlar ro‘yxatini olishda!");
    }
    return;
  }

  if (text === "💬 Qo‘llab-quvvatlash") {
    userState.set(chatId, { step: "support_topic" });
    return bot.sendMessage(chatId, "🧾 Mavzuni kiriting (masalan: To‘lov muammosi):");
  }

  if (text === "🆕 Buyurtma yaratish") {
    userState.set(chatId, { step: "enter_name" });
    return bot.sendMessage(chatId, "📝 Buyurtma nomini kiriting:");
  }

  if (state?.step === "support_topic") {
    state.topic = text;
    state.step = "support_message";
    userState.set(chatId, state);
    return bot.sendMessage(chatId, "✍️ Endi murojaat matnini yozing:");
  }

  if (state?.step === "support_message") {
    const messageData = {
      id: String(Date.now()),
      userId: chatId,
      username: msg.from.username || "no_username",
      topic: state.topic,
      messages: [
        {
          from: "user",
          text,
          time: new Date().toLocaleString(),
        },
      ],
    };

    try {
      await axios.post(`${API_URL}/messages`, messageData);
      await bot.sendMessage(
        chatId,
        `✅ Murojaatingiz yuborildi!\n📂 <b>${state.topic}</b>\nTez orada javob olasiz.`,
        { parse_mode: "HTML", ...mainMenu }
      );
    } catch (err) {
      console.error(err.message);
      await bot.sendMessage(chatId, "❌ Xatolik! Murojaat saqlanmadi.");
    }
    userState.delete(chatId);
    return;
  }

  if (state?.step === "enter_name") {
    state.name = text;
    state.step = "enter_amount";
    userState.set(chatId, state);
    return bot.sendMessage(chatId, "💰 Summani kiriting (masalan: 2000):");
  }

  if (state?.step === "enter_amount") {
    const amount = parseFloat(text.replace(",", "."));
    if (isNaN(amount)) return bot.sendMessage(chatId, "⚠️ Noto‘g‘ri format!");
    const today = new Date().toISOString().split("T")[0];

    const order = {
      id: String(Date.now()),
      customerId: String(chatId),
      status: "Pending",
      totalAmount: amount,
      createdAt: today,
      name: state.name,
    };

    try {
      await axios.post(`${API_URL}/orders`, order);
      await bot.sendMessage(
        chatId,
        `✅ Buyurtma saqlandi!\n📦 ${order.name}\n💰 $${order.totalAmount.toFixed(
          2
        )}\n📅 ${today}\n🕓 Holat: Pending`,
        { parse_mode: "HTML", ...mainMenu }
      );
    } catch (err) {
      console.error(err.message);
      bot.sendMessage(chatId, "❌ Xatolik buyurtmani saqlashda!");
    }

    userState.delete(chatId);
  }

  const openChat = state?.openChat;
  if (openChat) {
    try {
      const res = await axios.get(`${API_URL}/messages/${openChat}`);
      const chatData = res.data;

      chatData.messages.push({
        from: "user",
        text,
        time: new Date().toLocaleString(),
      });

      await axios.put(`${API_URL}/messages/${openChat}`, chatData);
      await bot.sendMessage(chatId, "💬 Xabar yuborildi.", mainMenu);
    } catch (err) {
      console.error(err.message);
      bot.sendMessage(chatId, "❌ Xatolik xabarni yuborishda!");
    }
  }
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith("open_chat_")) {
    const id = data.replace("open_chat_", "");
    try {
      const res = await axios.get(`${API_URL}/messages/${id}`);
      const chatData = res.data;
      const history = chatData.messages
        .map(
          (m) =>
            `${m.from === "user" ? "👤 Siz" : "👨‍💼 Admin"}: ${m.text}\n🕒 ${m.time}`
        )
        .join("\n\n");

      await bot.sendMessage(
        chatId,
        `📂 <b>${chatData.topic}</b>\n──────────────\n${history}\n\n✏️ Endi xabaringizni yozing:`,
        { parse_mode: "HTML" }
      );

      userState.set(chatId, { openChat: id });
    } catch (err) {
      console.error(err.message);
      bot.sendMessage(chatId, "❌ Xatolik murojaatni ochishda!");
    }
  }
});
