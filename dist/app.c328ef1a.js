// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var map;
var userMarker;
var currentLocation;
var searchResults = [];
var routeControl;
var nearestObjects = [];
var currentRouteIndex = 0;

// Инициализация карты
function initMap() {
  map = L.map('map').setView([55.76, 37.64], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Добавляем кнопку геолокации
  var geolocationButton = L.control({
    position: 'topright'
  });
  geolocationButton.onAdd = function () {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = '<a href="#" title="Определить местоположение" style="width: 30px; height: 30px; line-height: 30px;">📍</a>';
    div.onclick = function (e) {
      e.preventDefault();
      getCurrentLocation();
    };
    return div;
  };
  geolocationButton.addTo(map);
}

// Получение текущего местоположения
function getCurrentLocation() {
  return _getCurrentLocation.apply(this, arguments);
} // Поиск ближайших объектов
function _getCurrentLocation() {
  _getCurrentLocation = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var position, _position$coords, latitude, longitude;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        case 3:
          position = _context.sent;
          _position$coords = position.coords, latitude = _position$coords.latitude, longitude = _position$coords.longitude;
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
          return _context.abrupt("return", currentLocation);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Ошибка получения местоположения:', _context.t0);
          alert('Не удалось определить ваше местоположение. Пожалуйста, проверьте настройки геолокации.');
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getCurrentLocation.apply(this, arguments);
}
function searchNearby() {
  return _searchNearby.apply(this, arguments);
} // Функция для расчета расстояния между двумя точками
function _searchNearby() {
  _searchNearby = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var bounds, radius, query, response, data, distances, objectsList, routeInfo;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (currentLocation) {
            _context2.next = 3;
            break;
          }
          alert('Сначала определите ваше местоположение');
          return _context2.abrupt("return");
        case 3:
          _context2.prev = 3;
          clearSearchResults();
          currentRouteIndex = 0;
          bounds = map.getBounds();
          radius = 1000; // радиус поиска в метрах
          // Используем Overpass API для поиска заправок
          query = "\n            [out:json][timeout:25];\n            (\n                node[\"amenity\"=\"fuel\"](around:".concat(radius, ",").concat(currentLocation[0], ",").concat(currentLocation[1], ");\n            );\n            out body;\n            >;\n            out skel qt;\n        ");
          _context2.next = 11;
          return fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
          });
        case 11:
          response = _context2.sent;
          _context2.next = 14;
          return response.json();
        case 14:
          data = _context2.sent;
          distances = []; // Обрабатываем результаты поиска
          data.elements.forEach(function (element) {
            if (element.type === 'node') {
              var coords = [element.lat, element.lon];
              var distance = calculateDistance(currentLocation, coords);
              if (bounds.contains(L.latLng(coords))) {
                distances.push({
                  coords: coords,
                  distance: distance,
                  name: element.tags.name || 'Заправка',
                  address: element.tags['addr:street'] ? "".concat(element.tags['addr:street']).concat(element.tags['addr:housenumber'] ? ', ' + element.tags['addr:housenumber'] : '') : 'Адрес не указан'
                });
              }
            }
          });

          // Сортируем по расстоянию и берем 3 ближайших
          distances.sort(function (a, b) {
            return a.distance - b.distance;
          });
          nearestObjects = distances.slice(0, 3);

          // Создаем контейнер для списка объектов
          objectsList = document.createElement('div');
          objectsList.className = 'objects-list';
          objectsList.innerHTML = '<h3>Ближайшие заправки:</h3>';

          // Отображаем ближайшие объекты на карте и в списке
          nearestObjects.forEach(function (item, index) {
            var distance = (item.distance / 1000).toFixed(1);

            // Создаем маркер на карте
            var marker = L.marker(item.coords, {
              icon: L.divIcon({
                className: 'object-marker',
                html: "<div style=\"background-color: #ff4444; \n                           color: white; \n                           width: 24px; \n                           height: 24px; \n                           border-radius: 50%; \n                           border: 2px solid white;\n                           text-align: center;\n                           line-height: 20px;\">".concat(index + 1, "</div>")
              })
            }).addTo(map);
            marker.bindPopup("\n                <div style=\"padding: 10px;\">\n                    <h3>".concat(item.name, "</h3>\n                    <p>\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435: ").concat(distance, " \u043A\u043C</p>\n                </div>\n            "));

            // Добавляем элемент в список
            var objectElement = document.createElement('div');
            objectElement.className = 'object-item';
            objectElement.innerHTML = "\n                <div class=\"object-info\">\n                    <h4>".concat(index + 1, ". ").concat(item.name, "</h4>\n                    <p>\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435: ").concat(distance, " \u043A\u043C</p>\n                </div>\n                <button class=\"route-button-small\" data-coords=\"").concat(item.coords.join(','), "\">\n                    \u041F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\n                </button>\n            ");

            // Добавляем обработчик для кнопки маршрута
            var routeButton = objectElement.querySelector('.route-button-small');
            routeButton.addEventListener('click', function () {
              buildRoute(item.coords);
            });
            objectsList.appendChild(objectElement);
          });

          // Добавляем список объектов на страницу
          routeInfo = document.getElementById('routeInfo');
          routeInfo.innerHTML = '';
          routeInfo.appendChild(objectsList);
          _context2.next = 32;
          break;
        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](3);
          console.error('Ошибка поиска:', _context2.t0);
          alert('Произошла ошибка при поиске заправок');
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 28]]);
  }));
  return _searchNearby.apply(this, arguments);
}
function calculateDistance(point1, point2) {
  var R = 6371e3; // радиус Земли в метрах
  var φ1 = point1[0] * Math.PI / 180;
  var φ2 = point2[0] * Math.PI / 180;
  var Δφ = (point2[0] - point1[0]) * Math.PI / 180;
  var Δλ = (point2[1] - point1[1]) * Math.PI / 180;
  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
function buildRoute(_x) {
  return _buildRoute.apply(this, arguments);
} // Функция для очистки маршрута
function _buildRoute() {
  _buildRoute = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(destination) {
    var container, elements;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (currentLocation) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return");
        case 2:
          try {
            if (routeControl) {
              map.removeControl(routeControl);
              routeControl = null;
            }
            routeControl = L.Routing.control({
              waypoints: [L.latLng(currentLocation), L.latLng(destination)],
              routeWhileDragging: false,
              language: 'ru',
              createMarker: function createMarker() {
                return null;
              },
              router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'driving',
                alternatives: false
              }),
              lineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 0,
                styles: [{
                  color: '#ff0000',
                  weight: 4,
                  opacity: 0.8
                }]
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
              plan: L.Routing.plan([L.latLng(currentLocation), L.latLng(destination)], {
                createMarker: function createMarker() {
                  return null;
                },
                dragStyles: [{
                  color: '#ff0000',
                  weight: 4,
                  opacity: 0.8
                }]
              })
            }).addTo(map);

            // Переводим элементы управления маршрутом
            container = document.querySelector('.leaflet-routing-container');
            if (container) {
              elements = container.querySelectorAll('h3');
              elements.forEach(function (el) {
                if (el.textContent === 'Route') {
                  el.textContent = 'Маршрут';
                } else if (el.textContent === 'Alternative routes') {
                  el.textContent = 'Альтернативные маршруты';
                }
              });
            }
            routeControl.on('routesfound', function (e) {
              var routes = e.routes;
              if (routes && routes.length > 0) {
                var route = routes[0];
                var distance = (route.summary.totalDistance / 1000).toFixed(1);
                var duration = Math.round(route.summary.totalTime / 60);
                var routeDetails = document.createElement('div');
                routeDetails.className = 'route-details';
                routeDetails.innerHTML = "\n                    <h3>\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0435</h3>\n                    <p><strong>\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435:</strong> ".concat(distance, " \u043A\u043C</p>\n                    <p><strong>\u0412\u0440\u0435\u043C\u044F \u0432 \u043F\u0443\u0442\u0438 \u043D\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435:</strong> ").concat(duration, " \u043C\u0438\u043D</p>\n                    <button class=\"clear-route-button\" onclick=\"clearRoute()\">\n                        \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\n                    </button>\n                ");
                var routeInfoContainer = document.getElementById('routeInfo');
                var existingRouteDetails = routeInfoContainer.querySelector('.route-details');
                if (existingRouteDetails) {
                  existingRouteDetails.remove();
                }
                routeInfoContainer.appendChild(routeDetails);

                // Добавляем обработчик для кнопки очистки
                var clearButton = routeDetails.querySelector('.clear-route-button');
                clearButton.addEventListener('click', clearRoute);
              } else {
                alert('Не удалось построить маршрут. Попробуйте другую точку.');
              }
            });
            routeControl.on('routingerror', function (e) {
              console.error('Ошибка маршрутизации:', e);
              alert('Не удалось построить маршрут. Попробуйте другую точку.');
            });
          } catch (error) {
            console.error('Ошибка построения маршрута:', error);
            alert('Не удалось построить маршрут');
          }
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _buildRoute.apply(this, arguments);
}
function clearRoute() {
  if (routeControl) {
    map.removeControl(routeControl);
    routeControl = null;
  }

  // Удаляем все маршруты с карты
  map.eachLayer(function (layer) {
    if (layer instanceof L.Routing.Line) {
      map.removeLayer(layer);
    }
  });

  // Очищаем информацию о маршруте
  var routeDetails = document.querySelector('.route-details');
  if (routeDetails) {
    routeDetails.remove();
  }

  // Удаляем панель маршрутизации
  var routingContainer = document.querySelector('.leaflet-routing-container');
  if (routingContainer) {
    routingContainer.remove();
  }
}

// Очистка результатов поиска
function clearSearchResults() {
  map.eachLayer(function (layer) {
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
  var sidebar = document.getElementById('sidebar');
  var toggleButton = document.getElementById('toggleSidebar');
  var isCollapsed = sidebar.classList.toggle('collapsed');

  // Обновляем текст кнопки и её подсказку
  toggleButton.textContent = isCollapsed ? '▶' : '◀';
  toggleButton.title = isCollapsed ? 'Показать панель' : 'Скрыть панель';

  // Обновляем размер карты после анимации
  setTimeout(function () {
    map.invalidateSize();
  }, 300);
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function () {
  initMap();

  // Добавляем обработчики событий
  document.getElementById('findLocation').addEventListener('click', getCurrentLocation);
  document.getElementById('searchNearby').addEventListener('click', searchNearby);

  // Обработчик для кнопки скрытия панели
  var toggleButton = document.getElementById('toggleSidebar');
  toggleButton.addEventListener('click', toggleSidebar);

  // Добавляем обработчик клавиши Escape для скрытия панели
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var sidebar = document.getElementById('sidebar');
      if (!sidebar.classList.contains('collapsed')) {
        toggleSidebar();
      }
    }
  });
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34603" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map