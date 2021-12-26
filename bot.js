/** @type {typeof import('telegraf').Telegraf} */
const { Telegraf, Markup, Extra, WizardScene, Composer } = require('telegraf');
const express = require('express');
const expressApp = express();
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN || '';

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://wofree-bot.herokuapp.com';

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

//variables de estado del bot
const composer = new Composer();
const isQuestion = false;
const isConsult = false;
const isProf = false;
const isEnglish = false;


bot.start((ctx) => {

  console.log(ctx);
  ctx.reply('Welcome ' + ctx.from.first_name  );
  ctx.reply( `Bienvenido ${ ctx.from.first_name }.`  );

})


//SAY HELLO
//
//

const extraObject = {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
        Markup.button.callback('Coke', 'Coke'),
        Markup.button.callback('Pepsi', 'Pepsi'),
    ]),
}

const languageObject = {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
        Markup.button.callback('Español', 'Espanol'),
        Markup.button.callback('English', 'English'),
    ]),
}


//WELCOME WITH COMMAND
bot.command('/start', (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id, '<b>Hello</b>. <i>What do you understand better?😍</i>', languageObject)

})


bot.command(['/settings'], (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id, '<b>Hello</b>. <i>What do you understand better?😍</i>', languageObject)

})





///RESPUESTA A IDIOMA ESPAÑOL
///OPTIONS object
const optionsObject = {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
        Markup.button.callback( 'Unirme como profesional', 'Profesional'),
        Markup.button.callback( 'Solicitar servicios', 'Servicios'),
        Markup.button.callback( 'Consulta', 'Consulta'),
    ]),
}

const servicesObject = {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
        Markup.button.callback('Charla', 'Encargar_charla'),
        Markup.button.callback('Curso', 'Solicitar_curso'),
        Markup.button.callback('Consultoría creativa', 'Solicitar_brainstorm'),
        Markup.button.callback('Libro, obra, etc', 'Solicitar_producto'),
    ]),
}


bot.command('/hola', (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id,'<i>Hola, qué deseas: </i>', optionsObject)

})

bot.hears('hola', (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id,'<i>Hola, qué deseas: </i>', optionsObject)

})


bot.action('Espanol', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Perfecto, qué deseas: </i>', optionsObject)
})

bot.action('Servicios', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>OK! Gracias, selecciona qué servicio te interesa :</i>', servicesObject)
  bot.telegram.sendMessage('-681528618', 'Solicittud de servicios:');
})

bot.action('Consulta', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i> Gracias por interesarte, qué te gustaría consultarnos? escríbela aquí y te responderemos lo antes posible</i>', {parse_mode: 'HTML'})
  bot.telegram.sendMessage('-681528618', 'Inicio de Consulta:');
})

bot.action('Profesional', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Perfecto, escribe en un mensaje por qué quieres unirte, tu nombre y medio de contacto y nos pondremos en contacto contigo, gracias :</i>', {parse_mode: 'HTML'});
  bot.telegram.sendMessage('-681528618', 'Proffesional asked to join');
})

bot.action('Encargar_charla', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Genial, de quién te guustaría solicitar la charla y nos pondremos en contacto contigo :</i>', {parse_mode: 'HTML'});
  bot.telegram.sendMessage('-681528618', 'Charla de:');
})

bot.action('Solicitar_curso', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Genial, de quién te gustaría solicitar el curso y nos pondremos en contacto contigo :</i>', {parse_mode: 'HTML'});
  bot.telegram.sendMessage('-681528618', 'Curso de:');
})

bot.action('Solicitar_brainstorm', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Genial, escribe los datos de tu encargo y nos pondremos en contacto contigo:</i>', {parse_mode: 'HTML'});
  bot.telegram.sendMessage('-681528618', 'Brainstorm:');
})

bot.action('Solicitar_producto', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Genial, escribe qué producto te interesa y nos pondremos en contacto contigo 😚:</i>', {parse_mode: 'HTML'});
  bot.telegram.sendMessage('-681528618', 'Producto:');
})


///RESPUESTA A IDIOMA
///OPTIONS object
composer.on('message',ctx => {
  bot.telegram.sendMessage('-681528618', ctx.message.text).then()
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Gracias por tu mensaje, di hola si necesitas algo más</i>', {parse_mode: 'HTML'});
})

bot.use(composer.middleware());


////ANSWERS IN ENGLISH 
bot.hears('hello', (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id,'<i>Hello, what do you want: </i>', optionsObject)

})


bot.hears(['imbécil', 'cabrón', 'Me cago en tus muertos', 'mamón', 'maricón', 'mamoncete', 'estúpido', 'tonto', 'karajote', 'Maricón', 'Imbécil', 'Imbecil', 'Hijo de puta', 'mongolo', 'MONGOLO', 'MAMON'], (ctx) => {
  ctx.reply('Cuidado con el lenguaje');
})
//
// bot.mention('salrodgom', (ctx) => {
//   ctx.reply('Menudo hijo de puta');
// })
//
// bot.mention('amiguet', (ctx) => {
//   ctx.reply('Ahora viene');
// })

// bot.mention('Wofree_bot', (ctx) => {
//   ctx.reply('No usarás el nombre de Dios en vano, so mierda');
// })

// bot.phone('', (ctx) => {
//   ctx.reply('No usarás el nombre de Dios en vano, so mierda');
// })
//
// bot.hashtag('', (ctx) => {
//   ctx.reply('No usarás el nombre de Dios en vano, so mierda');
// })

// bot.on('text', (ctx) => {
//   ctx.reply('Escribes');
// })

//
// bot.on('gifs', (ctx) => {
//   ctx.reply('Los gifs los mandan los analfabetos y mongolos');
// })


bot.launch();
