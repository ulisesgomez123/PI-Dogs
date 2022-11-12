import React from 'react';
import style from '../dogsCard/dogsCard.module.css'

export default function DogDetailCard ({weightImperial,weightMetric,temperament,name,img,heightMetric,heightImperial,lifeSpan}) {
    return ( 
      <div className={style.card} >
        <div className={style.cardBody}>
        
           <h2>{name}</h2>
    
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

            <div>
            height:
            <p>cm: {heightMetric}</p>
            <p>inch: {heightImperial}</p>
            </div>

            <div>
             Life Span: <p>{lifeSpan}</p>
            </div>

          </div>
        </div>
      </div>
    );
}