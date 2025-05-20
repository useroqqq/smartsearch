let map;
let userMarker;
let currentLocation;
let searchResults = [];
let routeControl;
let nearestObjects = [];
let currentRouteIndex = 0;

// Инициализация карты
function initMap() {
    map = L.map('map').setView([55.76, 37.64], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Добавляем кнопку геолокации
    const geolocationButton = L.control({ position: 'topright' });
    geolocationButton.onAdd = function() {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = '<a href="#" title="Определить местоположение" style="width: 30px; height: 30px; line-height: 30px;">📍</a>';
        div.onclick = function(e) {
            e.preventDefault();
            getCurrentLocation();
        };
        return div;
    };
    geolocationButton.addTo(map);
}

// Получение текущего местоположения
async function getCurrentLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        currentLocation = [latitude, longitude];
        
        map.setView(currentLocation, 15);

        if (userMarker) {
            map.removeLayer(userMarker);
        }

        userMarker = L.marker(currentLocation, {
            icon: L.divIcon({
                className: 'user-marker',
                html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>'
            })
        }).addTo(map);

        return currentLocation;
    } catch (error) {
        console.error('Ошибка получения местоположения:', error);
        alert('Не удалось определить ваше местоположение. Пожалуйста, проверьте настройки геолокации.');
    }
}

// Поиск ближайших объектов
async function searchNearby() {
    if (!currentLocation) {
        alert('Сначала определите ваше местоположение');
        return;
    }

    try {
        clearSearchResults();
        currentRouteIndex = 0;

        const bounds = map.getBounds();
        const radius = 1000; // радиус поиска в метрах

        // Используем Overpass API для поиска заправок
        const query = `
            [out:json][timeout:25];
            (
                node["amenity"="fuel"](around:${radius},${currentLocation[0]},${currentLocation[1]});
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        const data = await response.json();
        const distances = [];

        // Обрабатываем результаты поиска
        data.elements.forEach(element => {
            if (element.type === 'node') {
                const coords = [element.lat, element.lon];
                const distance = calculateDistance(currentLocation, coords);
                
                if (bounds.contains(L.latLng(coords))) {
                    distances.push({
                        coords,
                        distance,
                        name: element.tags.name || 'Заправка',
                        address: element.tags['addr:street'] ? 
                            `${element.tags['addr:street']}${element.tags['addr:housenumber'] ? ', ' + element.tags['addr:housenumber'] : ''}` : 
                            'Адрес не указан'
                    });
                }
            }
        });

        // Сортируем по расстоянию и берем 3 ближайших
        distances.sort((a, b) => a.distance - b.distance);
        nearestObjects = distances.slice(0, 3);

        // Создаем контейнер для списка объектов
        const objectsList = document.createElement('div');
        objectsList.className = 'objects-list';
        objectsList.innerHTML = '<h3>Ближайшие заправки:</h3>';

        // Отображаем ближайшие объекты на карте и в списке
        nearestObjects.forEach((item, index) => {
            const distance = (item.distance / 1000).toFixed(1);
            
            // Создаем маркер на карте
            const marker = L.marker(item.coords, {
                icon: L.divIcon({
                    className: 'object-marker',
                    html: `<div style="background-color: #ff4444; 
                           color: white; 
                           width: 24px; 
                           height: 24px; 
                           border-radius: 50%; 
                           border: 2px solid white;
                           text-align: center;
                           line-height: 20px;">${index + 1}</div>`
                })
            }).addTo(map);

            marker.bindPopup(`
                <div style="padding: 10px;">
                    <h3>${item.name}</h3>
                    <p>Расстояние: ${distance} км</p>
                </div>
            `);

            // Добавляем элемент в список
            const objectElement = document.createElement('div');
            objectElement.className = 'object-item';
            objectElement.innerHTML = `
                <div class="object-info">
                    <h4>${index + 1}. ${item.name}</h4>
                    <p>Расстояние: ${distance} км</p>
                </div>
                <button class="route-button-small" data-coords="${item.coords.join(',')}">
                    Построить маршрут
                </button>
            `;

            // Добавляем обработчик для кнопки маршрута
            const routeButton = objectElement.querySelector('.route-button-small');
            routeButton.addEventListener('click', () => {
                buildRoute(item.coords);
            });

            objectsList.appendChild(objectElement);
        });

        // Добавляем список объектов на страницу
        const routeInfo = document.getElementById('routeInfo');
        routeInfo.innerHTML = '';
        routeInfo.appendChild(objectsList);

    } catch (error) {
        console.error('Ошибка поиска:', error);
        alert('Произошла ошибка при поиске заправок');
    }
}

// Функция для расчета расстояния между двумя точками
function calculateDistance(point1, point2) {
    const R = 6371e3; // радиус Земли в метрах
    const φ1 = point1[0] * Math.PI/180;
    const φ2 = point2[0] * Math.PI/180;
    const Δφ = (point2[0]-point1[0]) * Math.PI/180;
    const Δλ = (point2[1]-point1[1]) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // расстояние в метрах
}

// Построение маршрута до ближайшей заправки
function buildRouteToNearest() {
    if (!nearestObjects.length) {
        alert('Сначала выполните поиск заправок');
        return;
    }

    currentRouteIndex = 0;
    buildRoute(nearestObjects[0].coords);
}

// Построение маршрута до следующей заправки
function buildRouteToNext() {
    if (!nearestObjects.length) {
        alert('Сначала выполните поиск заправок');
        return;
    }

    currentRouteIndex = (currentRouteIndex + 1) % nearestObjects.length;
    buildRoute(nearestObjects[currentRouteIndex].coords);
}

// Построение маршрута
async function buildRoute(destination) {
    if (!currentLocation) return;

    try {
        if (routeControl) {
            map.removeControl(routeControl);
            routeControl = null;
        }

        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(currentLocation),
                L.latLng(destination)
            ],
            routeWhileDragging: false,
            language: 'ru',
            createMarker: function() { return null; },
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'driving',
                alternatives: false
            }),
            lineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 0,
                styles: [{ color: '#ff0000', weight: 4, opacity: 0.8 }]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            useZoomParameter: true,
            formatter: new L.Routing.Formatter({
                language: 'ru',
                roundingSensitivity: 30
            }),
            plan: L.Routing.plan([
                L.latLng(currentLocation),
                L.latLng(destination)
            ], {
                createMarker: function() { return null; },
                dragStyles: [{ color: '#ff0000', weight: 4, opacity: 0.8 }]
            })
        }).addTo(map);

        // Переводим элементы управления маршрутом
        const container = document.querySelector('.leaflet-routing-container');
        if (container) {
            const elements = container.querySelectorAll('h3');
            elements.forEach(el => {
                if (el.textContent === 'Route') {
                    el.textContent = 'Маршрут';
                } else if (el.textContent === 'Alternative routes') {
                    el.textContent = 'Альтернативные маршруты';
                }
            });
        }

        routeControl.on('routesfound', function(e) {
            const routes = e.routes;
            if (routes && routes.length > 0) {
                const route = routes[0];
                const distance = (route.summary.totalDistance / 1000).toFixed(1);
                const duration = Math.round(route.summary.totalTime / 60);

                const routeDetails = document.createElement('div');
                routeDetails.className = 'route-details';
                routeDetails.innerHTML = `
                    <h3>Информация о маршруте</h3>
                    <p><strong>Расстояние:</strong> ${distance} км</p>
                    <p><strong>Время в пути на автомобиле:</strong> ${duration} мин</p>
                    <button class="clear-route-button" onclick="clearRoute()">
                        Очистить маршрут
                    </button>
                `;

                const routeInfoContainer = document.getElementById('routeInfo');
                const existingRouteDetails = routeInfoContainer.querySelector('.route-details');
                if (existingRouteDetails) {
                    existingRouteDetails.remove();
                }
                routeInfoContainer.appendChild(routeDetails);

                // Добавляем обработчик для кнопки очистки
                const clearButton = routeDetails.querySelector('.clear-route-button');
                clearButton.addEventListener('click', clearRoute);
            } else {
                alert('Не удалось построить маршрут. Попробуйте другую точку.');
            }
        });

        routeControl.on('routingerror', function(e) {
            console.error('Ошибка маршрутизации:', e);
            alert('Не удалось построить маршрут. Попробуйте другую точку.');
        });

    } catch (error) {
        console.error('Ошибка построения маршрута:', error);
        alert('Не удалось построить маршрут');
    }
}

// Функция для очистки маршрута
function clearRoute() {
    if (routeControl) {
        map.removeControl(routeControl);
        routeControl = null;
    }
    
    // Удаляем все маршруты с карты
    map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Line) {
            map.removeLayer(layer);
        }
    });

    // Очищаем информацию о маршруте
    const routeDetails = document.querySelector('.route-details');
    if (routeDetails) {
        routeDetails.remove();
    }

    // Удаляем панель маршрутизации
    const routingContainer = document.querySelector('.leaflet-routing-container');
    if (routingContainer) {
        routingContainer.remove();
    }
}

// Очистка результатов поиска
function clearSearchResults() {
    map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
            map.removeLayer(layer);
        }
    });
    if (userMarker) {
        map.addLayer(userMarker);
    }
    document.getElementById('routeInfo').innerHTML = '';
    nearestObjects = [];
    currentRouteIndex = 0;
}

// Функция для переключения видимости бокового меню
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleSidebar');
    const isCollapsed = sidebar.classList.toggle('collapsed');
    
    // Обновляем текст кнопки и её подсказку
    toggleButton.textContent = isCollapsed ? '▶' : '◀';
    toggleButton.title = isCollapsed ? 'Показать панель' : 'Скрыть панель';
    
    // Обновляем размер карты после анимации
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    
    // Добавляем обработчики событий
    document.getElementById('findLocation').addEventListener('click', getCurrentLocation);
    document.getElementById('searchNearby').addEventListener('click', searchNearby);
    
    // Обработчик для кнопки скрытия панели
    const toggleButton = document.getElementById('toggleSidebar');
    toggleButton.addEventListener('click', toggleSidebar);
    
    // Добавляем обработчик клавиши Escape для скрытия панели
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar.classList.contains('collapsed')) {
                toggleSidebar();
            }
        }
    });
}); 