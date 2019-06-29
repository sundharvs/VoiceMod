const join = require('./commands/join.js');
const leave = require('./commands/leave.js');


const commands = [
    help,
    join,
    leave,
];

function help(msg, args) {
    msg.channel.send({
        embed: {
            title: 'VoiceMod',
            description: 'A moderation tool for voice channels.',
            fields: [{
                name: 'Commands:',
                value: commands.map(command => `**${command.help.name}**\n${command.help.description}`).join('\n')
            }]
        }
    });
}

help.help = {
    name: 'help',
    description: 'This command. Lists every command along with their descriptions.'
};

module.exports = (() => {
    const map = new Map();

    commands.forEach(command => map.set(command.help.name, command));

    return map;
})();
