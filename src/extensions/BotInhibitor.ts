import { Inhibitor } from 'discord-akairo'
import { BotClient } from './SkyClient'

export class BotInhibitor extends Inhibitor {
	public client = super.client as BotClient
}
