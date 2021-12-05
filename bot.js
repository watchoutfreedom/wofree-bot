/** @type {typeof import('telegraf').Telegraf} */
const { Telegraf, Markup, Extra, WizardScene  } = require('telegraf');
const express = require('express');
const expressApp = express();
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN || '2118962917:AAF2yuqZkPqqOpj31rxj0-6gPKaBKqGrxVg';

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
const isQuestion = false;
const isConsult = false;
const isProf = false;
const isEnglish = false;


bot.start((ctx) => {

  console.log(ctx);
  ctx.reply('Welcome ' + ctx.from.first_name  );
  ctx.reply( `Bienvenido ${ ctx.from.first_name }.`  );

})

bot.help((ctx) => {
  ctx.reply('If ');

})

bot.settings((ctx) => {
  ctx.reply('Settings');
})


//SAY HELLO
bot.hears('hola', (ctx) => {

  ctx.reply(

    ` Ooops! Encantada de saludarte!

      Si eres una persona curiosa y/o profesional interesada en aportar y trabajar junto a un equipo con grandes ideales, pulsa o escribe /profesional.

      Si representas a una empresa o entidad con ganas de mejorar en conocimiento, innovación y tecnología y quieres acceder a nuestros servicios de consultoría pulsa o escribe /consulta

      Si tienes una duda general sólo pulsa o escribe /duda.
     `

  );

})

//WELCOME WITH COMMAND
bot.command('hola', (ctx) => {

  ctx.reply(

    `
      Ooops! Encantado de saludarte!

      Si eres una persona curiosa y/o profesional interesada en aportar y trabajar junto a un equipo con grandes ideales, pulsa o escribe /profesional.

      Si representas a una empresa o entidad con ganas de mejorar en conocimiento, innovación y tecnología y quieres acceder a nuestros servicios de consultoría pulsa o escribe /consulta
     `

  );

})


bot.command(['/duda'], (ctx) => {

  ctx.reply(

    `Me encantan las dudas! Escríbe tus dudas aquí abajo que en poco tiempo te responderán, yo me encargo de mandarlas:`
  );

})


bot.command(['/consulta', '/Consulta', '/CONSULTA'], (ctx) => {

  ctx.reply(

    ` Increíble! Gracias por interesarte, qué te gustaría consultarnos? Si se trata de un encargo pulsa /encargo, si es una duda escríbela y te responderemos lo antes posible :
    `
  );

})
//
bot.command(['/encargo'], (ctx) => {

  ctx.reply(

    ` Qué emoción! Y de qué es tu encargo? Escríbenos un mensaje con estos campos y te resonderemos lo antes posible:

      -Nombre
      -Descripción del encargo
      -Dirección y correo
      -Telefono y/o usuario Telegram
      -Es una consultoría creativa para un /diseño, /servicio o /producto, o un consultoría estratégica para /formación, /conferencias, /investigación o /similar?
      -Coste medio de tu aportación (por horas u otro tipo de medida. Si quieres ver el tipo de aportación más común en función de la consultoría haz click aquí)

    `
  );


})
//
//
bot.command(['/sent'], (ctx) => {

  console.log(ctx.message);
  bot.telegram.sendMessage('-681528618', ctx.message.text);

})

// bot.on('text', (ctx) => {
//   bot.telegram.sendMessage(ctx.message.chat.id, 'akdjd');
// })

bot.hears('hello', (ctx) => {
  ctx.replyWithMarkdownV2('<b>Hello</b>. <i>How are you today?</i>',
    Markup.inlineKeyboard([
      Markup.button.callback('Not bad', 'not bad'),
      Markup.button.callback('All right', 'all right')
    ]))
})

bot.action('not bad', (ctx) => {
  ctx.telegram.editMessageText('<i>Have a nice day 😊</i>')
})

bot.action('all right', (ctx) => {
  ctx.telegram.editMessageText('<i>May happiness be with you 🙏</i>')
})

if (isProf)
{

  bot.on('text', (ctx) => {
    bot.telegram.sendMessage('-681528618', ctx.message.text);
  })

  isProf = false;
}

bot.command(['/profesional'], (ctx) => {

  ctx.reply(

    ` Bienvenido/a al barco! Sólo haznos escribe un mensaje rellenando estos datos y te responderemos en cuanto podamos, gracias ! :

      -Nombre:
      -Breve descripción profesional de ti / CV :
      -Dirección y correo :
      -Telefono y/o usuario Telegram :
      -Campos de acción y/o conocimiento (Elige uno o varios : TECNOLOGÍA, DISEÑO, ACCIÓN POLÍTICA/SOCIAL, ARTE, CIENCIAS NATURALES Y EXACTAS, FIILOSOFIA, RELIGION, DERECHO, CIENCIAS SOCIALES ) :
      -Coste medio de tu aportación (por horas u otro tipo de medida. Si quieres ver el tipo de aportación más común en función de la consultoría haz click aquí) :

    `
  );

  isProf = true;

})

bot.hears(['imbécil', 'cabrón', 'Me cago en tus muertos', 'mamón', 'maricón', 'mamoncete', 'estúpido', 'tonto', 'karajote', 'Maricón', 'Imbécil', 'Imbecil', 'Hijo de puta', 'mongolo', 'MONGOLO', 'MAMON'], (ctx) => {
  ctx.reply('Cuidado con el lenguaje');
})

bot.mention('salrodgom', (ctx) => {
  ctx.reply('Menudo hijo de puta');
})

bot.mention('amiguet', (ctx) => {
  ctx.reply('Ahora viene');
})

bot.mention('Wofree_bot', (ctx) => {
  ctx.reply('No usarás el nombre de Dios en vano, so mierda');
})

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


bot.on('gifs', (ctx) => {
  ctx.reply('Los gifs los mandan los analfabetos y mongolos');
})


bot.launch();
