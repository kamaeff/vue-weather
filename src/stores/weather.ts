import type { WeatherData } from '@/shared/types/types'
import axios from 'axios'

export const weatherApi = async (place: string): Promise<WeatherData | null> => {
  const key = `ba57a312e0b0f759027de7af211405e0`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}`

  try {
    const response = await axios.get(url)
    const data = response.data

    console.log(response.data)

    if (data) {
      const humidity = data.main.humidity
      const press = Math.round(data.main.pressure / 1.333)

      console.log('desc: ' + data.weather[0].description)

      return {
        name: data.name,
        temp: Math.round(data.main.temp - 273.15),
        clouds: data.clouds.all,
        description:
          data.weather[0].description.includes('cloud') && data.clouds.all < 50
            ? 'Clouds'
            : data.weather[0].description.includes('cloud') && data.clouds.all > 50
              ? 'Overcast'
              : data.weather[0].description.includes('rain')
                ? 'Rain'
                : 'Clear',
        humidity: {
          present: humidity,
          status: humidity < 40 ? 'Dry' : humidity > 40 && humidity < 60 ? 'Good' : 'Wet'
        },
        wind: data.wind.speed,
        pressure: {
          number: press,
          status: press === 760 ? 'Normal' : press > 760 ? 'High' : 'Low'
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}
