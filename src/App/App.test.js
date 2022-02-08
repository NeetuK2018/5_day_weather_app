import {screen, render} from "@testing-library/react"
import App from "./App"
import WeatherEachDay from "../Components/WeatherEachDay"

test("it should have the correct current weather", async() => {
    render(<App/>);
    const forecast = await screen.findByText("max"); 
    expect(forecast).toBeVisible();
});
