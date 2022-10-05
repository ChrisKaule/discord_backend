// to create custom commands for users to use, checking messages starting with the prefix !
module.exports = {
	name: 'messageCreate',
	execute(interaction) {
        // console.log(interaction);
        // console.log(interaction.content);
        if (interaction.author.bot) return;

        if (interaction.content.charAt(0) === '!') {
            console.log(`user command with: ${interaction.content}`);
        }
	},
};