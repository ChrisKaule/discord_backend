const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile('index.html');
  });

app.listen(port, () => {
console.log(`App listening on port ${port}`);
});

// setup Discord client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
	],
});

// setup paths dynamically for commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


// setup paths dynamically for events and register event listeners
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
    else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// // dynamically execute commands
client.on('interactionCreate', async interaction => {
    // check if interaction is a command
	if (!interaction.isChatInputCommand()) return;

    // check if command exists in commands folder
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) return;

    // execute commands execute function
	try {
		// tell discord we are processing the command to get extra processing time
		// await interaction.deferReply();
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// trying to get list of all users in a guild
// const guild = client.guilds.cache.get(guildId);
// // Fetch and get the list named 'members'
// guild.members.fetch().then(members => {
// 		// Loop through every members
// 		members.forEach(member => {
// 			console.log(member);
// 		// Do whatever you want with the current member
// 		});
// 	});

// const channel = client.channels.cache.get('1024324567579246594');
// channel.send('content');

// old - Using discord slash commands here instead of with modules
// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isChatInputCommand()) return;
//     const { commandName } = interaction;
//     if (commandName === 'ping') {
//         await interaction.reply('Pong!'),
//         console.log('--command ping was used');
//     }
//     else if (commandName === 'server') {
//         await interaction.reply(
//             `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
//         ),
//             console.log('--command server was used');
//     }
//     else if (commandName === 'user') {
//         await interaction.reply(
//             `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
//         ),
//             console.log('--command user was used');
//     }
// });

// login with token - provided by config.json
client.login(token);
