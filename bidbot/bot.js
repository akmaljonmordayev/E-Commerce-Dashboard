const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const TOKEN = "7754183054:AAHXE924a_m6TtJppf0Bqcdhv9q9gzc9hnk"; 
const API_URL = "http://localhost:5000/orders"; 

const bot = new TelegramBot(TOKEN, { polling: true });
const userState = new Map();

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  const welcome = `
🏪 <b>Dashly-Uz Buyurtma Bot</b>
─────────────────────
👋 <b>Xush kelibsiz!</b>
Bu yerda siz yangi buyurtma yaratishingiz mumkin.
Buyurtma avtomatik tarzda JSON server bazasiga qo‘shiladi.

👇 Quyidagi tugmani bosing va boshlaymiz!
`;

  await bot.sendMessage(chatId, welcome, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🆕 Yangi buyurtma yaratish", callback_data: "create_order" }],
      ],
    },
  });
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "create_order") {
    userState.set(chatId, { step: "enter_name" });
    await bot.sendMessage(chatId, "📝 <b>Buyurtma nomini kiriting:</b>", {
      parse_mode: "HTML",
    });
  }

  if (data === "confirm_order") {
    const state = userState.get(chatId);
    if (!state) return;

    const today = new Date().toISOString().split("T")[0];
    const order = {
      id: String(Date.now()),
      customerId: String(chatId),
      status: "Kutilmoqda",
      totalAmount: state.amount,
      createdAt: today,
      name: state.name,
    };

    try {
      await axios.post(API_URL, order);
      await bot.sendMessage(
        chatId,
        `✅ <b>Buyurtma muvaffaqiyatli qo‘shildi!</b>\n\n📦 ${order.name}\n💰 $${order.totalAmount.toFixed(
          2
        )}\n📅 ${today}\n🕓 Holat: <b>Kutilmoqda</b>`,
        { parse_mode: "HTML" }
      );
      console.log("✅ Yangi buyurtma:", order);
    } catch (err) {
      console.error(err.message);
      await bot.sendMessage(chatId, "❌ Buyurtmani saqlashda xatolik yuz berdi!");
    }

    userState.delete(chatId);
  }

  if (data === "cancel_order") {
    userState.delete(chatId);
    await bot.sendMessage(chatId, "❌ Buyurtma yaratish bekor qilindi.");
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();
  const state = userState.get(chatId);

  if (!state || text.startsWith("/")) return;

  if (state.step === "enter_name") {
    state.name = text;
    state.step = "enter_amount";
    userState.set(chatId, state);

    await bot.sendMessage(
      chatId,
      "💰 Buyurtma summasini kiriting (masalan: 2000 yoki 2000.50):"
    );
    return;
  }

  if (state.step === "enter_amount") {
    const amount = parseFloat(text.replace(",", "."));
    if (isNaN(amount)) {
      return bot.sendMessage(
        chatId,
        "⚠️ Noto‘g‘ri summa! Masalan: 1999.99 tarzida kiriting."
      );
    }

    state.amount = amount;
    state.step = "confirm";
    userState.set(chatId, state);

    const preview = `
📦 <b>${state.name}</b>
💰 <b>$${amount.toFixed(2)}</b>
📅 ${new Date().toISOString().split("T")[0]}
🕓 Holat: Kutilmoqda

Buyurtmani yaratishni tasdiqlang 👇
`;

    await bot.sendMessage(chatId, preview, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Tasdiqlash", callback_data: "confirm_order" },
            { text: "❌ Bekor qilish", callback_data: "cancel_order" },
          ],
        ],
      },
    });
  }
});

console.log("🚀 bidbot ishga tushdi va buyurtmalarni qabul qilishga tayyor!");
