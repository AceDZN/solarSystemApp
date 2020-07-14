import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectBodies, SelectFavorites, SelectBodyIds } from '../SolarSystem/SolarSystemSlice';
import styles from './Controls.module.scss';

const Controls = (props) => {
  const bodies = useSelector(SelectBodies);
  const bodyIds = useSelector(SelectBodyIds);
  const favorites = useSelector(SelectFavorites);
  const [searchQuery, setSearchQuery] = useState('');

  const [activeFilter, setActiveFilter] = useState({});

  const {setFilteredItems} = props;

  const handleQueryChange = (event)=>{
    setActiveFilter('');
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredItems(filterByName.bind(this, query));
  }
  
  const filterByName = (query)=>bodyIds.filter((id)=>bodies[id].englishName.toLowerCase().includes(query.toLowerCase()));
  const filterByPlanet = (val)=>bodyIds.filter((id)=>bodies[id].isPlanet === val);
  const filterByFavorites = ()=>bodyIds.filter((id) => {
    return !!favorites[id]
  });


  const resetFilters = ()=>{
    setFilteredItems(bodyIds);
    setActiveFilter('');
  }

  const handleIsPlanetClick = ()=>{
    
    if(activeFilter === 'planets' ){
      resetFilters();
    } else {
      setActiveFilter('planets');
      setFilteredItems(filterByPlanet.bind(this, true));
    }
  }
  
  const handleNotPlanetClick = ()=>{
    if(activeFilter === 'not-planets' ){
      resetFilters();
    } else {
      setActiveFilter('not-planets');
      setFilteredItems(filterByPlanet.bind(this, false));
    }
  }

  const handleFavoritesClick = ()=>{
    if(activeFilter === 'favorites' ){
      resetFilters();
    } else {
      setActiveFilter('favorites');
      setFilteredItems(filterByFavorites);  
    }
  }

  return (
    <div className={styles.wrap}>
      <input type="text" value={searchQuery} onChange={handleQueryChange} />
      <button className={`${styles.button} ${activeFilter === 'planets' ? styles.active : ''}`} onClick={handleIsPlanetClick}>Planets</button>
      <button className={`${styles.button} ${activeFilter === 'not-planets' ? styles.active : ''}`} onClick={handleNotPlanetClick}>Not-planets</button>
      <button className={`${styles.button} ${activeFilter === 'favorites' ? styles.active : ''}`} onClick={handleFavoritesClick}>Favorites</button>

    </div>
  )
}

export default Controls