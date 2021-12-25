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


if(isProf)
{

  bot.on('text', (ctx) => {
    bot.telegram.sendMessage('-681528618', ctx.message.text);
  })

  isProf = false;

}

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
