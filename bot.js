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
  console.log(ctx);
  ctx.reply('Welcome ' + ctx.from.first_name + ' ' + ctx.from.last_name  );
  ctx.reply( `Bienvenido ${ ctx.from.first_name }. ${ctx.from.last_name}`  );

})

bot.help((ctx) => {
  ctx.reply('Help');
})

bot.settings((ctx) => {
  ctx.reply('Settings');
})

bot.command(['mycommand', 'test', 'mycommand'], (ctx) => {
  ctx.reply('Settings');
})

bot.hears('hola', (ctx) => {
  ctx.reply('Bienvenido/a!');
})

bot.hears(['imbécil', 'cabrón', 'Me cago en tus muertos', 'mamón', 'maricón', 'mamoncete', 'estúpido', 'tonto', 'karajote', 'Maricón', 'Imbécil', 'Imbecil', 'Hijo de puta', 'mongolo', 'MONGOLO', 'MAMON'], (ctx) => {
  ctx.reply('Cuidado con el lenguaje hijo de puta');
})

bot.mention('salrodgom', (ctx) => {
  ctx.reply('Menudo hijo de puta');
})

bot.mention('amiguet', (ctx) => {
  ctx.reply('Es mi amo, un poco mariconcete');
})

// bot.on('text', (ctx) => {
//   ctx.reply('Escribes');
// })

bot.on('sticker', (ctx) => {
  ctx.reply('ese sticker guapo!');
})

bot.on('emoji', (ctx) => {
  ctx.reply('Los emojis son para subnormales');
})

bot.on('gifs', (ctx) => {
  ctx.reply('Los gifs los mandan los analfabetos y mongolos');
})


bot.launch();

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
