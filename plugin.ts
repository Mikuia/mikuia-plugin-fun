import * as cli from 'cli-color';

import {MikuiaClient} from '../mikuia-client/client';

var Mikuia = new MikuiaClient();
Mikuia.connect();

Mikuia.on('connected', () => {
	console.log('Connected.');
	Mikuia.identify('fun');
});

Mikuia.on('identified', () => {
	Mikuia.registerLocales();
	Mikuia.registerHandler('fun.roll', {
		anonymous: true,
		settings: {
			limit: {
				default: 100,
				type: 'number'
			},
			blockOverride: {
				default: false,
				type: 'boolean'
			}
		}
	})
});

Mikuia.on('event:handler:fun.roll', (event) => {
	var limit = event.settings.limit;

	if(event.tokens.length > 1 && !event.settings.blockOverride) {
		limit = event.tokens[1];
	}

	var roll = Math.floor(Math.random() * limit);

	Mikuia.respond(event, {
		message: 'You rolled ' + roll + '.'
	});
});