import React from "react";
import axios from 'axios';
import style from './createDog.module.css'


const CreateDog = () => {
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

function dispatchInfoToBackend () {
   axios.post("http://localhost:3001/dogs/creation",{
   ...input
   })
}

  return (
    <div>
    <form onSubmit={() => dispatchInfoToBackend()}>
 <input name='breed' type='text' onChange={(e)=> handleChange(e)} placeholder='Breed Name'></input>
 <input type='text' name='height' onChange={(e)=> handleChange(e)} placeholder='Height: (min-max)'></input> 
 <input type='text' name='weight' onChange={(e)=> handleChange(e)} placeholder='Weight: (min-max)'></input>    
 <input type='text' name="lifeSpan" onChange={(e)=> handleChange(e)} placeholder='Life span: (min-max)'></input>
          <select name='temperament' value={input.temperament[input.temperament.length-1]} 
            onChange={(e) => handleChangeSelect(e)}>
            <option >Temperament   </option>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option> 
            <option value="mango">Mango</option>
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