import React from "react";
import {getDogs} from '../../redux/actions';
import { getDogByName } from "../../redux/actions";
import DogCard from "../dogsCard/dogcard";
import style from './mainPage.module.css'
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 


function MainPage () {
  let dispatch= useDispatch();
  let dogsloadedBySearch= useSelector( state => state.dogsloadedBySearch);
  let dogsloaded= useSelector( state => state.dogsLoaded);
  let createdDogs= useSelector( state => state.createdDogs);

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
  })
  
  React.useEffect( ()=>{
    dispatch(getDogs())
   },[]) 

  React.useEffect( ()=>{
    order()
   },[mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong]) 

  

   function  handleChange(e)  {
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

     function next() {
      var index= mainPage.currentPage * 8 - mainPage.numOfDogsCreated;
      if (mainPage.alphabetical && mainPage.descending) {
        if (!mainPage.storage[0]) {
          console.log('aaaaa')
         setMainPage((prevState) => {return {...prevState,
          nextDogs: mainPage.dogs?.splice(index,8),
          currentPage: mainPage.currentPage + 1,
          storage: mainPage.dogs?.splice(0,8 - mainPage.numOfDogsCreated),
          prev: false,} 
      });
    }
    else {
      console.log('bbbbb')
      setMainPage((prevState) => {return {...prevState,
       nextDogs: mainPage.dogs?.splice(index,8),
       currentPage: mainPage.currentPage + 1,
       storage: [...mainPage.storage,...mainPage.nextDogs],
       prev: false,} 
   });
 }
}
      if (mainPage.alphabetical && mainPage.ascending) {
        if (!mainPage.storage[0]) {
          console.log('kkkkk')
          setMainPage((prevState) => {return {...prevState,
            nextDogs: dogsloaded?.splice(index, 8),
            currentPage: mainPage.currentPage + 1,
            storage: dogsloaded.splice(0, 8 -  mainPage.numOfDogsCreated),
            prev: false,
           } 
         })
        }
     else {
      console.log('jjjjj')
      setMainPage((prevState) => {return {...prevState,
        nextDogs:dogsloaded?.splice(index, 8),
        storage: [...mainPage.storage,...mainPage.nextDogs],
        currentPage: mainPage.currentPage + 1,
        prev: false,
       } 
     })
    }
    }
  }
     function previous() {
      var index= mainPage.currentPage * 8 - 8*2
      if (mainPage.currentPage !== 2) {
        setMainPage((prevState) => {return {...prevState,
          prevDogs: mainPage.storage.splice(index, 8),
          currentPage: mainPage.currentPage - 1,
          prev: true,
         } 
       })
      }
      else {
        setMainPage((prevState) => {return {...prevState,
          prevDogs: mainPage.storage.splice(0,8),
          currentPage: mainPage.currentPage - 1,
          prev: true,
         } 
       })
      }
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

    function order () {
       if (mainPage.alphabetical) {
         if (mainPage.ascending) {
          if (mainPage.beginning) {
            setMainPage((prevState) => {return {...prevState,
              storage: [],
             };})
          }
           else {
            setMainPage((prevState) => {return {...prevState,
              nextDogs: dogsloaded?.slice(0,8 - mainPage.numOfDogsCreated),
              currentPage: 1,
              storage: [],
             };})
           } 
         }
         if (mainPage.descending) {
            setMainPage((prevState) => {return {...prevState,
              dogs: [...dogsloaded].reverse(),
              nextDogs: [...dogsloaded].reverse().slice(0,8 - mainPage.numOfDogsCreated),
              currentPage: 1,
              storage: [],
             };})
          }
       }
       else if (mainPage.byWeight) {
         
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
          <button onClick={previous}>previous</button>
          <button onClick={next}>next</button>
          <select onChange={(e) => onChange(e)}>
             <option value='alphabetical'>Alphabetical</option>
             <option value='by weight'>By weight</option>
          </select>

          <select onChange={(e) => onChangeDirection(e)}>
             <option value='ascending'>Ascending</option>
             <option value='descending'>Descending</option>
          </select>
          
             <NavLink className={style.link} to='/dogs/creation'><p>Create Dog</p></NavLink>
             <div>
            <input value={mainPage.value} onChange={e => handleChange(e)}></input> <button onClick={() => searchFunction()}>Search</button> 
            {dogsloadedBySearch[0] ? <button onClick={() => searchFunction()}>back home</button> : null}
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

        {dogsloadedBySearch[0] ? dogsloadedBySearch.map( d => 
                <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                temperament={d.temperament}
                img= {d.imageUrl}
                id={d.id}
                />)
               : mainPage.prev ? mainPage.prevDogs?.map( d => 
              <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                img={d.imageUrl}
                temperament={d.temperament}
                id={d.id}
                />)
               : mainPage.nextDogs ? mainPage.nextDogs?.map( d => 
              <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                img={d.imageUrl}
                temperament={d.temperament}
                id={d.id}
                />) 
             : mainPage.alphabetical && mainPage.descending ?
             mainPage.dogs?.slice(0,8-mainPage.numOfDogsCreated).map( d => 
              <DogCard 
               name={d.name}
               key={d.id}
               weightMetric={d.weightMetric}
               weightImperial={d.weightImperial}
               img={d.imageUrl}
               temperament={d.temperament}
               id={d.id}
               />) :
              dogsloaded?.slice(0,8-mainPage.numOfDogsCreated).map( d => 
             <DogCard 
              name={d.name}
              key={d.id}
              weightMetric={d.weightMetric}
              weightImperial={d.weightImperial}
              img={d.imageUrl}
              temperament={d.temperament}
              id={d.id}
              />)
              } 

        </div>
        </div>
        
      );
    }
    export default MainPage
  
 


  