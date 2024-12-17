const apiKey = '38f4884fc6d7a5b7303df5e3a8d03697';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather(city, cardNumber) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherCondition = data.weather[0].main.toLowerCase();
                const iconPath = getWeatherIcon(weatherCondition);

                document.getElementById(`weatherDescription${cardNumber}`).innerText = data.weather[0].description;
                document.getElementById(`temp${cardNumber}`).innerText = `${data.main.temp}°C`;
                document.getElementById(`weatherIcon${cardNumber}`).src = iconPath;
            }
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

const cards = document.querySelectorAll('.card'); // Все карточки
const weatherContainer = document.getElementById('weatherContainer');

function handleScroll() {
    const containerWidth = weatherContainer.offsetWidth;
    const rightEdge = weatherContainer.scrollLeft + containerWidth; // Правая граница контейнера

    cards.forEach(card => {
        const cardLeftEdge = card.getBoundingClientRect().left + weatherContainer.scrollLeft; // Левый край карточки

        // Если левый край карточки меньше, чем 400px до правого края контейнера
        if (cardLeftEdge >= rightEdge - 400) {
            card.classList.add('hidden'); // Добавляем класс для скрытия
        } else {
            card.classList.remove('hidden'); // Убираем класс, если карточка видна
        }
    });
}

// Слушаем событие скролла
weatherContainer.addEventListener('scroll', handleScroll);

// Запускаем обработчик сразу, чтобы отобразить корректное состояние карточек
handleScroll();

// Слушаем событие скролла
weatherContainer.addEventListener('scroll', handleScroll);

// Запускаем обработчик сразу, чтобы отобразить корректное состояние карточек
handleScroll();


// Слушаем событие скролла
weatherContainer.addEventListener('scroll', handleScroll);

// Запускаем обработчик сразу, чтобы отобразить корректное состояние карточек
handleScroll();



function showWeather(city, cardNumber) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherCondition = data.weather[0].main.toLowerCase();
                const iconPath = getWeatherIcon(weatherCondition);

                const modal = document.getElementById('modal');
                modal.querySelector('h2').innerText = data.name;
                modal.querySelector('.weather-icon').src = iconPath;
                modal.querySelector('p:nth-of-type(1)').innerText = data.weather[0].description;
                modal.querySelector('p:nth-of-type(2)').innerText = `Температура: ${data.main.temp}°C`;

                drawWeatherGraph(data);
                modal.style.display = 'block';
            }
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function getWeatherIcon(weatherCondition) {
    const icons = {
        clear: 'image/sun.svg',
        clouds: 'image/obl.svg',
        rain: 'image/rain.svg',
        snow: 'image/snow.svg',
        thunderstorm: 'image/strain.svg',
        mist: 'image/tuman.svg',
        smoke: 'image/tuma.svg',
        fog: 'image/tuman.svg',
    };
    return icons[weatherCondition] || 'image/default.svg';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
}
// Открытие модального окна при клике на кнопку
document.getElementById('themeToggle').onclick = function() {
    document.getElementById('themeModal').style.display = 'block';
};

// Закрытие модального окна
function closeThemeModal() {
    document.getElementById('themeModal').style.display = 'none';
}

// Функция для смены фона
function changeBackground(image) {
    document.body.style.backgroundImage = `url('${image}')`;
    closeThemeModal(); // Закрыть окно после выбора фона
}
function updateTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();

    // Добавляем ведущий ноль, если минуты меньше 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Форматируем время: часы:минуты
    const timeString = hours + ':' + minutes;

    // Обновляем элемент времени на странице
    document.querySelector('.time').textContent = timeString;
}

// Обновляем время каждую минуту
setInterval(updateTime, 60000);
updateTime(); // Сразу вызываем функцию для первичного отображения времени


// Обновляем время каждую секунду
setInterval(updateTime, 1000);

fetch('https://api.openweathermap.org/data/2.5/forecast?q=city&units=metric&cnt=6&appid=38f4884fc6d7a5b7303df5e3a8d03697')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Здесь увидишь данные для графика
    updateChart(data);
  })
  .catch(error => console.error('Error fetching weather data:', error));





function drawWeatherGraph(data) {
    const ctx = document.getElementById('weatherGraph').getContext('2d');
    const graphData = {
        labels: ['0ч', '1ч', '2ч', '3ч', '4ч', '5ч'],
        datasets: [{
            label: 'Температура (°C)',
            data: [
                data.main.temp,
                data.main.temp - 1,
                data.main.temp + 1,
                data.main.temp - 2,
                data.main.temp + 2,
                data.main.temp
            ],
            borderColor: '#FF5733',
            fill: false,
            tension: 0.4
        }]
    };

    if (window.weatherChart) {
        window.weatherChart.destroy();
    }

    window.weatherChart = new Chart(ctx, {
        type: 'line',
        data: graphData,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Часы'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Температура (°C)'
                    }
                }
            }
        }
    });
    function updateChart(weatherData) {
        const labels = weatherData.list.map(item => {
            return new Date(item.dt * 1000).getHours() + ':' + new Date(item.dt * 1000).getMinutes();
        });
    
        const temperatures = weatherData.list.map(item => item.main.temp);
    
        const ctx = document.getElementById('tempChart').getContext('2d');
        const tempChart = new Chart(ctx, {
            type: 'line',  // Тип графика
            data: {
                labels: labels,  // Часы
                datasets: [{
                    label: 'Температура (°C)',
                    data: temperatures,  // Температуры
                    borderColor: 'rgba(75, 192, 192, 1)',  // Цвет линии
                    fill: false,  // Без заливки
                    tension: 0.1  // Уровень сглаживания линии
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: false
                        }
                    }
                }
            }
        });
    }
    
    
    
    
}

getWeather('Almaty', 1);
getWeather('Astana', 2);
getWeather('Alatau', 3);
getWeather('Shymkent', 4);
getWeather('Taldykorgan', 5);
getWeather('Ust-Kamenogorsk', 6);
getWeather('Kostanay', 7);
getWeather('Petropavlovsk', 8);
getWeather('Aktobe', 9);
getWeather('Karaganda', 10);
getWeather('Turkestan', 11);
getWeather('Temirtau', 12);