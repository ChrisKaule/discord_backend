// slash command - bot will post a message, (adds reactions) and collects all reactions by users
// on correct reaction the bot will assign a role to the user (role "new offers" to access "new offers" channel)
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('offers')
		.setDescription('Replies with option for offers!'),
	async execute(interaction) {
		// send message
		const message = await interaction.reply({ content: '**If you want to receive the most recent offers react with 👍**', fetchReply: true });

		// add reactions
		message.react('👍');

		// filter for correct reactions
		const filter = (reaction, user) => {
			return reaction.emoji.name === '👍' && user.bot === false;
		};

		// collect reactions
		const collector = message.createReactionCollector({ filter, time: 6000000, dispose: true });
		// role to be assigned
		const roleId = '1027526198793867354';

		collector.on('collect', (reaction, user) => {
			// output when reaction is collected
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

			// assign role to user
			if (!interaction.member.roles.cache.has(roleId)) {
				interaction.member.roles.add(roleId).then(console.log('Role added!'));
				message.reply(`Thank you ${user.username} for subscribing to our offers!`);
			}
			else {
				console.log('Role already assigned!');
			}
		});

		// on reaction removal
		collector.on('remove', (reaction, user) => {
			// output when reaction is removed
			console.log(`${user.username} removed the reaction ${reaction.emoji.name}`);

			// remove role from user
			if (interaction.member.roles.cache.has(roleId)) {
				interaction.member.roles.remove(roleId).then(console.log('Role removed!'));
			}
		});

		// on collector end - time ran out
		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});
	},
};