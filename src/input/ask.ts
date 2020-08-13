import {Client, TextChannel, GuildMember, Message} from 'discord.js';

export default function ask(bot: Client, channel: TextChannel, member: GuildMember, del: boolean, callback: askcallback) {
    let listener = (msg: Message) => {
        if(msg.member && msg.member.id === member.id && msg.channel.id === channel.id) {
            if(del) {
                setTimeout(() => {
                    msg.delete();
                }, 50);
                callback(msg, retry, (del, cb) => ask(bot, channel, member, del, cb));
                bot.removeListener("message", listener);
            }
        }

        function retry() {
            bot.addListener("message", listener);
        }
        bot.addListener("message", listener);
    }
}


declare type askagain = (del: boolean, cb: () => askcallback) => void;
declare type askcallback = (msg: Message, retry: () => void, askagain: askagain) => void;
