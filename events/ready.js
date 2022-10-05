// executes when bot is ready
// posts a message to the console
// idea was to run cron job at bot start to check periodically for new offers and if so post them to channel

// const cron = require('cron');
// const fetch = require('node-fetch');
// const url = 'https://home-made.onrender.com/offers';
// const settings = { method: 'Get' };
// fetch(url, settings)
// 	.then(res => res.json())
// 	.then((json) => {
// 		// client.channel.send('Offers are ready!');
// 		// console.log(json);
// 	});

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Discord Bot is ready! Logged in as ${client.user.tag}`);

		// const scheduledMessage = new cron.CronJob('00 30 10 * * *', () => {
		// 	const guild = client.guilds.cache.get('id');
		// 	const channel = guild.channels.cache.get('id');
		// 	channel.send('You message');
		// });

		// scheduledMessage.start();

		// const CronJob = require('cron').CronJob;
		// const job = new CronJob(
		// 	'* * * * * *',
		// 	function() {
		// 		console.log('You will see this message every second');
		// 	},
		// 	null,
		// 	true,
		// 	'America/Los_Angeles',
		// );
	},
};