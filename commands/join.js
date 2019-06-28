const record = require("./record.js");

function joinChannel(channel) {
    record.run(channel);

    //TODO: call record()
    // TODO: fill this in
}

module.exports = (msg, args) => {
    if (args.length) { 
        // user specified a channel
        // attempt to join that channel

        if (!msg.guild) {
            // handle direct messages
            msg.channel.send("You must be in a server!")
            return;
        }

        const channel = msg.guild.channels.find(channel => channel.name === args && channel.type === "voice");

        if (!channel) {
            msg.channel.send("You must specify an existing voice channel.");
            return;
        }

        joinChannel(channel);
        msg.channel.send(`Joined voice channel ${channel.name}.`);
    } else {
        // user did not specify a channel
        // if the user is in a channel, join it
        
        if (!msg.member) {
            // handle direct messages
            msg.channel.send("You must be in a server!")
            return;
        }

        if (!msg.member.voiceChannel) {
            // use
            msg.channel.send(`Please join a voice channel or specify which one to join.`);
            return;
        }

        joinChannel(msg.member.voiceChannel);
        msg.channel.send(`Joined voice channel ${msg.member.voiceChannel.name}.`);
    }
}

module.exports.help = {
    name: "join",
    description: "Joins a voice channel. Either specify which channel to join or be in a voice channel."
}
