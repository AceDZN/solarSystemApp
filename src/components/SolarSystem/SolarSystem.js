import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SolarList from '../SolarList/SolarList';
import Controls from '../Controls/Controls';
import SolarModal from '../SolarModal/SolarModal';
import SolarIllustration from '../SolarIllustration/SolarIllustration';

import {
  SelectBodyIds,
  fetchBodies,
  setActiveBody,
  SelectActiveBody,
  SelectBodies
} from './SolarSystemSlice';

import styles from './SolarSystem.module.scss';

export function SolarSystem() {
  const bodyIds = useSelector(SelectBodyIds);
  const bodies = useSelector(SelectBodies);
  const activeBody = useSelector(SelectActiveBody);
  const [filteredBodies, setFilteredBodies] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchBodies());
  },[dispatch]);

  useEffect(()=>{
    setFilteredBodies(bodyIds);

  },[bodyIds]);

  const handlePlanetClick = (planet)=>{

    dispatch(setActiveBody(bodies[planet]));
  }

  return (
    <div className={styles.wrap}>
      {activeBody.id ? <SolarModal body={activeBody} /> : null}
      <Controls setFilteredItems={setFilteredBodies} />
      <div className={styles.row}>
        <SolarList ids={filteredBodies} />
      </div>
      <SolarIllustration setPlanet={handlePlanetClick} />
    </div>
  );
}