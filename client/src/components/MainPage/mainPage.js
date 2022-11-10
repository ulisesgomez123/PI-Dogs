import React, { Component } from "react";
import {getDogs} from '../../redux/actions';
import { connect } from "react-redux";
import DogCard from "../dogsCard/dogcard";
import style from './mainPage.module.css'


export class Home extends Component {
    componentDidMount() {
      this.props.getDogs()
    }
    render() {
      return (
        <div>
            <p>hola</p>
        <div className={style.container}>
            {this.props.dogsList?.map( d => 
                <DogCard 
                name={d.name}
                key={d.id}
                weightMetric={d.weightMetric}
                weightImperial={d.weightImperial}
                img={d.imageUrl}
                temperament={d.temperament}
                />
            )}
        </div>
        </div>
        
      );
    }
  }
  
  export const mapStateToProps = function (state) {
    return {
      dogsList: state.dogsLoaded
    }
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      getDogs: () => dispatch(getDogs())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);