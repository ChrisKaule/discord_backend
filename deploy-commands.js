// to run: node deploy-commands.js
// only need to run the deploy-commands.js once to deploy commands
// after that, you can comment out the code below and run index.js to run the bot

// add commands
// only need to run the deploy-commands.js once to deploy commands
// only run again if you make changes to the commands

// const { REST, SlashCommandBuilder, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
// const rest = new REST({ version: '10' }).setToken(token);

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
//     new SlashCommandBuilder().setName('links').setDescription('Replies with links!'),
//     new SlashCommandBuilder().setName('offers').setDescription('Replies with option for offers!'),
//     new SlashCommandBuilder().setName('news').setDescription('Replies with button for news!'),
//     new SlashCommandBuilder()
// 	.setName('echo')
// 	.setDescription('Replies with your input!')
// 	.addStringOption(option =>
// 		option.setName('input')
// 			.setDescription('The input to echo back')
// 			.setRequired(true)),
// ]
// 	.map(command => command.toJSON());

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
// 	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
// 	.catch(console.error);