import { createSlice, PayloadAction } from 'redux-starter-kit';

export type WeatherForLocation = {
  description: string;
  locationName: string;
  temperatureinCelsius: number;
};

export type Metrics = {
    
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  description: '',
  locationName: '',
};

const toF = (c: number) => (c * 9) / 5 + 32;

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = toF(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
      const result = action.payload;
      console.log(result);
    },
    metricMeasurementsDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
      const result = action.payload;
      console.log(result);
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
