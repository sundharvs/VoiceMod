const { perspectiveAPIkey } = require('../config.json');

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: `${perspectiveAPIkey}`});

module.exports = async text => {
  const result = await perspective.analyze(text);
  console.log(JSON.stringify(result, null, 2));
}

module.exports.help = {
    name: "analysis",
    description: "Uses the Perspective API to estimate the toxicity of a message."
}
