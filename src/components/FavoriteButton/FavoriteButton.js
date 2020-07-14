import React from 'react';
import {ReactComponent as FavoriteIcon} from './stars.svg';
import styles from './FavoriteButton.module.scss';


const FavoriteButton = ({ isFavorite, onClick, relative }) => <FavoriteIcon onClick={onClick} className={`${styles.favorite} ${relative ? styles.relative : ''} ${isFavorite ? styles.active : ''}`}/>


export default FavoriteButton