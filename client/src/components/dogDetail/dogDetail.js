import React, { Component } from "react";
import {getDetails} from '../../redux/actions';
import { connect } from "react-redux";
import DogCard from "../dogsCard/dogcard";
import style from '../MainPage/mainPage.module.css'



export class DogDetail extends Component {
    componentDidMount() {
      this.props.getDetails(this.props.match.params.breedId)
    }
    render() {
      return (
        <div>
         you are in the detail component
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
      details: state.dogDetails
    }
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        getDetails: (id) => dispatch(getDetails(id))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DogDetail);