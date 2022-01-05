const { default: axios } = require('axios');

async function test() {
	try {
		const { data } = await axios.post(
			'https://aby5gwn2bi.execute-api.us-west-2.amazonaws.com/dev/login',
			{ id: 'acehong1021', password: 'test' }
		);
		console.log('data!!');
		console.log(data);
	} catch (e) {
		console.log(e);
	}
}

test();
