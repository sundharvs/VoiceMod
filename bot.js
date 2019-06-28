const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NDI2NzUyNjc2NTc2MTAwMzUz.XRV62g.YesL9zcDhyOboNoa_W6AL8qzyFM";
channel = null

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
            if(msg.member.voiceChannel){
                channel = msg.member.voiceChannel
                channel.join()
                .then(connection => { // Connection is an instance of VoiceConnection
                    msg.reply(`Joined channel ${msg.member.voiceChannel.name}`);
                })
                .catch(e => {
                    msg.channel.send(e);
                });
            } else {
                return msg.channel.send(`Please specify which voice channel I should moderate`);
            }
        } else {
            channel = client.channels.find(channel => channel.name === args[0]);

                if (!channel) return msg.channel.send(`That channel doesn't exist silly`);

                channel.join().then(connection => {
                    msg.channel.send(`Joined channel ${args}`);
                }).catch(e => {
                    msg.channel.send(e);
                });
        }
    }

    if(command == "leave"){
        if (typeof channel !== null) {
            channel.leave();
            channel = "";
            msg.channel.send("Goodbye!");
        } else {
            msg.channel.send("I'm not currently in a voice channel");
        }
    }
});

  client.login(token);