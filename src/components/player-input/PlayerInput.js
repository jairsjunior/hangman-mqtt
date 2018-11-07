import React, { Component } from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import PlayerInputModel from './PlayerInputModel'


export default class PlayerInput extends Component {

    componentWillMount(){
        attachModelToView(new PlayerInputModel(this.props), this);
    }

    render(){
        return (
            <Grid fluid>
                <Row key="a">
                    <Col xs={12} md={12}>
                        <span>{ this.state.playerName }</span>
                    </Col>
                </Row>
                <Row key="b">
                    <Col xs={12} md={12}>
                        <input 
                            onChange={(event) => this.viewModel.setLetter(event.target.value) }
                            value={this.state.letter}
                            maxLength="1"
                        >
                        </input>
                        <button 
                            onClick={() => this.viewModel.testLetter()}
                            disabled={!this.state.myTurn}
                        >Enviar</button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}