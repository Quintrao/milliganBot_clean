const { Telegraf } = require('telegraf')
require('dotenv').config()
const token = "2121732649:AAEwOTG0QdPZNRYdxYc_lnFY1GZSguCDBII";
const puppeteer = require("puppeteer");

const URL =
  "https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=SignUp";
const bot = new Telegraf(process.env.BOT_TOKEN)

async function getPage() {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    await page.goto(URL);
  
    await page.type("#firstName", "Руслан");
    await page.type('#lastName', 'Питонов')
    await page.type('#username', 'lazyjihad18')
    await page.click('#i3')
    await page.type('#passwd > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)', 'Vegetables&Exploisons_2')
    await page.type('#confirm-passwd > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)', 'Vegetables&Exploisons_2')
    await page.click('.VfPpkd-LgbsSe-OWXEXe-k8QpJ > span:nth-child(3)')
}

bot.hears('go', async (ctx) => {
    getPage()
})

// bot.onCommand('help', ctx => {
//  ctx.reply('write "go" to start registration') 
// })

// bot.on("message", async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     let result = await getPage();
//     await bot.sendMessage(chatId, "echo: " + text + " " + result);
//   });


bot.start((ctx) => ctx.reply('Welcome'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))