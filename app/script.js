const form = document.getElementById('location-form');
const input = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const apiKey = "ba558d920d12bb08600ca934a5c5c915"
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = input.value.trim();
    if (!location) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp} ℃`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } catch (error) {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = error.message;
    }
});
