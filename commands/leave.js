module.exports = (msg) => {
    const channel = msg.guild.me.voiceChannel;
    
    if (channel) {
        channel.leave();
        msg.channel.send(`Now leaving ${channel.name}. Goodbye!`);
    } else {
        msg.channel.send("I'm not currently in a voice channel.");
    }
}

module.exports.help = {
    name: "leave",
    description: "leave the channel."
}
