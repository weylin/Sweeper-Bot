import { Collection, Guild, GuildChannel, GuildMember, VoiceChannel } from 'discord.js';
import { GuildStorage, ListenerUtil, Logger, logger } from 'yamdbf';
import { SweeperClient } from '../SweeperClient';
import Constants from '../../Constants';
import * as Schedule from 'node-schedule';

export default class VoiceChannelManager {
	@logger
	private readonly logger: Logger;

	private client: SweeperClient;

	public constructor(client: SweeperClient) {
		this.client = client;
	}

	public async init(): Promise<void> {
		let _this: VoiceChannelManager = this;
		const guild: Guild = <Guild> this.client.guilds.get(Constants.serverId);

		this.logger.log('VoiceChannelManager', `Curation Task Started.`);
		await Schedule.scheduleJob('*/1 * * * *', async function() {
			await _this.curateChannels(guild);
		});
	}

	public async curateChannels(guild: Guild): Promise<void> {
		let emptyChannels: Array<VoiceChannel> = this.getEmptyChannels(guild).map((channel: VoiceChannel) => { return channel; });

		let channelsToDelete: number = emptyChannels.length - 1;
		let zavalaHasUsers: boolean = ((guild.channels.find('id', Constants.baseVoiceChannelIdOne) as VoiceChannel).members.size > 0) ? true : false;
		let ikoraHasUsers: boolean = ((guild.channels.find('id', Constants.baseVoiceChannelIdTwo) as VoiceChannel).members.size > 0) ? true : false;

		for (let x: number = 0; x <= channelsToDelete; x++) {
			if ((!zavalaHasUsers && ikoraHasUsers) || (zavalaHasUsers && !ikoraHasUsers) || (!zavalaHasUsers && !ikoraHasUsers))
				{
					emptyChannels[x].delete();
					this.logger.log('VoiceChannelManager', `Deleted Voice Channel: ${emptyChannels[x].name}.`);
				}
		}
	}

	public async createChannel(member: GuildMember): Promise<void> {
		let baseChannelOne: VoiceChannel = member.guild.channels.find('id', Constants.baseVoiceChannelIdOne) as VoiceChannel;
		let baseChannelTwo: VoiceChannel = member.guild.channels.find('id', Constants.baseVoiceChannelIdTwo) as VoiceChannel;
		let channelName: string = this.getChannelName();
		let currentChannelNames: Array<string> = this.getCurrentChannelNames(member.guild);
		let position: number = this.getUsedChannelsCount(member.guild) + 1;

		do { channelName = this.getChannelName(); }
		while (currentChannelNames.indexOf(channelName) !== -1);

		let newChannel: VoiceChannel = await baseChannelOne.clone(channelName, true, true) as VoiceChannel;

		await newChannel.setPosition(position);
		await newChannel.setUserLimit(6);
		this.logger.log('VoiceChannelManager', `Created Voice Channel: ${newChannel.name}.`);
	}

	public getChannelCount(guild: Guild): number {
		return guild.channels.filter((channel: VoiceChannel, key: string, collection: Collection<string, VoiceChannel>) => {
			return (channel.type === 'voice' && channel.name.startsWith('Fireteam ')) ? true : false;
		}).size;
	}

	public getEmptyChannels(guild: Guild): Collection<string, GuildChannel> {
		return guild.channels.filter((channel: VoiceChannel, key: string, collection: Collection<string, VoiceChannel>) => {
			return ((channel.type === 'voice' && channel.name.startsWith('Fireteam ')) && channel.members.size === 0 && (channel.id !== Constants.baseVoiceChannelIdOne && channel.id !== Constants.baseVoiceChannelIdTwo)) ? true : false;
		});
	}

	public getUsedChannels(guild: Guild): Collection<string, GuildChannel> {
		return guild.channels.filter((channel: VoiceChannel, key: string, collection: Collection<string, VoiceChannel>) => {
			return ((channel.type === 'voice' && channel.name.startsWith('Fireteam ')) && channel.members.size !== 0) ? true : false;
		});
	}

	public getUsedChannelsCount(guild: Guild): number {
		return guild.channels.filter((channel: VoiceChannel, key: string, collection: Collection<string, VoiceChannel>) => {
			return ((channel.type === 'voice' && channel.name.startsWith('Fireteam ')) && channel.members.size !== 0) ? true : false;
		}).size;
	}

	public getEmptyChannelCount(guild: Guild): number {
		return guild.channels.filter((channel: VoiceChannel, key: string, collection: Collection<string, VoiceChannel>) => {
			return ((channel.type === 'voice' && channel.name.startsWith('Fireteam ')) && channel.members.size === 0) ? true : false;
		}).size;
	}

	public getCurrentChannels(guild: Guild): Collection<string, GuildChannel> {
		return guild.channels.filter((channel: GuildChannel, key: string, collection: Collection<string, GuildChannel>) => {
			return (channel.type === 'voice' && channel.name.startsWith('Fireteam ')) ? true : false;
		});
	}

	public getCurrentChannelNames(guild: Guild): Array<string> {
		let voiceChannels: Collection<string, GuildChannel> = guild.channels.filter((channel: GuildChannel, key: string, collection: Collection<string, GuildChannel>) => {
			return (channel.type === 'voice' && channel.name.startsWith('Fireteam ')) ? true : false;
		});

		return voiceChannels.map((channel: GuildChannel) => channel.name);
	}

	public getChannelName(): string {
		return 'Fireteam ' + Constants.channelNames[Math.floor(Math.random() * Constants.channelNames.length)];
	}
}
