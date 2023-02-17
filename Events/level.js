const { Client, EmbedBuilder } = require("discord.js");
const User = require("../../Schemas/User.js");
const cooldown = new Set();
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message, client) {
    //rank
    const guildId = message.guild.id;
    const userId = message.author.id;

    if (message.author.bot || !message.guild) return;
    // if (cooldown.has(userId)) return;

    let user;

    try {
      const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);

      user = await User.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: { xp: xpAmount },
        },
        { upsert: true, new: true }
      );

      let { xp, level } = user;

      if (xp >= level * 100) {
        ++level;
        xp = 0;

        await User.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        );
        const ChannelId = client.channels.cache.get("1072871913493373088");
        if (!ChannelId) return;
        const levelup = new EmbedBuilder()
          .setTitle("GG!")
          .setDescription(`:tada: <@${userId}>, you are now level ${level}`)
          .setFooter({ text: "Keep Chatting" })
          .setColor("Random");
        ChannelId.send({ embeds: [levelup] });

        const lvl5 = await message.guild.roles.cache.get("1076197325120229508");
        const lvl10 = await message.guild.roles.cache.get(
          "1076197442292289586"
        );
        const lvl15 = await message.guild.roles.cache.get(
          "1076197586161123439"
        );
        const lvl20 = await message.guild.roles.cache.get(
          "1076197503944368248"
        );
        const lvl30 = await message.guild.roles.cache.get(
          "1076197763844427816"
        );
        const lvl40 = await message.guild.roles.cache.get(
          "1076197799055589396"
        );
        const lvl50 = await message.guild.roles.cache.get(
          "1076197835806093443"
        );
        const lvl60 = await message.guild.roles.cache.get(
          "1076197872401399998"
        );
        const lvl70 = await message.guild.roles.cache.get(
          "1076197898376712383"
        );
        const lvl80 = await message.guild.roles.cache.get(
          "1076197933722108035"
        );
        const lvl90 = await message.guild.roles.cache.get(
          "1076197978131419216"
        );
        const lvl100 = await message.guild.roles.cache.get(
          "1076198017574645790"
        );
        switch (level) {
          case 5:
            await message.member.roles.add(lvl5);
            break;
          case 10:
            await message.member.roles.add(lvl10);
            break;
          case 15:
            await message.member.roles.add(lvl15);
            break;
          case 20:
            await message.member.roles.add(lvl20);
            break;
          case 30:
            await message.member.roles.add(lvl30);
            break;
          case 40:
            await message.member.roles.add(lvl40);
            break;
          case 50:
            await message.member.roles.add(lvl50);
            break;
          case 60:
            await message.member.roles.add(lvl60);
            break;
          case 70:
            await message.member.roles.add(lvl70);
            break;
          case 80:
            await message.member.roles.add(lvl80);
            break;
          case 90:
            await message.member.roles.add(lvl90);
            break;
          case 100:
            await message.member.roles.add(lvl100);
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 60 * 1000);
}
}
