const http = require("http");
const { Telegraf, Markup } = require("telegraf");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("bot is alive");
}).listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const bot = new Telegraf(process.env.BOT_TOKEN);

const CHANNEL_INVITE = "https://t.me/SkillSelluz";
const INSTAGRAM = "https://www.instagram.com/skillselluz/";
const WEBSITE = "https://skillsell.uz";

bot.start((ctx) => {
  const name = ctx.from.first_name || "there";
  ctx.reply(
    `Hey ${name} 👋\n\nSkillSell is a free workshop program helping Uzbek students learn how to actually market themselves — resume, LinkedIn, portfolio, personal brand, all of it.\n\nBefore we let you in, take 60 seconds to check us out:\n\n• See what we're about on Instagram\n• Get the full picture on our website\n\nThen hit the button below and we'll send you the channel link.`,
    {
      ...Markup.inlineKeyboard([
        [Markup.button.url("Instagram", INSTAGRAM)],
        [Markup.button.url("Website", WEBSITE)],
        [Markup.button.callback("✅ Done, let me in", "done")],
      ]),
    }
  );
});

bot.action("done", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    `Here you go 👇\n\n${CHANNEL_INVITE}\n\nSeason 1 kicks off June 20th. Six sessions, three weeks, completely free. See you there.`
  );
});

bot.launch();
console.log("✅ SkillSell bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
