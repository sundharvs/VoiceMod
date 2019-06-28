module.exports.run = async (client, msg) => {
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
                const audioStream = receiver.createOpusStream(user);    
                
            }
        });
    }).catch(e => {
        msg.channel.send(e);
    });
}

module.exports.help = {
    name: "record",
    description: "hello"
}
