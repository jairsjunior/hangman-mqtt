import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import HomeModel from './HomeModel'
import Forca from '../forca/Forca'
import Palavras from '../palavras/Palavras'
import PlayerInput from '../player-input/PlayerInput'

export default class Home extends Component {

    componentWillMount(){
        attachModelToView(new HomeModel(this.props), this);
    }

    render(){
        return (
            <Grid fluid>
                <Row>
                    <h1> Forca do 5 S</h1>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Palavras type="local"></Palavras>
                        </Row>
                        {/* <Row>
                            <Col xs={12} md={12}>
                                <PlayerInput player="Jogador 1" code="1"></PlayerInput>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <PlayerInput player="Jogador 2" code="2"></PlayerInput>
                            </Col>
                        </Row> */}
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Forca player="Jogador 1" code="1"></Forca>
                            </Col>
                            <Col xs={12} md={6}>
                                <Forca player="Jogador 2" code="2"></Forca> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <div style={{ margingTop: "1em"}}>
                        <h5>Configurações</h5>
                        <button onClick={() => this.viewModel.startGame()}>Iniciar Jogo</button>
                        <button onClick={() => this.viewModel.setWord()}>Proxima Palavra</button>
                        <button onClick={() => this.viewModel.cleanGame()}>Limpar Jogo</button>
                    </div>
                </Row>
            </Grid>
        )
    }
}