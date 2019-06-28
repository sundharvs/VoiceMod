const Discord = require('discord.js');

const { prefix, token, perspectiveAPIkey } = require('./config.json');
const commands = require("./commands.js");

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: `${perspectiveAPIkey}`});

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const result = await perspective.analyze(msg.content, {attributes: ['toxicity', 'spam']});
  console.log(JSON.stringify(result, null, 2));
});

client.login(token);
