// slash command - bot will post a button - which is used for the button event handler to post the most recent offer

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const row = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('primary')
		.setLabel('Subscribe')
		.setStyle(ButtonStyle.Primary),
);

const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Latest News')
			.setURL('https://homemadefood.netlify.app/')
			.setDescription('Subscribe to the latest news');

// trying emoji button instead of text button
// const button = new ButtonBuilder()
// 	.setCustomId('primary')
// 	.setLabel('Primary')
// 	.setStyle(ButtonStyle.Primary)
// 	.setEmoji('<1026976294048637001>');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('sign up for news'),
	async execute(interaction) {
		await interaction.reply({ content: 'News', ephemeral: false, embeds: [embed], components: [row], fetchReply: true });

	},
};