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

  const [input,setInput] = React.useState(
    {
      breed: "",
      height: '',
      weight: '',
      lifeSpan: '',
      temperament: []
    }
)

function handleChange (e) {
  setInput({...input,
            [e.target.name]: e.target.value
  })
}

function handleChangeSelect (e) {
    setInput({...input,
              temperament: [...input.temperament, e.target.value]
    })
  }

function dispatchInfo(e) {
  e.preventDefault();
  dispatch(createDog(input))
}

  return (
    <div>
    <form onSubmit={(e) => dispatchInfo(e)}>
 <input name='breed' type='text' onChange={(e)=> handleChange(e)} placeholder='Breed Name'></input>
 <input type='text' name='height' onChange={(e)=> handleChange(e)} placeholder='Height: (min-max)'></input> 
 <input type='text' name='weight' onChange={(e)=> handleChange(e)} placeholder='Weight: (min-max)'></input>    
 <input type='text' name="lifeSpan" onChange={(e)=> handleChange(e)} placeholder='Life span: (min-max)'></input>
          <select name='temperament' value={input.temperament[input.temperament.length-1]} 
            onChange={(e) => handleChangeSelect(e)}>
            <option >Temperament </option>
            {temps?.map(t => <option value={t}>{t}</option>)}
          </select>

    <button type='submit'>Create</button>
    </form>
    <div>
      <label>Breed: <div className={style.div}>{input.breed}</div></label>
      <label>Height: <div className={style.div}>{input.height} centimeters</div></label>
      <label>Weight: <div className={style.div}>{input.weight} kilograms</div></label>
      <label>Life Span: <div className={style.div}>{input.lifeSpan} years</div></label>
      <label>Temperament: 
        <div className={style.temperament}>
        {input.temperament?.map(t => <div className={style.div}>{t}</div>)}
        </div>
      </label>
    </div>
    </div>
  );
};

export default CreateDog;