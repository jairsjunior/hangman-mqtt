import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView, globalState } from 'rhelena';
import ForcaModel from './ForcaModel'

export default class Forca extends Component {

    componentWillMount(){
        attachModelToView(new ForcaModel(this.props), this);
    }

    render(){
        return (
            
            <div style={{ width: "100%"}}>
                <h2>{this.state.playerName || 'Jogador 1'}</h2>
                {/* <span> { this.state.nomeImagem } - { this.state.error }</span> */}
                <div style={{margin: "auto", width: "15%"}}>
                    <div id={`image-${this.state.error}`}></div>
                </div>
                { this.state.endGame ? <h1> FIM DE JOGO! </h1> : ''}
            </div>
        ) 
    }
}