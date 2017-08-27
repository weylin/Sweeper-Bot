import { Client, ListenerUtil } from 'yamdbf';
import { TextChannel, RichEmbed, Message, Guild, GuildMember, VoiceChannel } from 'discord.js';
import { Events } from './listeners/Events';
import { RoleManager } from './assignment/RoleManager';
import { ModLoader } from '../lib/mod/ModLoader';
import VoiceChannelManager from './voice/VoiceChannelManager';
import Database from '../../database/Database';

const { dmManager } = require('yamdbf-dm-manager');
const config: any = require('../../config.json');
const credentials: any = require('../../database.json');
const { once } = ListenerUtil;

export class SweeperClient extends Client {
	// properties
	public config: any;
	public events: any;
	public roleManager: RoleManager;
	public database: Database;
	public mod: ModLoader;
	public voiceChannelManager: VoiceChannelManager;

	// constructor
	public constructor() {
		super({
			token: config.token,
			owner: config.owner,
			statusText: config.status,
			unknownCommandError: false,
			commandsDir: __dirname + '/../../commands',
			disableBase: [
				'clearlimit',
				'disablegroup',
				'enablegroup',
				'eval',
				'eval:ts',
				'limit',
				'listgroups',
				'ping',
				'reload'
			],
			readyText: 'Ready\u0007',
			ratelimit: '10/1m',
			pause: true,
			plugins: [dmManager(config.ServerData.botDMServerId)]
		});

		this.config = config;
		this.events = new Events(this);
		this.roleManager = new RoleManager(this);
		this.database = new Database(credentials);
		this.mod = new ModLoader(this);
		this.voiceChannelManager = new VoiceChannelManager(this);
	}

	@once('pause')
	private async _onPause(): Promise<void> {
		await this.setDefaultSetting('prefix', '.');
		this.emit('continue');
	}

	@once('clientReady')
	private async _onClientReady(): Promise<void>
	{
		await this.mod.init();
		await this.roleManager.init();
		await this.voiceChannelManager.init();
	}

	@once('disconnect')
	private async _onDisconnect(): Promise<void> {
		process.exit(100);
	}
}
