import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView, globalState } from 'rhelena';
import ForcaModel from './ForcaModel'
// import Confetti from 'react-dom-confetti';
import Confetti from 'react-confetti';

export default class Forca extends Component {

    componentWillMount(){
        attachModelToView(new ForcaModel(this.props), this);
    }

    render(){
        return (
            <div style={{ position: 'relative', width: "100%", height: '70vh' }}>
                <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}>
                    <div id={`image-${this.state.error}`}></div>
                </div>
                { this.state.showMessage && (
                    <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}> 
                        <h1> {this.state.message} </h1>
                    </div> )
                }
                { this.state.showConfetti && (
                    <Confetti {...{ style:{ position: 'absolute', width: '100%', height: '100%', gravity: 0.01} }} />
                )}
            </div>
        ) 
    }
}