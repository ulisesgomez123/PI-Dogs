import DogCard from "../dogsCard/dogcard";

export function orderByWeight (dogsLoaded) {
  const splited = dogsLoaded.map(d => {
    return {...d,split: d.weightMetric.split(' - ')}
  })
const noFiltered = splited.map(d => {
    return {...d, averageWeight: (parseInt(d.split[0]) + parseInt(d.split[1])) / 2} 
 }).sort(function(a, b) {
    if(a.averageWeight < b.averageWeight) { return -1; }
    if(a.averageWeight > b.averageWeight) { return 1; }
    return 0;
})
return noFiltered.filter(d => !isNaN(d.averageWeight))
}


export function buttonTemperaments (changeState) {
    changeState((prevState) => {return {...prevState,
        temperaments: true,
        beginning: false,
        switch: [true],
        madeDogs: [true,true]
       } 
     })
}

 function selectionTemperament (state,dogs) {
    if (state.beginning) return
    let Dogs = [...dogs].filter(d => d.temperament?.includes(state.temperamentString))
    return Dogs
    }

export function handleChangeSelect (e,changeState) {
    changeState((prevState) => {return {...prevState,
        temperamentString: e.target.value,
        currentPage: 1,
        nextDogs:'',
        switch: [true,true],
        madeDogs: [true,true]
       } 
     })
  }

  export function next (state,changeState,dogs) {
    if (state.currentPage > 21) return
    var index= state.currentPage * 8 - state.numOfDogsCreated;
    if (state.alphabetical && state.descending) {
      if (!state.storage[0]) {
        console.log('aaaaa')
       changeState((prevState) => {return {...prevState,
        nextDogs: [...state.dogs]?.splice(index,8),
        currentPage: state.currentPage + 1,
        storage: [...state.dogs]?.splice(0,8 - state.numOfDogsCreated),
        prev: false,} 
    });
  }
  else {
    console.log('bbbbb')
    changeState((prevState) => {return {...prevState,
     nextDogs: [...state.dogs]?.splice(index,8),
     currentPage: state.currentPage + 1,
     storage: [...state.storage,...state.nextDogs],
     prev: false,} 
 });
}
}
    if (state.alphabetical && state.ascending) {
      if (!state.storage[0]) {
        console.log('kkkkk')
        changeState((prevState) => {return {...prevState,
          nextDogs: [...dogs]?.splice(index, 8),
          currentPage: state.currentPage + 1,
          storage: [...dogs]?.splice(0, 8 -  state.numOfDogsCreated),
          prev: false,
         } 
       })
      }
   else {
    console.log('jjjjj')
    changeState((prevState) => {return {...prevState,
      nextDogs: [...dogs]?.splice(index, 8),
      storage: [...state.storage,...state.nextDogs],
      currentPage: state.currentPage + 1,
      prev: false,
     } 
   })
  }
  }

  if (state.byWeight && state.ascending) {
    if (!state.storage[0]) {
      console.log('ooooooooo')
      changeState((prevState) => {return {...prevState,
        nextDogs: [...state.orderByWeightAscending].splice(index,8),
        currentPage: state.currentPage + 1,
        storage: [...state.nextDogs],
        prev: false,
       } 
     })
    }
 else {
  console.log('uuuuuuuuu')
  changeState((prevState) => {return {...prevState,
    nextDogs:[...state.orderByWeightAscending].splice(index, 8),
    storage: [...state.storage,...state.nextDogs],
    currentPage: state.currentPage + 1,
    prev: false,
   } 
 })
}
}
if (state.byWeight && state.descending) {
  if (!state.storage[0]) {
    console.log('ooooooooo')
    changeState((prevState) => {return {...prevState,
      nextDogs: [...state.orderByWeightDescending].splice(index,8),
      currentPage: state.currentPage + 1,
      storage: [...state.nextDogs],
      prev: false,
     } 
   })
  }
else {
console.log('uuuuuuuuu')
changeState((prevState) => {return {...prevState,
  nextDogs:[...state.orderByWeightDescending].splice(index, 8),
  storage: [...state.storage,...state.nextDogs],
  currentPage: state.currentPage + 1,
  prev: false,
       } 
    })
   }
  }
}

export function dogCard (d) {
    return <DogCard 
    name={d.name}
    key={d.id}
    weightMetric={d.weightMetric}
    weightImperial={d.weightImperial}
    temperament={d.temperament}
    img= {d.imageUrl}
    id={d.id}
    />
}

export function filter (state,changeState,dogs) {
    if (state.alphabetical) {
    if (state.ascending) {
        changeState((prevState) => {return {...prevState,
            dogsFiltered: selectionTemperament(state,dogs)
          } 
        })
      }
    if (state.descending) {
        changeState((prevState) => {return {...prevState,
            dogsFiltered: selectionTemperament(state,dogs).reverse()
        } 
      })
    }
}
    if (state.byWeight) {
        if (state.ascending) {
            changeState((prevState) => {return {...prevState,
                dogsFiltered: selectionTemperament(state,state.orderByWeightAscending)
              } 
            })
        }
        if (state.descending) {
            changeState((prevState) => {return {...prevState,
                dogsFiltered: selectionTemperament(state,state.orderByWeightAscending).reverse()
              } 
            })
        }
    }
}

export function nextFilter (state,changeState) {
    console.log('1')
    var index = state.currentPage * 8 
    if (state.temperaments && state.currentPage === 1) {
        console.log('1.a')
        changeState((prevState) => {return {...prevState,
            nextDogs: [...state.dogsFiltered]?.splice(index,8),
            storage: [...state.dogsFiltered]?.splice(0,8),
            currentPage: state.currentPage + 1,
            prev: false,
          } 
        })
    }
    else {
        console.log('2.a')
        changeState((prevState) => {return {...prevState,
            nextDogs: [...state.dogsFiltered]?.splice(index,8),
            storage: [...state.storage,...state.nextDogs],
            currentPage: state.currentPage + 1,
            prev: false
          } 
        })
    }
}

export function order (state,changeState,dogs) {
    changeState((prevState) => {return {...prevState,
        orderByWeightAscending: orderByWeight(dogs)
       };})
     if (state.temperaments && state.switch[0]) {
      changeState((prevState) => {return {...prevState,
        orderByWeightAscending: orderByWeight(dogs)
       };})
    }
    else if (state.alphabetical) {
       if (state.ascending) {
        if (state.beginning) {
          changeState((prevState) => {return {...prevState,
            storage: [],
           };})
        }
         else {
          changeState((prevState) => {return {...prevState,
            nextDogs: [...dogs].slice(0,8 - state.numOfDogsCreated),
            currentPage: 1,
            storage: [],
           };})
         } 
       }
       if (state.descending) {
          changeState((prevState) => {return {...prevState,
            dogs: [...dogs].reverse(),
            nextDogs: [...dogs].reverse().slice(0,8 - state.numOfDogsCreated),
            currentPage: 1,
            storage: [],
           };})
        }
     }
     else if (state.byWeight) {
      if (state.ascending) {
      if (state.beginning) {
        console.log('estas en beginning')
        changeState((prevState) => {return {...prevState,
          nextDogs: orderByWeight(dogs).slice(0,8 - state.numOfDogsCreated),
          beginning: false,
          currentPage: 1,
         };})
      }
       else {
        console.log('estas en started')
        changeState((prevState) => {return {...prevState,
          nextDogs: [...state.orderByWeightAscending].slice(0,8 - state.numOfDogsCreated),
          currentPage: 1,
          storage: [],
         };})
       } 
     }
      if (state.descending) {
      changeState((prevState) => {return {...prevState,
        orderByWeightDescending: [...state.orderByWeightAscending]?.reverse(),
        nextDogs: [...state.orderByWeightAscending].reverse().splice(0,8 - state.numOfDogsCreated),
        currentPage: 1,
        storage: [],
       };})
    }
  }
}

export function previous(state,changeState) {
  if (state.currentPage <= 1) return 
    var index= state.currentPage * 8 - 8*2
    if (state.currentPage !== 2) {
          changeState((prevState) => {return {...prevState,
            prevDogs: [...state.storage]?.splice(index, 8),
            currentPage: state.currentPage - 1,
            prev: true,
           } 
         })
        }
    else{
          changeState((prevState) => {return {...prevState,
            prevDogs: [...state.storage]?.splice(0,8),
            currentPage: state.currentPage - 1,
            prev: true,
           } 
         })
        }
      }