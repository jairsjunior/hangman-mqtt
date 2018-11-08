import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import HomePlayerModel from './HomePlayerModel'
import Forca from '../forca/Forca'
// import Palavras from '../palavras/Palavras'
import PlayerInput from '../player-input/PlayerInput'

export default class HomePlayer extends Component {

    componentWillMount(){
        attachModelToView(new HomePlayerModel(this.props), this);
    }

    render(){
        return (
            <Grid fluid>
                <Row>
                    <h1>Forca do 5 S</h1>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            {/* <Palavras type="remote"/> */}
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <PlayerInput player={this.state.playerName} code={this.state.playerCode}></PlayerInput>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Forca player={this.state.playerName} code={this.state.playerCode}></Forca>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}