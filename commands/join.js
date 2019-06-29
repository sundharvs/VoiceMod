const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const ffmpeg = require('fluent-ffmpeg');

const speechToText = new SpeechToTextV1({
    iam_apikey: 'QaqgjiFf_GvC_sG0zeQo-hcXy11GSIsH4fVtQPSOpAXP',
    url: 'https://gateway-wdc.watsonplatform.net/speech-to-text/api'
});

async function joinChannel(channel, text) {
    const connection = await channel.join();
    const receiver = connection.createReceiver();

    connection.playFile('smw_power-up.wav'); // ???

    let stream;

    connection.on('speaking', (user, speaking) => {
        if (speaking) {
            stream = ffmpeg(receiver.createPCMStream(user)).fromFormat("s32le").toFormat("wav").pipe();
        } else { // does this have to be in else
            stream.pipe(speechToText.recognizeUsingWebSocket({objectMode: true, profanity_filter: false}).on('data', data => {
                const result = data.results.map(result => result.alternatives.map(alternative => alternative.transcript).join(' ')).join(' ')
                if (result) {
                    text.send(result);
                }
            }));
        }
    });
}

module.exports = (msg, args) => {
    if (args.length) { 
        // user specified a channel
        // attempt to join that channel

        // handle direct messages
        if (!msg.guild) {
            msg.channel.send("You must be in a server!")
            return;
        }

        const channel = msg.guild.channels.find(channel => channel.name === args && channel.type === "voice");

        if (!channel) {
            msg.channel.send("You must specify an existing voice channel.");
            return;
        }

        joinChannel(channel, msg.channel);
        msg.channel.send(`Joined voice channel \`${channel.name}\`.`);
        msg.guild.me.user.setActivity(channel.name, { type: 'LISTENING' })
    } else {
        // user did not specify a channel
        // if the user is in a channel, join it
        
        // handle direct messages
        if (!msg.member) {
            msg.channel.send("You must be in a server!")
            return;
        }

        if (!msg.member.voiceChannel) {
            msg.channel.send(`Please join a voice channel or specify which one to join.`);
            return;
        }

        joinChannel(msg.member.voiceChannel, msg.channel);
        msg.channel.send(`Joined voice channel \`${msg.member.voiceChannel.name}\`.`);
    }
}

module.exports.help = {
    name: "join",
    description: "Joins a voice channel. Either specify which channel to join or be in a voice channel."
}
