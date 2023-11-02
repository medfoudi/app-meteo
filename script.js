

document.addEventListener('DOMContentLoaded', function () {
    const cities = [
        { name: 'Liege', lat: 50.6412, lon: 5.5718 },
        { name: 'Brussels', lat: 50.8503, lon: 4.3517 },
        { name: 'Antwerp', lat: 51.2194, lon: 4.4025 }
    ];

    const apiKey = '84bf3fef68549bdd4e42afe5b4f21d58'; 
    const weatherOutput = document.getElementById('weather-output');

    cities.forEach(city => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=fr`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(weatherData => {
                const weatherList = weatherData.list;
                const template = document.getElementById('weather-template');
                console.log(weatherList);

                weatherList.forEach(weather => {
                    const date = new Date(weather.dt_txt);
                    const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
                    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

                const formattedDate = `${daysOfWeek[date.getDay()]}, ${('0' + date.getDate()).slice(-2)} ${months[date.getMonth()]} ${date.getFullYear()}`;
                    const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    const temperature = Math.round(weather.main.temp);
                    const tempMax = Math.round(weather.main.temp_max);
                    const tempMin = Math.round(weather.main.temp_min);
                    const description = weather.weather[0].description;
                    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
                    const windSpeed = Math.round(weather.wind.speed * 3.6);

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <img src="${icon}" alt="Weather Icon">

                        <p> ${temperature}°C</p>
                        <p>${city.name}, ${description}</p>
                        <p>${formattedDate} </p>
                        <p>${time}</p>
                        <p>Temp-max ${tempMax}°C, Temp-min ${tempMin}°C</p>
                        <p>Vitesse du vent: ${windSpeed} k/h</p>
                    `;
                    weatherOutput.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});








