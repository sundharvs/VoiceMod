const join = require('./commands/join.js');
const leave = require('./commands/leave.js');
const record = require('./commands/record.js');


const commands = [
    help,
    join,
    leave,
    record
];

function help(msg, args) {
    msg.channel.send({embed: {
        title: "VoiceMod",
        description: "A moderation tool for voice channels.",
        color: 0x3498DB,
        timestamp: new Date().toISOString(),
        fields: commands.map(command => ({
            name: command.help.name,
            value: command.help.description
        }))
    }});
}

help.help = {
    name: "help",
    description: "This command. Lists every command along with their descriptions."
};

module.exports = (() => {
    const map = new Map();

    commands.forEach(command => map.set(command.help.name, command));

    return map;
})();
