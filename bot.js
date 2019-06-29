const Discord = require('discord.js');

const { prefix, token } = require('./config.json');
const commands = require("./commands.js");


const client = new Discord.Client();

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    // ignore messages sent by bots
    if (msg.author.bot) {
        return;
    }

    let content;

    // the message must either
    //   - start with the prefix
    //   - or mention the bot TODO: add this
    if (msg.content.startsWith(prefix)) {
        content = msg.content.slice(prefix.length);
    } else if (msg.content.startsWith(client.user.toString())) {
        content = msg.content.slice(client.user.toString().length);
    } else {
        return;
    }

    // extract the command and arguments from the message
    const args = content.trim().split(' ');
    const command = args.shift();

    // call the appropriate command if it exists
    if (commands.has(command)) {
        commands.get(command)(msg, args.join(' ').trimLeft());
    } else {
        msg.channel.send(`Invalid command. Use \`${prefix}help\` to get a list of commands.`);
    }
});

client.login(token);
