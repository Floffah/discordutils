# discordutils
Utility stuff for Discord.JS bots.

## Stuff

### Ask

`ask(bot: Client, channel: TextChannel, member: GuildMember, del: boolean, callback: askcallback = (msg: Message, retry: () => void, askagain: askagain = (del: boolean, cb: () => askcallback) => void) => void) => void`

Example:
```js
const dutils = require('discordutils');
const Discord = require('discord.js');

let bot = new Discord.Client();

bot.on("message", (msg) => {
    if(msg.content.startsWith("!ask")) {
        dutils.ask(bot, msg.channel, msg.member, true, (msg, retry, askagain) => {
            if(msg.content.toLowerCase() === "yes") {
                askagain(true, (msg, retry, askagain) => {
                    if(msg.content === "pingu") {
                        msg.reply("noot noot")
                    }
                });
            } else if(msg.content.toLowerCase() === "no") {
                msg.channel.send("ok then");
            } else {
                msg.channel.send("welp");
                retry();   
            }
        });
    }
});

bot.login("token");
```
