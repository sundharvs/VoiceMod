const Discord = require('discord.js');
const client = new Discord.Client();
const token = "";
channel = ""

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', msg => {

    // Exit the function if the message doesn't start with the prefix or if the message is from the bot
    if (!msg.content.startsWith(">") || msg.author.bot) return;
    
    const args = msg.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if(command == "join"){
        if(!args.length){ //check whether there are any arguments
            return msg.channel.send(`Please specify which voice channel I should moderate`);
        } else {
            channel = client.channels.find(channel => channel.name === args[0]);

                if (!channel) return msg.channel.send(`That channel doesn't exist silly`);

                channel.join().then(connection => {
                    msg.channel.send(`Joined channel ${args}`);
                }).catch(e => {
                    msg.channel.send("Error");
                });
        }
    }

    if(command == "leave"){
        if (typeof channel !== "") {
            channel.leave();
            channel = "";
            msg.channel.send("Goodbye!");
        } else {
            msg.channel.send("I'm not currently in a voice channel");
        }
    }
});

  client.login(token);