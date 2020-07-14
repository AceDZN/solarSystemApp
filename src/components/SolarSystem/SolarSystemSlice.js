import { createSlice } from '@reduxjs/toolkit';
import {PLANETS_API_EXCLUDED , PLANETS_PHOTOS_MOCK_URL} from '../../constants';
export const SolarSystemSlice = createSlice({
  name: 'solarSystem',
  initialState: {
    query: '',
    bodies: {},
    ids: [],
    images: {},
    activeBody: {},
    loading: true,
    error: null,
    favorites : JSON.parse(localStorage.getItem('planetray_favs')) || {},
  },
  reducers: {
    toggleIsFavorite: (state, action) => {
      const favoriteBodies = {...state.favorites};
      favoriteBodies[action.payload] = !state.favorites[action.payload];
      state.favorites = favoriteBodies;
      localStorage.setItem('planetray_favs', JSON.stringify(favoriteBodies));
    },
    setActiveBody: (state, action) => {
      state.activeBody = action.payload;
    },

    fetchBodiesPending: state => {
      state.loading = true;
      state.bodies = {};
      state.ids = [];
    },
    fetchBodiesSuccess: (state, action) => {
      state.bodies = action.payload.bodies;
      state.ids = action.payload.ids;
      state.loading = false;

    },
    fetchBodiesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchImagesPending: state => {
      state.images = {};
    },
    fetchImagesSuccess: (state, action) => {
      state.images = action.payload;
    },
    fetchImagesError: (state, action) => {
      state.error = action.payload;
    },
    selectShow: (state, action) =>{
      state.selectedShow = action.payload;
    },
    unselectShow: state => {
      state.selectedShow = null;
    }
  },
});

export const { toggleIsFavorite, setActiveBody, fetchBodiesPending, fetchBodiesSuccess, fetchBodiesError,fetchImagesPending, fetchImagesSuccess, fetchImagesError, selectShow, unselectShow } = SolarSystemSlice.actions;

export const SelectPlanets = state => {
  return state.solarSystem.solarSystem.filter((body)=>body.isPlanet);
};
export const SelectMoons = state => {
  return state.solarSystem.solarSystem.filter((body)=>!body.isPlanet);
};

export const toggleFavorite = SolarSystemSlice.actions.toggleIsFavorite;

export const SelectPlanetaryImages = state => state.solarSystem.images;
export const SelectBodies = state => state.solarSystem.bodies;
export const SelectBodyIds = state => state.solarSystem.ids;

export const SelectLoading = state => state.solarSystem.loading;
export const SelectFavorites = state => state.solarSystem.favorites;
export const SelectActiveBody = state => state.solarSystem.activeBody;



export const fetchImages = () => (dispatch) => {
  const localImages = localStorage.getItem('planetary_images');
  dispatch(fetchImagesPending());
  if(!localImages){
    fetch(`${PLANETS_PHOTOS_MOCK_URL}`)
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('planetary_images', JSON.stringify(res));
      dispatch(fetchImagesSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchImagesError(error));
    });
  } else {
    dispatch(fetchImagesSuccess(JSON.parse(localImages)));
  }
};


export const fetchBodies = query => (dispatch, getState) => {
  const localBodies = localStorage.getItem('planetary_bodies');
  const localBodyIds = localStorage.getItem('planetary_body_ids');
  dispatch(fetchBodiesPending());
  if(!localBodies && !localBodyIds){
    fetch(`${PLANETS_API_EXCLUDED}`)
    .then(res => res.json())
    .then(res => {

      const bodies = {};
      const ids = res.bodies.map((body)=>{
        bodies[body.id] = body;
        return body.id;
      });

      localStorage.setItem('planetary_bodies', JSON.stringify(bodies));
      localStorage.setItem('planetary_body_ids', JSON.stringify(ids));
  
        dispatch(fetchBodiesSuccess({bodies, ids}));

      
      dispatch(fetchImages());
      return res.bodies;
    })
    .catch(error => {
      dispatch(fetchBodiesError(error));
    });
  } else {
 
      dispatch(fetchBodiesSuccess({bodies:JSON.parse(localBodies), ids:JSON.parse(localBodyIds)}));  
 
    dispatch(fetchImages());
  }
};

export const fetchAsync = query => dispatch => {
  setTimeout(() => {
    dispatch(fetchBodies(query));
  }, 1000);
};



export default SolarSystemSlice.reducer;
