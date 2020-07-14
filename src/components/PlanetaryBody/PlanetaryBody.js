import React from 'react';
import styles from './PlanetaryBody.module.scss';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useSelector, useDispatch } from 'react-redux';

import {
  SelectBodies,
  toggleFavorite,
  SetActiveBody,
  SelectFavorites
} from '../SolarSystem/SolarSystemSlice';

const PlanetaryBody = (props)=>{
  const {id, englishName, isPlanet, moons, discoveredBy, discoveryDate, aroundPlanet, image} = props;
  const favorites = useSelector(SelectFavorites);
  const bodies = useSelector(SelectBodies);
  const dispatch = useDispatch();

  const handleFavoritesToggle = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  }

  const handleClickOnBody = ()=>{
    dispatch(SetActiveBody(bodies[props.id]));
  }

  return (
    <div className={`${styles.planetaryBody} ${image ? styles.hasImage : ''}`} onClick={ handleClickOnBody }>
      {image ? (
        <div className={styles.image}>
          <img src={image} alt={englishName} />
        </div>
      ) : null }
      
      <div className={`${styles.info} ${image ? styles.hasImage : ''}`}>
        <h3>{englishName}</h3>
        <ul className={styles.list}>
          {isPlanet ? (
            <li><span className={styles.label}>{moons ? "Moons:" : "No Moons"}</span> {moons ? moons.length : ''}</li>
          ) : (
            <li><span className={styles.label}>{aroundPlanet ? "Around Planet:" : "No Planets"}</span> {aroundPlanet ? aroundPlanet.planet : ''}</li>
            )}
          {discoveredBy ? (
            <li><span className={styles.label}>Discovered by:</span> {discoveredBy} ({discoveryDate})</li>
          ) : null }
        </ul>
      </div>
      <FavoriteButton isFavorite={!!favorites[id]} onClick={handleFavoritesToggle} />
    </div>
  )
}

export default PlanetaryBody