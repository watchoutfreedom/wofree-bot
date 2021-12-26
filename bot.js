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



if(isProf)
{

  bot.on('text', (ctx) => {
    bot.telegram.sendMessage('-681528618', ctx.message.text);
  })

  isProf = false;

}


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

bot.command('/start', (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id, '<b>Hello</b>. <i>What do you understand better?😍</i>', languageObject)

})


bot.command(['/settings'], (ctx) => {

  ctx.telegram.sendMessage(ctx.chat.id, '<b>Hello</b>. <i>What do you understand better?😍</i>', languageObject)

})

bot.hears('hello', (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id, '<b>Hello</b>. <i>What do you understand better?😍</i>', languageObject)

})

bot.hears('hola', (ctx) => {


    ctx.telegram.sendMessage(ctx.chat.id, '<b>Hola</b>. <i>Qué entiendes mejor?😍</i>', languageObject)

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
        Markup.button.callback('Encargar una Charla', 'Encargar_charla'),
        Markup.button.callback('Solicitar un curso', 'Solicitar_curso'),
        Markup.button.callback('Solicitar una consultoría creativa', 'Solicitar_brainstorm'),
        Markup.button.callback('Solicitar un libro, obra u otro producto', 'Solicitar_producto'),
    ]),
}


bot.action('Espanol', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Perfecto, qué quieres </i>', optionsObject)
})

bot.action('Servicios', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i>OK! Gracias, selecciona qué servicio te interesa :</i>', servicesObject)
})

bot.action('Consulta', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'<i> Gracias por interesarte, qué te gustaría consultarnos? escríbela aquí y te responderemos lo antes posible</i>', {parse_mode: 'HTML'})
})

bot.action('Profesional', (ctx) => {
  isProf = true;
  ctx.telegram.sendMessage(ctx.chat.id,'<i>Perfecto, escribe en un mensaje por qué quieres unirte, tu nombre y medio de contacto y nos pondremos en contacto contigo, gracias :</i>', {parse_mode: 'HTML'})
})



///RESPUESTA A IDIOMA
///OPTIONS object
if (isProf)
{

  bot.on('text', (ctx) => {
    bot.telegram.sendMessage('-681528618', ctx.message.text);
  })

  isProf = false;
}

composer.on('message',ctx => {
  bot.telegram.sendMessage('-681528618', ctx.message.text).then()
})

bot.use(composer.middleware());

//send message to other chat
bot.command(['/sent'], (ctx) => {

  console.log(ctx.message);
  bot.telegram.sendMessage('-681528618', ctx.message.text);

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
