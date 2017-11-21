import * as cli from 'cli-color';

import {MikuiaClient} from '../mikuia-client/client'

var Mikuia = new MikuiaClient('tcp://127.0.0.1', [3000, 3001]);
Mikuia.connect();

Mikuia.on('connected', () => {
    console.log('Connected.');
    Mikuia.identify('fun');
});

Mikuia.on('identified', () => {
    Mikuia.registerHandler('fun.roll', {
        description: 'Rolls a dice.',
        anonymous: true,
        settings: {
            limit: {
                name: 'Limit',
                description: 'Maximum number that can be rolled.',
                default: 100,
                type: 'number'
            },
            blockOverride: {
                name: 'Block Overriding',
                description: 'Don\'t let users provide their own roll limit.',
                default: false,
                type: 'boolean'
            }
        }
    })
});

Mikuia.on('event:handler:fun.roll', (event) => {
    Mikuia.respond(event, {
        message: 'Hi!'
    });
})