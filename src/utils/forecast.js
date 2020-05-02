const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=613c59d3e4ba856af7cdd1dc4a97a5bf&query=' + lat + ', ' + long + '&units=m'

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (body.error) {
			callback('Unable to find location. Try another search.', undefined)
		} else {
            // callback(undefined, body.location.name + ':  Weather Descr: ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degree')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degree. The humidity is ' +  body.current.humidity + ' %.')
            //     {
			// 	current: response.body.current
			// })
		}
	})
}

module.exports = forecast