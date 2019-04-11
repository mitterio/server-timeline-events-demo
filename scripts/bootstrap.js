const mitterAxiosClient = require('./../clients/mitter-axios-client')
const mitterClient = require('./../clients/mitter')
const bootstrapLockfileLocation = './.bootstrap.lock'
const touch = require('touch')
const fs = require('fs')
const uuid = require('uuid/v1')

const constants = require('./../internal/constants')

function createMitterUserProfileAttributes() {
	/*
    mitterAxiosClient.get('/v1/attribute-def/users')
        .then(x => console.log(x.data.filter(y => y.key.startsWith("my-app"))))
        .catch(e => console.error(e));
    */

	mitterAxiosClient
		.post('/v1/attribute-def/users', {
			key: constants.mitter.PasswordHashAttributeKey,
			canBeEmpty: true,
			allowedContentTypes: ['text/plaintext'],
			allowedContentEncodings: ['identity'],
			entityType: 'users',
		})
		.then(() =>
			console.log('User attribute for password hash created on user')
		)
		.catch((e) => console.error(e))
}

// if (!fs.existsSync(bootstrapLockfileLocation)) {
//     createMitterUserProfileAttributes();
//     touch(bootstrapLockfileLocation);
// }

function createUsers() {
	let userClient = mitterClient.clients().users()

	let createJohn = userClient.createUser({
		userId: '@john',
		userLocators: [],
		systemUser: false,
		screenName: {
			screenName: 'John Doe',
		},
	})

	let createAmy = userClient.createUser({
		userId: '@amy',
		userLocators: [],
		systemUser: false,
		screenName: {
			screenName: 'Amy',
		},
	})

	let createCandice = userClient.createUser({
		userId: '@candice',
		userLocators: [],
		systemUser: false,
		screenName: {
			screenName: 'Candice',
		},
	})

	Promise.all([createJohn, createAmy, createCandice])
		.then((results) => {
			createChannel()
		})
		.catch((err) => {
			createChannel()
		})
}

function createChannel() {
	mitterClient
		.clients()
		.channels()
		.newChannel({
			channelId: uuid(),
			defaultRuleSet: 'io.mitter.ruleset.chats.GroupChat',
			participation: [
				{
					participantId: '@john',
					participationStatus: 'Active',
				},
				{
					participantId: '@amy',
					participationStatus: 'Active',
				},
				{
					participantId: '@candice',
					participationStatus: 'Active',
				},
			],
			systemChannel: false,
		})
		.then((channel) => {
			console.log(`Channel ID: ${channel.identifier}`)
		})
		.catch((err) => console.log(err))
}

createUsers()
