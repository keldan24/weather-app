const app = {
  init: () => {
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetchWeather);

  },
  fetchWeather: () => {
    let location = document.getElementById('location').value;
    let key = 'a6ca9adc5eac495a9d5141726241605';
    let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;

    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
        // console.log(data);
      })
      .catch(console.error);
  },
  
  showWeather: (resp) => {
    console.log(resp);
    let current = resp.current;
    let location = resp.location;
    let localtime = location.localtime;
    const datetime = new Date(localtime);
    const date = datetime.toDateString();
    const time = datetime.toLocaleTimeString();


    let row = document.querySelector('.weather.row');
    row.innerHTML = `<div class="col">
      <div class="card">
        <h4 class="card-title p-2">${location.name}, ${location.country}</h4>
        <h6 class="p-2 date"><span>Date:<span> ${date}</h6>
        <h6 class="p-2 time"><span>Time:<span> ${time}</h6>
        <div class="card-body">
          <h3 class="card-title">${current.condition.text}</h3>
          <img src="${current.condition.icon}" alt="${current.condition.text}">
          <p class="card-text">Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
          <p class="card-text">Feels like: ${current.feelslike_c}°C (${current.feelslike_f}°F)</p>
          <p class="card-text">Wind Speed: ${current.wind_kph} km/h</p>
          <p class="card-text">Humidity: ${current.humidity}%</p>
        </div>
      </div>
    </div>`;
  },
};

app.init();
