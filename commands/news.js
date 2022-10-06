// slash command - bot will post a button - which is used for the button event handler to post the most recent offer

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const row = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('primary')
		.setLabel('Post Offer')
		.setStyle(ButtonStyle.Primary),
);

const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Latest Offer')
			.setURL('https://homemadefood.netlify.app/')
			.setDescription('Get the latest offer from HomeMadeFood');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('sign up for news'),
	async execute(interaction) {
		await interaction.reply({ content: ' ', ephemeral: false, embeds: [embed], components: [row], fetchReply: true });

	},
};