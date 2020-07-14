import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SolarList from '../SolarList/SolarList';
import Controls from '../Controls/Controls';
import SolarModal from '../SolarModal/SolarModal';

import {
  SelectBodyIds,
  fetchBodies,
  SelectActiveBody
} from './SolarSystemSlice';
import styles from './SolarSystem.module.scss';

export function SolarSystem() {
  const bodyIds = useSelector(SelectBodyIds);
  const activeBody = useSelector(SelectActiveBody);
  const [filteredBodies, setFilteredBodies] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchBodies());
  },[dispatch]);

  useEffect(()=>{
    setFilteredBodies(bodyIds);

  },[bodyIds]);


  return (
    <div>
      {activeBody.id ? <SolarModal body={activeBody} /> : null}
      <div className={styles.row}>
        <Controls setFilteredItems={setFilteredBodies} />
      </div>
      <div className={styles.row}>
        <SolarList ids={filteredBodies} />
      </div>
      
    </div>
  );
}