const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const token = "2121732649:AAEwOTG0QdPZNRYdxYc_lnFY1GZSguCDBII";
const puppeteer = require("puppeteer");

const URL =
  "https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=SignUp";
const bot = new Telegraf(process.env.BOT_TOKEN)

//#region test
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

bot.hears('test', async (ctx) => {
    getPage()
})


async function typeMail(mail) {
  const browser = await puppeteer.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.type("#username", mail)
}
//#endregion

const userData = new Map()
const registered = []

// const passSel = '#passwd > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)'
const passSel = '1'

bot.start((ctx) => {
  
  ctx.replyWithHTML('<b>REGISTRATION</b>',
  Markup.inlineKeyboard(    [
        [Markup.button.callback('firstName', '#firstName'), Markup.button.callback('lastName', '#lastName')],
        [Markup.button.callback('mail', '#username'), Markup.button.callback('DOB', '#DOB')],
        [Markup.button.callback('recoveryMail', '#recoveryMail')],
        [Markup.button.callback('password', passSel)],
        [Markup.button.callback('Go to Registration', 'go')]
      ])  
      )

  // function addActionBot(selector) {
  //   bot.action(selector, async (ctx) => {
  //     // await 
  //     ctx.answerCbQuery()
  //     ctx.reply('Write your ' + selector)
  //     await bot.on('text', async (ctx) => {
  //         await userData.set(selector, ctx.message.text)
  //         ctx.reply(userData.get(selector) + "!")
  //     })
  //   })
  // }

  

})

bot.action('#firstName', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply('Write your firstname')
  bot.on('text', (ctx) => {
      userData.set('#firstName', ctx.message.text)
      ctx.reply(userData.get('#firstName') + "!")
  })
})

bot.action('#lastName', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply('Write your lastName')
  bot.on('text', (ctx) => {
      userData.set('#lastName', ctx.message.text)
      ctx.reply(userData.get('#lastName') + "!")
  })
})
bot.action('go', () => goToRegistration())



// addActionBot('#lastName')
// addActionBot('#firstName')
// addActionBot('#username')
// addActionBot('#DOB')
// addActionBot(passSel)
// addActionBot('#recoveryMail')

async function goToRegistration() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.type("#firstName", userData.get('#firstName') + "");
  await page.type('#lastName', userData.get('#lastName') + "")
  await page.type('#username', userData.get('#username') + "")
  await page.click('#i3')
  await page.type('#passwd > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)', userData.get(passSel) + "")
  await page.type('#confirm-passwd > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)', userData.get(passSel) + "")
  await page.click('.VfPpkd-LgbsSe-OWXEXe-k8QpJ > span:nth-child(3)')
}








bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))