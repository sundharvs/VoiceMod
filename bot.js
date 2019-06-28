const Discord = require('discord.js');

const { prefix, token } = require('./config.json');
const commands = require("./commands.js");


const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    // the message must either
    //   - start with the prefix
    //   - or mention the bot TODO: add this
    // ignore messages sent by bots
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    // extract the command and arguments from the message
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift();

    // call the appropriate command if it exists
    if (commands.has(command)) {
        commands.get(command)(msg, args.join(' ').trimLeft());
    } else {
        msg.channel.send(`Invalid command. Use ${prefix}help to get a list of commands.`);
    }
});

client.login(token);
