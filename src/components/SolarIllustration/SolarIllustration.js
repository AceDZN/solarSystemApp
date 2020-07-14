import React from 'react';
import styles from './SolarIllustration.module.scss';

export function SolarIllustration() {
  
  return (
    <div className={styles.universe}>
      <div className={styles.stars}></div>
      <div className={styles.planets}>
        <div className={styles.sun}></div>
        <div className={styles.mercury}></div>
        <div className={styles.venus}></div>
        <div className={styles.earth}> </div>
        <div className={styles.mars}> </div>
        <div className={styles.jupiter}></div>
        <div className={styles.saturn}></div>
        <div className={styles.uranus}></div>
        <div className={styles.neptune}></div>
        <div className={styles.pluto}></div>
      </div>
    </div>
  );
}
