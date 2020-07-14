import { configureStore } from '@reduxjs/toolkit';
import SolarSystemReducer from '../components/SolarSystem/SolarSystemSlice';

export default configureStore({
  reducer: {
    solarSystem: SolarSystemReducer,
  },
});
