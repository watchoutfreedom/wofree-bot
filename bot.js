/** @type {typeof import('telegraf').Telegraf} */
const { Telegraf } = require('telegraf');
const express = require('express');
const expressApp = express();

const API_TOKEN = process.env.API_TOKEN || '2118962917:AAF2yuqZkPqqOpj31rxj0-6gPKaBKqGrxVg';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://wofree-bot.herokuapp.com';

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

bot.start((ctx) => {
  ctx.reply('Welcome');
})
bot.launch();

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
