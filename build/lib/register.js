require('babel-register')(
	{
		"presets": [
				["env"]
		]
	}
)

var App = require('../factory.js').default

if(process.env.NODE_ENV === 'production') {
	App.compile();
} else if (process.env.NODE_ENV === 'development'){
	App.start();
} else {
	App.startup()
}
