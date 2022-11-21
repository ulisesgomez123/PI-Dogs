import React from "react";
import {getDogs,getTemperaments} from '../../redux/actions';
import { getDogByName } from "../../redux/actions";
import DogCard from "../dogsCard/dogcard";
import style from './mainPage.module.css'
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 
import {buttonTemperaments,handleChangeSelect,next,dogCard,filter
       ,nextFilter,order,previous} from '../functions';

function MainPage () {
  let dispatch= useDispatch();
  let dogsloadedBySearch= useSelector( state => state.dogsloadedBySearch);
  let dogsloaded= useSelector( state => state.dogsLoaded);
  let createdDogs= useSelector( state => state.createdDogs);
  let temperaments= useSelector( state => state.temperaments);

  const [mainPage,setMainPage] = React.useState({
    beginning: true,
    value: '',
    currentPage: 1,
    dogs:[],
    numOfDogsCreated: createdDogs.length,
    prev: false,
    alphabetical: true,
    byWeight: false,
    ascending: true,
    descending: false,
    orderByWeightAscending: false,
    orderByWeightDescending: false,
    temperaments: false,
    switch: [false,false]})
  
  React.useEffect( ()=>{
    dispatch(getDogs())
    dispatch(getTemperaments())
   },[]) 

  React.useEffect( ()=>{
    order(mainPage,setMainPage,dogsloaded)
   },[mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong,mainPage.temperaments]) 

   React.useEffect( ()=>{
   filter(mainPage,setMainPage,dogsloaded)
   },[mainPage.temperamentString,mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong]) 

   function  handleChange (e)  {
    setMainPage((prevState) => {return {...prevState,
      value: e.target.value
     }
   })
  }
    
  function  searchFunction () {
      dispatch(getDogByName(mainPage.value))
      setMainPage((prevState) => {return {...prevState,
        value: ''
       }
     })
    }

    function onChange (e) {
     if (e.target.value === 'alphabetical') {
      setMainPage((prevState) => {return {...prevState,
        alphabetical: true,
        byWeight: false
       } 
     })
   }
     if (e.target.value === 'by weight') {
      setMainPage((prevState) => {return {...prevState,
        byWeight: true,
        alphabetical: false,
       } 
     })
    }
  }

    function onChangeDirection (e) {
      if (e.target.value === 'ascending') {
        setMainPage((prevState) => {return {...prevState,
          ascending: true,
          descending: false,
          beginning: false,
         } 
       })
      }
      if (e.target.value === 'descending') {
        setMainPage((prevState) => {return {...prevState,
          ascending: false,
          descending: true,
          beginning: false,
         } 
       })
      }
    }
      return ( 
        <div>
          <h1>Pagina: {mainPage.currentPage}</h1>
          {mainPage.dogsFiltered ? mainPage.dogsFiltered[0] ? mainPage.dogsFiltered.length > 8 ? 
          <button onClick={()=>previous(mainPage,setMainPage)}> previous</button > : null : 
          <button onClick={()=>previous(mainPage,setMainPage)}>previous</button> : 
          <button onClick={()=>previous(mainPage,setMainPage)}>previous</button>}

          {mainPage.dogsFiltered ? mainPage.dogsFiltered[0] ? mainPage.dogsFiltered.length > 8 ? 
          <button onClick={()=>nextFilter(mainPage,setMainPage)}>next</button> : null : 
          <button onClick={()=>next(mainPage,setMainPage,dogsloaded)}>next</button> : 
          <button onClick={()=>next(mainPage,setMainPage,dogsloaded)}>next</button>}

          <select onChange={(e) => onChange(e)}>
             <option value='alphabetical'>Alphabetical</option>
             <option value='by weight'>By weight</option>
          </select>

          <select onChange={(e) => onChangeDirection(e)}>
             <option value='ascending'>Ascending</option>
             <option value='descending'>Descending</option>
          </select>

          <button onClick={previous}>Made dogs</button>
          <button >Not made dogs</button>

          <button onClick={() =>buttonTemperaments(setMainPage)}> Dog temperaments</button>

          {mainPage.temperaments ? <select onChange={(e)=>handleChangeSelect(e,setMainPage,mainPage)}>
          <option key='0'>Temperaments </option> {temperaments?.map(t => <option value={t.name} 
           key={t.id}>{t.name}</option>)}</select> : null }

          {mainPage.dogsFiltered && mainPage.switch[0] && mainPage.switch[1] ? 
          <h2> Found dogs: {mainPage.dogsFiltered.length} </h2> : null }
  
          <NavLink className={style.link} to='/dogs/creation'><p>Create Dog</p></NavLink>
        <div>
            <input value={mainPage.value} onChange={e => handleChange(e)}></input><button 
            onClick={() => searchFunction()}>Search</button>{dogsloadedBySearch[0] ? <button
            onClick={() => searchFunction()}>back home</button> : null}
        </div>
            
        <div className={style.container}>
        {dogsloadedBySearch[0] ? null : mainPage.currentPage === 1 ? createdDogs?.map( d => 
                <DogCard 
                name={d.breed}
                key={d.id}
                weightMetric={d.weight}
                temperament={d.temperament}
                id={d.id}
                />
            ) : null
         }
            {mainPage.dogsFiltered && !mainPage.prev ? mainPage.nextDogs && !mainPage.prev ?
             mainPage.nextDogs?.map( d => dogCard(d)) 
             : [...mainPage.dogsFiltered]?.splice(0,8).map( d => dogCard(d)) 
             : dogsloadedBySearch[0] ? dogsloadedBySearch.map( d => dogCard(d))
             : mainPage.prev ? mainPage.prevDogs?.map( d => dogCard(d))
             : mainPage.nextDogs ? mainPage.nextDogs?.map( d => dogCard(d)) 
             : mainPage.alphabetical && mainPage.descending ?
             [...mainPage.dogs]?.slice(0,8-mainPage.numOfDogsCreated).map( d => dogCard(d)) :
             [...dogsloaded]?.slice(0,8-mainPage.numOfDogsCreated).map( d => dogCard(d))
            } 
        </div>
    </div>
        
      );
    }
    export default MainPage