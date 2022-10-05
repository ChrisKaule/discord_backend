// slash command - bot will post a message, (adds reactions) and collects all reactions by users
// on correct reaction the bot will reply with a message (recent offer)

const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const url = 'https://home-made.onrender.com/offers';
const settings = { method: 'Get' };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('offers')
		.setDescription('Replies with option for offers!'),
	async execute(interaction) {
		// send message
		const message = await interaction.reply({ content: 'Do you want to receive offers?', fetchReply: true });
		// add reactions
		message.react('👍').then(() => message.react('👎'));

		// filters for reactions
		const filter = (reaction) => {
			return ['👍'].includes(reaction.emoji.name);
			// return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		};

		// collect reactions
		message.awaitReactions({ filter, max: 1, time: 6000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					// if correct reaction get most recent offer
                    fetch(url, settings)
                    .then(res => res.json())
                    .then((json) => {
                        message.reply(`Here are the current offer: ${json[0].title}`);
                    });
				}
				else {
					message.reply('wrong reaction');
				}
			})
			.catch(collected => {
				message.reply(`Time ran out ${collected.size}`);
			});


		// different ways of collecting reactions
		// const filter = (reaction) => {
		// 	return reaction.emoji.name === '👍';
		// };

		// const collector = message.createReactionCollector({ filter, time: 10000 });

		// collector.on('collect', (reaction, user) => {
		// 	console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		// });

		// collector.on('end', collected => {
		// 	console.log(`Collected ${collected.size} items`);
		// });


		// const filter = (reaction) => {
		// 	return reaction.emoji.name === '👍';
		// };

		// message.awaitReactions({ filter, max: 4, time: 6000, errors: ['time'] })
		// 	.then(collected => console.log(collected.size))
		// 	.catch(collected => {
		// 		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
		// 	});
	},
};