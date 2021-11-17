const Os = require('os');
const { Command, flags } = require('@oclif/command');
const { TwitterApi } = require('twitter-api-v2');
const config = require(Os.homedir() + '/.tweet/config.json');


class TermTweetinCommand extends Command {
  static strict = false

  async run() {
    const {
      appKey,
      appSecret,
      accessToken,
      accessSecret
    } = config;

    const twitter = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret
    });
    const client = twitter.v2.readWrite;
    const { argv } = this.parse(TermTweetinCommand)
    let { data } = await client.post('tweets', {
      text: argv.join(' ')
    });
    if (data.text !== argv.join(' ')) {
      console.error("something went wrong: %s".JSON.stringify(data));
    }
  }
}

TermTweetinCommand.description = `Describe the command here
...
Extra documentation goes here
  `

TermTweetinCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
}

module.exports = TermTweetinCommand
