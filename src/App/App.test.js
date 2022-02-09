import {screen, render} from "@testing-library/react";
import App from "./App";
import responseCity  from "./responseCity.json";
import responseForecast from "./responseForecast.json"

import {rest} from "msw";
import {setupServer} from "msw/node";


 const weatherCityNameUrl = "https://api.openweathermap.org/data/2.5/weather?lat=53.69&lon=1.78appid=91af7880fda38f058a7884146522ab72"

 const weatherForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=53.69&lon=1.78&exclude=minutely,hourly&units=metric&appid=91af7880fda38f058a7884146522ab72"



//parameter URL 
const weatherCityNameResponse =rest.get(weatherCityNameUrl, (req, res, ctx) => {
    return res(
        ctx.json(responseCity)
    )
}); 

const weatherForecastResponse =rest.get(weatherForecastUrl, (req, res, ctx) => {
    return res(
        ctx.json(responseForecast)
    )
}); 
const handlers = [ weatherForecastResponse, weatherCityNameResponse];

const server = new setupServer(...handlers);//  represents API

beforeAll(() => server.listen());   //start
afterEach(() => server.resetHandlers()); //reset for each one
afterAll(() => server.close()); //finish

test("it should have the correct current weather for Brighouse", async() => {
    render(<App/>);
    const forecast = await screen.findByText("overcast clouds"); 
    expect(forecast).toBeVisible();
});
