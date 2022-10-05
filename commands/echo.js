// slash command - this command has options enabled to transmit an input. The input is then echoed.

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
                async execute(interaction) {
                    // access possible command options
                    const string = interaction.options.getString('input');
                    // const boolean = interaction.options.getBoolean('bool');
                    // const user = interaction.options.getUser('target');
                    // const member = interaction.options.getMember('target');
                    // const channel = interaction.options.getChannel('destination');
                    // const role = interaction.options.getRole('role');
                    // const integer = interaction.options.getInteger('int');
                    // const number = interaction.options.getNumber('num');
                    // const mentionable = interaction.options.getMentionable('mentionable');
                    // const attachment = interaction.options.getAttachment('attachment');
                    await interaction.reply(
                        `You said: ${string}`,
                    );
                },
};