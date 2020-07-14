import React from 'react';
//import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useSelector } from 'react-redux';

import {
  SelectPlanetaryImages,
  SelectBodies,
  SelectLoading
} from '../SolarSystem/SolarSystemSlice';
import PlanetaryBody from '../PlanetaryBody/PlanetaryBody';
import styles from './SolarList.module.scss';

const SolarList = ({ids})=>{
  const images = useSelector(SelectPlanetaryImages);
  const bodies = useSelector(SelectBodies);
  const loading = useSelector(SelectLoading);
  if(ids && ids.length){
    return (
      <div className={styles.list}>
        {ids.map((id)=>(
            <PlanetaryBody key={id} {...bodies[id]} image={images[id]} />
        ))}
      </div>
    )
  } else {
    return (
      <h1 className={styles.noResults}>
        {loading ? 'Loading' : ''}
        {!loading && !ids.length ? 'Sorry, nothing here....' : null}
      </h1>
    )
  }
}

export default SolarList;


/*
<TransitionGroup className={styles.list}>
  {bodies.map((body)=>(
    <CSSTransition
        key={body.id}
        timeout={500}
        classNames="item"
      >
      <PlanetaryBody {...body} image={images[body.id]} />
    </CSSTransition>
  ))}
</TransitionGroup>
*/