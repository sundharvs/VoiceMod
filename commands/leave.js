module.exports = (msg, args) => {
    if (msg.guild.me.voiceChannel) {
        msg.channel.send(`Now leaving ${msg.guild.me.voiceChannel.name}.`);
        msg.guild.me.voiceChannel.leave();
    } else {
        msg.channel.send("I'm not currently in a voice channel.");
    }
}

module.exports.help = {
    name: "leave",
    description: "Leave the connected voice channel."
}
