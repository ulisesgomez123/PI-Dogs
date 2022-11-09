import React, { Component } from "react";
import {getDogs} from '../redux/actions';
import { connect } from "react-redux";

export class Home extends Component {
    componentDidMount() {
      this.props.getDogs()
    }
    render() {
      return (
        <div>
        http
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