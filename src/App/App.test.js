import React from "react";
import {render, cleanuo, waitForElement, cleanup} from "@testing-library/react";
import axios from "axios";
import {fetchCityName} from "./App";
import responseCity from "./responseCity";
jest.mock('axios');


const fetchCityNameURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}}&appid={API key}  `

afterEach(cleanup);
describe('fetchCityName', () => {
    it('fetches and displays city name from', async () => {
        const data = {
            responseCity
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(fetchCityName('react')).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith(
            `${fetchCityNameURL}/weather?lat=53.69)}`
        )
    });

})

