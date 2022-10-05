// slash command - bot will post a link and add reaction to it

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Replies with links'),
	async execute(interaction) {
		// simple but doesnt enssure reactions are in the correct order
		// interaction.reply('https://homemadefood.netlify.app');
		// const message = await interaction.fetchReply();
		// message.react('🍎');
		// message.react('🍊');
		// message.react('🍇');

		const message = await interaction.reply({ content: 'Visit us! https://homemadefood.netlify.app', fetchReply: true });

		// keep reacting in the correct order - then
		message.react('🍎')
			.then(() => message.react('🍊'))
			.then(() => message.react('🍇'))
			.catch(error => console.error('One of the emojis failed to react:', error));

		// keep reacting in the correct order - try/catch
		try {
			await message.react('🍎');
			await message.react('🍊');
			await message.react('🍇');
		}
		catch (error) {
			console.error('One of the emojis failed to react:', error);
		}
	},
};