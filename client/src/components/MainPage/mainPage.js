import React from "react";
import {getDogs} from '../../redux/actions';
import { getDogByName } from "../../redux/actions";
import DogCard from "../dogsCard/dogcard";
import style from './mainPage.module.css'
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 


export default function MainPage () {
  let dispatch= useDispatch();
  let dogsloadedBySearch= useSelector( state => state.dogsloadedBySearch);
  let dogsloaded= useSelector( state => state.dogsLoaded);
  let createdDogs= useSelector( state => state.createdDogs);

  React.useEffect(()=>{
    dispatch(getDogs())
  },[]) 

  const [search,setSearch] = React.useState({
    value: ''
  })
 
   function  handleChange(e)  {
    setSearch((prevState) => {return {...prevState,
      value: e.target.value
     }
   })
    }
    

     function  searchFaction () {
      console.log(search.value)
      // dispatch(getDogByName(search.value))
    }

      return (
         
        <div>
             <NavLink className={style.link} to='/dogs/creation'><p>Create Dog</p></NavLink>
             <div>
            <input onChange={e => handleChange(e)}></input> <button onClick={() => searchFaction()}>Search</button> 
            </div>
            
        <div className={style.container}>
        {createdDogs?.map( d => 
                <DogCard 
                name={d.breed}
                key={d.id}
                weightMetric={d.weight}
                temperament={d.temperament}
                id={d.id}
                />
            )}

        {dogsloadedBySearch[0] ? dogsloadedBySearch.map( d => 
                <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                temperament={d.temperament}
                id={d.id}
                />
            ) : dogsloaded?.map( d => 
              <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                img={d.imageUrl}
                temperament={d.temperament}
                id={d.id}
                />
          )}
           
        </div>
        </div>
        
      );
    }
  
  
 


  