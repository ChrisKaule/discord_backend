// event handler to handle interaction events
// Either a message or a button interaction
// On button interaction the bot will post the most recent offer from https://home-made.onrender.com/offers
// Using a slash command will trigger a console output about the command

const fetch = require('node-fetch');
const url = 'https://home-made.onrender.com/offers';
const settings = { method: 'Get' };
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isButton()) {
			// log who clicked the button and where
			console.log(`${interaction.user.tag} with id ${interaction.user.id} in #${interaction.channel.name} pressed button subscribe`);
			// can also send to channel
			// interaction.channel.send(`${interaction.user.tag} with id ${interaction.user.id} in #${interaction.channel.name} pressed button subscribe`);

			// fetch the most recent offer from https://home-made.onrender.com/offers to post them	to the channel
			fetch(url, settings)
				.then(res => res.json())
				.then((json) => {
					// create embedded message and formatting
					const offerEmbed = new EmbedBuilder()
						.setColor(0x51C8BC)
						.setTitle(json[0].title)
						.setURL('https://homemadefood.netlify.app/')
						.setAuthor({ name: json[0].creatorId.userName, iconURL: json[0].creatorId.profilePic, url: 'https://homemadefood.netlify.app/' })
						.setDescription(json[0].description)
						.setThumbnail(json[0].image)
						.addFields(
							{ name: 'Specials', value: json[0].specials[0] },
							{ name: '\u200B', value: '\u200B' },
							{ name: 'Address', value: json[0].address, inline: true },
							{ name: 'Price', value: String(json[0].price) + ' $', inline: true },
						)
						// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
						.setImage(json[0].image)
						.setTimestamp();
						// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

					interaction.channel.send({ embeds: [offerEmbed] });

					// interaction.channel.send(`Here is the current offer: ${json[0].title}`, { files: [json[0].image] });
				});
		}
		else if (interaction.isCommand()) {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered the command: ${interaction.commandName}`);
		}
	},
};