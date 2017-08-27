const config: any = require('../config.json');

export type BotConstants = {
	// ID
	assignmentChannelId: string;
	serverId: string;
	modChannelId: string;
	logChannelId: string;
	baseVoiceChannelIdOne: string;
	baseVoiceChannelIdTwo: string;

	// RegExp
	platformRegExp: RegExp;
	pcRegExp: RegExp;
	psRegExp: RegExp;
	xbRegExp: RegExp;

	// Embed color
	embedColor: string;
	muteEmbedColor: string;
	warnEmbedColor: string;
	banEmbedColor: string;
	kickEmbedColor: string;

	// Misc emoji
	spacerEmoji: string;
	// Platforms
	blizzEmjoi: string;
	psEmoji: string;
	xbEmoji: string;
	removeEmoji: string;
	// Spoiler Channel access
	D2Emoji: string;
	// Faction Wars
	DOEmoji: string;
	FWCEmoji: string;
	NMEmoji: string;

	serverInvite: string;

	channelNames: Array<string>;
};

// tslint:disable-next-line:variable-name
const Constants: BotConstants = <any> {};

// IDs
Constants.assignmentChannelId = config.ServerData.assignmentChannelId;
Constants.serverId = config.ServerData.serverId;
Constants.modChannelId = config.ServerData.modChannelId;
Constants.logChannelId = config.ServerData.logChannelId;
Constants.baseVoiceChannelIdOne = config.ServerData.baseVoiceChannelIdOne;
Constants.baseVoiceChannelIdTwo = config.ServerData.baseVoiceChannelIdTwo;

// RegExp
Constants.platformRegExp = new RegExp('(\\bpc\\b)|(\\bpsn\\b)|(\\bps\\b)|(\\bxbl\\b)|(\\bxb\\b)|(\\bxbox\\b)', 'i');
Constants.pcRegExp = new RegExp('([A-Za-z0-9\-\_\#]{3,16})', 'i');
Constants.psRegExp = new RegExp('([A-Za-z0-9\-\_]{3,16})', 'i');
Constants.xbRegExp = new RegExp('(?:.me\\sset\\sxb|.me\\sset\\sxbl|.me\\sset\\sxbox)\\s([A-Za-z0-9\-\_\\s]{1,15})', 'i');

// Embed color
Constants.embedColor = '0xFF8C00';
Constants.muteEmbedColor = '0xFFCC00';
Constants.warnEmbedColor = '0xFFEF00';
Constants.banEmbedColor = '0xE50000';
Constants.kickEmbedColor = '0x0083FF';

// Misc emoji, prod
Constants.spacerEmoji = '<:spacer:328352361569583105>';
// Platforms
Constants.blizzEmjoi = '<:blizz:328322843227979778>';
Constants.psEmoji = '<:ps:328322843198881792>';
Constants.xbEmoji = '<:xb:328322843798405133>';
// Spoiler Channel access
Constants.D2Emoji = '<:D2:336634217712582656>';
// Faction Wars emojis
Constants.DOEmoji = '<:do:247889245333618688>';
Constants.FWCEmoji = '<:fwc:247889245337944064>';
Constants.NMEmoji = '<:nm:247889245421699082>';

Constants.serverInvite = 'https://discord.gg/XDfY2bV';

Constants.channelNames = [ 'Sweeper Bot', 'Wei Ning', 'Mara Sov', 'Saint-14', 'Rasputin', 'Uldren Sov', 'Osiris', 'Eriana-3', 'Toland', 'Ana Bray', 'Dredgen Yor', 'Pahanin', 'Tevis', 'Xur', 'Cayde-6', 'Zavala', 'Ikora Rey', 'Kabr', 'Ghaul', 'Praedyth', 'Uldren', 'Vosik', 'Phogoth', 'Petra', 'Ascendant Raisins', 'Celery', 'Red Legion', 'Jolder', 'Rahool', 'Eris Morn', 'Ghost', 'Lord Shaxx', 'Kadi 55-30', 'Lord Saladin', 'The Speaker', 'Variks', 'Xander 99-40', 'Exo Stranger ', 'Charlemagne', 'Hawthorne', 'Cozmo-23', 'DeeJ', 'Ahamkara', 'Jaren Ward', 'Radegast', 'Timur', 'Gheleon', 'Efrideet', 'Brother Vance', 'Alak-Hul', 'Eris', 'Amanda Holliday', 'Dinklebot', 'Ralph the Chicken', 'The Traveler', 'Atheon', 'Crota', 'Oryx', 'Aksis', 'Skolas', 'Rahndel', 'Shiro-4', 'Hideo', 'Efrideet', 'Eva Levante', 'Lakshmi-2', 'Arach Jalaal' ];

export default Constants;
