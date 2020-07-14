import React from 'react';
import styles from './SolarModal.module.scss';
import {ReactComponent as CloseIcon} from './close.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectBodies,
  SelectPlanetaryImages,
  SetActiveBody,
  SelectFavorites,
  toggleFavorite
} from '../SolarSystem/SolarSystemSlice';

import FavoriteButton from '../FavoriteButton/FavoriteButton';



const SolarModal = ({ body, isVisible }) => {
  const dispatch = useDispatch();
  const bodies = useSelector(SelectBodies);
  const images = useSelector(SelectPlanetaryImages);
  const favorites = useSelector(SelectFavorites);

  const {id, englishName, isPlanet, aroundPlanet, moons, discoveredBy, discoveryDate, meanRadius, gravity, density, sideralOrbit} = body;
  
  const handleCloseModal = ()=>{
    dispatch(SetActiveBody({}));
  }

  const handleBodyClick = (body)=>{
    const bodyToSelect = bodies[body.rel.replace('https://api.le-systeme-solaire.net/rest/bodies/','')];
    dispatch(SetActiveBody(bodyToSelect));
  }
  

  const handleModalClick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
  }
  
  const handleFavoritesToggle = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  }


  return (
  <>
  <div className={styles.overlay} onClick={handleCloseModal}>
    <div className={`${styles.modal} ${isPlanet ? styles.planet : styles.notPlanet }`} onClick={handleModalClick}>
      <div className={styles.header}>
        <FavoriteButton relative={true} isFavorite={!!favorites[id]} onClick={handleFavoritesToggle} />
        <h1>{englishName}</h1>
        <CloseIcon onClick={handleCloseModal} className={styles.close} />
        
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <ul className={styles.list}>

            {meanRadius ? (
              <li className={styles.row}><span className={styles.label}>Mean Radius:</span> {meanRadius} </li>
            ) : null }
            {gravity ? (
              <li className={styles.row}><span className={styles.label}>Gravity:</span> {gravity} </li>
            ) : null }
            {density ? (
              <li className={styles.row}><span className={styles.label}>Density:</span> {density} </li>
            ) : null }

            {sideralOrbit ? (
              <li className={styles.row}><span className={styles.label}>Sideral Orbit:</span> {sideralOrbit} </li>
            ) : null }

            {discoveredBy ? (
              <li className={styles.row}><span className={styles.label}>Discovered by:</span> {discoveredBy} ({discoveryDate})</li>
            ) : null }


            {isPlanet ? (
              <li className={styles.row}><span className={styles.label}>{moons ? "Moons:" : "No Moons"}</span>
                {moons ? <ul>
                  {moons && moons.length ? moons.map((item, index)=>(
                    <li key={item.rel}><span onClick={handleBodyClick.bind(this, item)}>{item.moon}{index < moons.length -1 ? ',':''}</span></li>
                  )) : ""}
                </ul> : null}
              </li>
            ) : (
              <li className={styles.row}><span className={styles.label}>{aroundPlanet ? "Around Planet:" : "No Planets"}</span>
                {aroundPlanet ? (
                  <ul>
                      <li key={aroundPlanet.rel}><span onClick={handleBodyClick.bind(this, aroundPlanet)}>{aroundPlanet.planet}</span></li>
                  </ul>
                ) : null}
              </li>

              )}
            






          </ul>
        </div>

        {images[id] ? (
          <div className={styles.image}>
            <img src={images[id]} alt={englishName} />
          </div>
        ) : null }
      </div>
    </div>
  </div>
    
  </>
  )
}


export default SolarModal