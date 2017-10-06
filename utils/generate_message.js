var moment = require('moment')

var generate_message = (from,text) => {
	return {from,
	text,
	createdAt: moment().valueOf()
}
}

var generate_location_message = (from,latitude,longitude) => {
	return {
	from,
	url:`https://www.google.com/maps?q=${latitude},${longitude}`,
	createdAt:moment().valueOf()
}
}

module.exports = {
	generate_message,
	generate_location_message
}