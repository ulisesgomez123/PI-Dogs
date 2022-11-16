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

function validation (e) {
  if (e.target.name === 'breed') {
   setError({...error,
    breedError: /[a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(e.target.value)
   })
  }
  if (e.target.name === 'height') {
    setError({...error,
      heightError: /\d+\-\d+/.test(e.target.value)
     })
   }
   if (e.target.name === 'weight') {
    setError({...error,
      weightError: /\d+\-\d+/.test(e.target.value)
     })
   }
   if (e.target.name === 'lifeSpan') {
    setError({...error,
      lifeSpanError: /\d+\-\d+/.test(e.target.value)
     })
   }
  setInput({...input,
            [e.target.name]: e.target.value
  })
}

function handleChangeSelect (e) {
    setInput({...input,
              temperament: [...input.temperament, e.target.value]
    })
  }

function submitControl (input) {
 return input
}

function dispatchInfo(e) {
  e.preventDefault();
  console.log(submitControl(input))
  dispatch(createDog(input))
  
}

  return (
    <div>
    <form onSubmit={(e) => dispatchInfo(e)}>
    {error.breedError? null : <span>is wrong</span>}
 <input name='breed' type='text' onChange={(e)=> validation(e)} placeholder='Breed Name'></input>
 {error.heightError? null : <span>is wrong</span>}
 <input type='text' name='height' onChange={(e)=> validation(e)} placeholder='Height: (min-max)'></input>
 {error.weightError? null : <span>is wrong</span>} 
 <input type='text' name='weight' onChange={(e)=> validation(e)} placeholder='Weight: (min-max)'></input>
 {error.lifeSpanError? null : <span>is wrong</span>}    
 <input type='text' name="lifeSpan" onChange={(e)=> validation(e)} placeholder='Life span: (min-max)'></input>
          <select name='temperament' value={input.temperament[input.temperament.length-1]} 
            onChange={(e) => handleChangeSelect(e)}>
            <option >Temperament </option>
            {temps?.map(t => <option value={t}>{t}</option>)}
          </select>

    <button type='submit'>Create</button>
    </form>
    <div>
      <label className={error.breedError ? style.label : style.warning}>Breed: <div className={style.div}>{input.breed}</div></label>
      <label className={error.heightError ? style.label : style.warning}>Height: <div className={style.div}>{`(${input.height})`} centimeters</div></label>
      <label className={error.weightError ? style.label : style.warning}>Weight: <div className={style.div}>{`(${input.weight})`} kilograms</div></label>
      <label className={error.lifeSpanError ? style.label : style.warning}>Life Span: <div className={style.div}>{`(${input.lifeSpan})`} years</div></label>
      <label className={style.label}>Temperament: 
        <div className={style.temperament}>
        {input.temperament?.map(t => <div className={style.div}>{t}</div>)}
        </div>
      </label>
    </div>
    </div>
  );
};

export default CreateDog;
