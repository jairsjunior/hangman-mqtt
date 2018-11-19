import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import HomeModel from './HomeModel'
import Forca from '../forca/Forca'
import Palavras from '../palavras/Palavras'
import NavBar from '../nav-bar/Navbar'
import Panel from 'react-bootstrap/lib/Panel'
import Message from '../message/Message'

export default class Home extends Component {

    componentWillMount(){
        attachModelToView(new HomeModel(this.props), this);
    }

    render(){
        return (
            <div>
                <NavBar></NavBar>
                <Grid fluid style={{ minWidth: '100%' }}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Row>
                                <Palavras type="local"></Palavras>
                            </Row>
                        </Col>
                        <Col xs={12} md={6}>
                            <Row style={{ height: '85vh' }}>
                                <Col xs={12} md={6}>
                                    <Panel bsStyle="primary" style={{ height: '100%' }}>
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Jogador 1</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body style={{ paddingTop: '0px' }}>
                                            <Forca key="1" player="Jogador 1" code="1"></Forca> 
                                        </Panel.Body>
                                    </Panel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Panel bsStyle="primary" style={{ height: '100%' }}>
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Jogador 2</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body style={{ paddingTop: '0px' }}>
                                            <Forca key="2" player="Jogador 2" code="2"></Forca> 
                                        </Panel.Body>
                                    </Panel>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* <Row>
                        <div style={{ margingTop: "1em"}}>
                            <h5>Configurações</h5>
                            <button onClick={() => this.viewModel.startGame()}>Iniciar Jogo</button>
                            <button onClick={() => this.viewModel.setWord()  }>Proxima Palavra</button>
                            <button onClick={() => this.viewModel.cleanGame()}>Limpar Jogo</button>
                        </div>
                    </Row> */}
                </Grid>
                {/* <Message></Message> */}
            </div>
        )
    }
}