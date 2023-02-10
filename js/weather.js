class Sunrise {
    constructor(sunrise){
        this.sunrise = sunrise
    }
}

class Sunset {
    constructor(sunset){
        this.sunset = sunset
    }
}

const sunriseArr = [];
const sunsetArr = [];

const weatherToday = document.querySelector('#weather');


window.onload = (event) => {
    getWeather();

    async function getWeather(){
    const url = new URL(
        `https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&daily=sunrise,sunset&timezone=America%2FLos_Angeles`
    );
    
        const response = await fetch(url);

        if(response.status === 200){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            
            for (const result of jsonResponse.daily.sunrise) {
                sunriseArr.push(new Sunrise(result));
            }

            for (const result of jsonResponse.daily.sunset) {
                sunsetArr.push(new Sunset(result));
            }

            displayWeather();
        }
    }
};

function displayWeather(){
    for (const item of sunriseArr) {

        if (sunriseArr.indexOf(item) == 1) {break;}

        //Skapa element
        const card = document.createElement('li');
        const cardBody = document.createElement('div');
        const cardText = document.createElement('p');
    
        //Styla element
        card.classList.add("card", "border-0");
        cardBody.classList.add("card-body", "bg-light", "text-dark");
        cardText.classList.add("card-text");
    
        //Innehåll i element
        const textSunrise = item.sunrise.replace("T", " Sunrise: ");
        cardText.innerText = textSunrise;

        //Lägg till element i DOM
        cardBody.append(cardText);
        card.append(cardBody);
        weatherToday.append(card);
    }

    for (const item of sunsetArr) {

        if (sunsetArr.indexOf(item) == 1) {break;}

        //Skapa element
        const card = document.createElement('li');
        const cardBody = document.createElement('div');
        const cardText = document.createElement('p');

        //Styla element
        card.classList.add("card", "border-0");
        cardBody.classList.add("card-body", "bg-light", "text-dark");
        cardText.classList.add("card-text");
    
        //Innehåll i element
        const textSunset = item.sunset.replace("T", " Sunset: ");
        cardText.innerText = textSunset;

        //Lägg till element i DOM
        cardBody.append(cardText);
        card.append(cardBody);
        weatherToday.append(card);
    }

}