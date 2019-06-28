const SpeechToText = require('ibm-watson/speech-to-text/v1');
const ffmpeg = require('fluent-ffmpeg');

const speechToText = new SpeechToText({
    iam_apikey: 'QaqgjiFf_GvC_sG0zeQo-hcXy11GSIsH4fVtQPSOpAXP',
    url: 'https://gateway-wdc.watsonplatform.net/speech-to-text/api'
});

module.exports.run = async (channel) => {
    channel.join()
    .then(connection => {
        const receiver = connection.createReceiver();

        connection.on('speaking', (user, speaking) => {
            // Creates a readable stream for a user 
            // that provides opus data while the user is speaking.
            // When the user stops speaking, the stream is destroyed.
            // is this if statement necessary? createOpusStream handles it thugh ^^
            if (speaking) {
                console.log(`I'm listening to ${user}`);
                var  audioStream = receiver.createPCMStream(user);
                var convertedStream = ffmpeg(audioStream).format("ogg");
                const recognizeParams = {
                    audio: convertedStream,
                    content_type: 'audio/ogg',
                  };

                console.log(speechToText.recognize(recognizeParams))
            }
        });
    }).catch(e => {
        console.log(e);
    });
}

module.exports.help = {
    name: "record",
    description: "hello"
}