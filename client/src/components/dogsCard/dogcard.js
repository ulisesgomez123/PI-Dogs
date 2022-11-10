import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './dogsCard.module.css'

export default function DogCard ({weightImperial,weightMetric, temperament, name, img, id}) {
    return ( 
      <div className={style.card} >
        <div className={style.cardBody}>
          <NavLink to={`/dog/${id}`}> 
           <h2>{name}</h2>
           </NavLink>
          <div>

            <div>
             Temperament: <p>{temperament}</p>
            </div>

            <div>
            weight:
            <p>kilograms: {weightMetric}</p>
            <p>pounds: {weightImperial}</p>
            </div>

            <div >
              <img className={style.img} src={img} alt='dog image'/>
            </div>

          </div>
        </div>
      </div>
    );
}