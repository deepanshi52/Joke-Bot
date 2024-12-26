
const TelegramBot = require('node-telegram-bot-api');
const dotenv=require('dotenv');
const axios = require('axios');
//load environment variables from
dotenv.config();


// TOKEN fetched by using @BotFather to create a new bot
const TOKEN = process.env.BOT_TOKEN;
console.log(process.env.BOT_TOKEN);

//Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, {polling: true});

//listen for any messages and respond 
bot.on('message', (msg) => {
      const text = msg.text;
      console.log("Message recieved: ", text);

      bot.sendMessage(msg.chat.id, "You said: " + text);
      
})

bot.onText(/\/start/, (msg) =>{
      bot.sendMessage(msg.chat.id, "Hello! I am a bot, how can i help you?");
})

bot.onText(/\/joke/, async(msg) =>{
      const joke = await axios.get('https://official-joke-api.appspot.com/random_joke')

      const setup = joke.data.setup;
      const punchline = joke.data.punchline;

      bot.sendMessage(msg.chat.id, setup + " " + punchline);
})