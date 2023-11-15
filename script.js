document.addEventListener('DOMContentLoaded', function () {
    const cities = [
        { name: 'Liege', lat: 50.6412, lon: 5.5718 },
        { name: 'Brussels', lat: 50.8503, lon: 4.3517 },
        { name: 'Antwerp', lat: 51.2194, lon: 4.4025 },
        { name: 'Ostend', lat: 51.2144, lon: 2.928 },
        { name: 'Namur', lat: 50.4651, lon: 4.8711 },
        { name: 'Luxembourg', lat: 49.6117, lon: 6.1319 },
        { name: 'Gent', lat: 51.0543, lon: 3.7174 },
        { name: 'Brugge', lat: 51.2093, lon: 3.2247 },
        { name: 'Leuven', lat: 50.8796, lon: 4.7009 },
        { name: 'Eupen', lat: 50.6303, lon: 6.0337 }
        // Add the additional cities here
    ];

    const apiKey = '84bf3fef68549bdd4e42afe5b4f21d58';
    const weatherOutput = document.getElementById('weather-output');
    const citySelect = document.getElementById('city-select');
    const languageSelect = document.getElementById('language-select');

    function updateWeather(cityName, language) {
        weatherOutput.innerHTML = '';
        cities.filter(city => cityName === 'all' ? true : city.name === cityName).forEach(city => {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=${language}`;

            fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => {
                    const weatherList = weatherData.list;

                    weatherList.forEach(weather => {
                        const date = new Date(weather.dt_txt);
                        const daysOfWeek = {
                            fr: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                            de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                            nl: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
                            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Add English days
                        }[language];

                        const months = {
                            fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                            de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                            nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
                            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // Add English months
                        }[language];

                        const formattedDate = `${daysOfWeek[date.getDay()]}, ${('0' + date.getDate()).slice(-2)} ${months[date.getMonth()]} ${date.getFullYear()}`;
                        const time = date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
                        const temperature = Math.round(weather.main.temp);
                        const tempMax = Math.round(weather.main.temp_max);
                        const tempMin = Math.round(weather.main.temp_min);
                        const description = weather.weather[0].description;
                        const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
                        const windSpeed = Math.round(weather.wind.speed * 3.6);

                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                            <img src="${icon}" alt="Weather Icon">
                            <p>${temperature}°C</p>
                            <p>${city.name}, ${description}</p>
                            <p>${formattedDate}</p>
                            <p>${time}</p>
                            <p>Temp-max ${tempMax}°C, Temp-min ${tempMin}°C</p>
                            <p>Wind Speed: ${windSpeed} km/h</p>
                        `;
                        weatherOutput.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    citySelect.addEventListener('change', function () {
        updateWeather(citySelect.value, languageSelect.value);
    });

    languageSelect.addEventListener('change', function () {
        updateWeather(citySelect.value, languageSelect.value);
    });

    updateWeather('all', 'fr'); 
});
