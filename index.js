const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
let { token } = require('./config.json');

const client = new TelegramBot(token, {polling: true});

module.exports = client;

client.commands = new Map();

fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
})

client.onText(/^\/(\w+)(?:@[\w-]+)?(?:\s+(.*))?$/, async (msg, match) => {
  const [, commandName, args] = match;
  const chat = msg.chat.id;
  const command = client.commands.get(commandName);

  if (!command) return;

  msg.args = args ? args.split(/\s+/) : [];
  
  await command.execute(client, msg, chat);
});

console.log('online');