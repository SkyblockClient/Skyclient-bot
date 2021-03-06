import { BotCommand } from '../extensions/BotCommand'
import utils from '../functions/utils'
import got from 'got/dist/source'
import { MessageReaction } from 'discord.js'
import fs from 'fs'

export default class letmegooglethat extends BotCommand {
	constructor() {
		super('crash', {
			slash: true,
			args: [{ id: 'alias', type: 'string', match: 'restContent' }],
			aliases: ['crash'],
			description: 'show a crash',
			slashOptions: [
				{
					name: 'alias',
					description: 'the crash alias',
					type: 'STRING',
					required: true,
				},
			],
		})
	}

	async exec(message, args) {
		const fixes = this.client.fixes.all()
		let reply = 'no crash with the name "' + args.alias + '" found'

		const gameroot = '.minecraft'
		const pathindicator = '`'
		let profileroot = '.minecraft'
		if (message.guildId == '780181693100982273') {
			profileroot = '.minecraft/skyclient'
		}

		for (const fix of fixes.fixes) {
			if (fix.name && fix.name == args.alias) {
				reply = fix.fix.replaceAll('%pathindicator%', pathindicator).replaceAll('%gameroot%', gameroot).replaceAll('%profileroot%', profileroot)
				break
			}
		}

		if (message.type == 'REPLY') {
			if (message.channel.type == 'GUILD_TEXT') {
				const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)
				repliedMessage.reply(reply)
			}
		} else {
			message.reply(reply)
		}
	}
}
