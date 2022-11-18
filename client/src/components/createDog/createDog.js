import React from "react";
import style from './createDog.module.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 
import { createDog, getTemperaments } from "../../redux/actions";

const CreateDog = () => {
  let dispatch= useDispatch();
  var temps= useSelector( state => state.temperaments);

  React.useEffect(()=>{
    dispatch(getTemperaments())
  },[]) 

  const [error,setError] = React.useState(
    {
      breedError: '',
      heightError: '',
      weightError: '',
      lifeSpanError: '',
    }
  )
  const [input,setInput] = React.useState(
    {
      breed: "",
      height: '',
      weight: '',
      lifeSpan: '',
      temperament: []
    }
)

function rectifyNum (e) {
  let err= 'Error';
  let name= e.target.name + err;
  let ver =/^\d+\-\d+$/.test(e.target.value)
  if (ver) {
    var strToArray= e.target.value.split('-')
     let min = parseInt(strToArray[0])
     let max = parseInt(strToArray[1])
    if (min < max) { 
      setError((prevState) => { return {...prevState, [name]: true} });
    }
    else  {
      setError((prevState) => { return {...prevState, [name]: false} });
    }
  }
  else {
   setError((prevState) => { return {...prevState, [name]: false} });
  }
 }


 function validation (e) {
 setInput((prevState) => {return {...prevState,
   [e.target.name]: e.target.value
  }
})
  if (e.target.name === 'breed') {
   setError({...error,
    breedError: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(e.target.value)
   })
  }
  else {
    rectifyNum(e)
  }
  
}

function handleChangeSelect (e) {
    setInput({...input,
              temperament: [...input.temperament, e.target.value]
    })
  }

function submitControl (error) {
 if (!error.breedError || !error.heightError || !error.weightError || !error.lifeSpanError) {
  var div = document.createElement("div");
  div.innerHTML= 'wrong'
  div.style.position='absolute'
  div.style.fontSize='30px'
  div.style.height='100px'
  div.style.width='100px'
  div.style.color='blue'
  document.body.appendChild(div)
  return true
 }
 return false
}

function dispatchInfo(e) {
  e.preventDefault();
  let test= submitControl(error)
  if (!test) {
    const arrayOfTempsId = input.temperament.map(t => {
      for (let i = 0; i < temps.length; i++) {
        if (t === temps[i].name) return temps[i].id
      }
    })
    dispatch(createDog({...input, arrayOfTempsId}))
    setInput({
      breed: "",
      height: '',
      weight: '',
      lifeSpan: '',
      temperament: []
    })
    setError({
      breedError: '',
      heightError: '',
      weightError: '',
      lifeSpanError: '',
    })
  }
}

  return (
    <div>
    <form onSubmit={(e) => dispatchInfo(e)} className={style.form}>
    {error.breedError? <span className={style.correct}>this field is OK</span> : <span>it should have only letters</span>}
 <input value={input.breed} name='breed' type='text' onChange={(e)=> validation(e)} placeholder='Breed Name'></input>
 {error.heightError? <span className={style.correct}>this field is OK</span>: <span>it must have this format: min-max </span>}
 <input value={input.height} type='text' name='height' onChange={(e)=> validation(e)} placeholder='Height: (min-max)'></input>
 {error.weightError?<span className={style.correct}>this field is OK</span>: <span>it must have this format: min-max</span>} 
 <input value={input.weight} type='text' name='weight' onChange={(e)=> validation(e)} placeholder='Weight: (min-max)'></input>
 {error.lifeSpanError? <span className={style.correct}>this field is OK</span> : <span>it must have this format: min-max</span>}    
 <input value={input.lifeSpan} type='text' name="lifeSpan" onChange={(e)=> validation(e)} placeholder='Life span: (min-max)'></input>
          <select name='temperament' value={input.temperament[input.temperament.length-1]} 
            onChange={(e) => handleChangeSelect(e)}>
            <option key='0'>Temperaments </option>
            {temps?.map(t => <option value={t.name} key={t.id}>{t.name}</option>)}
          </select>

    <button type='submit'>Create</button>
    </form>
    <div id='warning'>
      <label className={error.breedError ? style.label : style.warning}>Breed: <div className={style.div}>{input.breed}</div></label>
      <label className={error.heightError ? style.label : style.warning}>Height: <div className={style.div}>{`(${input.height})`} centimeters</div></label>
      <label className={error.weightError ? style.label : style.warning}>Weight: <div className={style.div}>{`(${input.weight})`} kilograms</div></label>
      <label className={error.lifeSpanError ? style.label : style.warning}>Life Span: <div className={style.div}>{`(${input.lifeSpan})`} years</div></label>
      <label className={style.label}>Temperaments: 
        <div className={style.temperament}>
        {input.temperament?.map(t => <div className={style.div}>{t}</div>)}
        </div>
      </label>
    </div>
    </div>
  );
};

export default CreateDog;
