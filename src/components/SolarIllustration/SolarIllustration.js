import React from 'react';
import styles from './SolarIllustration.module.scss';

export default function SolarIllustration({setPlanet}) {
  const handlePlanetClick = (planet)=>{
    setPlanet(planet);
  }
  return (
    <div  className={styles.universe}>
      <div className={styles.stars}></div>
      <div className={styles.planets}>
        <div className={styles.sun} onClick={handlePlanetClick.bind(this, 'soleil')}></div>
        <div className={styles.mercury} onClick={handlePlanetClick.bind(this, 'mercure')}></div>
        <div className={styles.venus} onClick={handlePlanetClick.bind(this, 'venus')} ></div>
        <div className={styles.earth} onClick={handlePlanetClick.bind(this, 'terre')}> </div>
        <div className={styles.mars} onClick={handlePlanetClick.bind(this, 'mars')}> </div>
        <div className={styles.jupiter} onClick={handlePlanetClick.bind(this, 'jupiter')}></div>
        <div className={styles.saturn} onClick={handlePlanetClick.bind(this, 'saturne')}></div>
        <div className={styles.uranus} onClick={handlePlanetClick.bind(this, 'uranus')}></div>
        <div className={styles.neptune} onClick={handlePlanetClick.bind(this, 'neptune')}></div>
        <div className={styles.pluto} onClick={handlePlanetClick.bind(this, 'pluton')}></div>
      </div>
    </div>
  );
}
