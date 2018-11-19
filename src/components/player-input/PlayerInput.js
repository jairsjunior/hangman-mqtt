import React, { Component } from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import PlayerInputModel from './PlayerInputModel'
import Button from 'react-bootstrap/lib/Button'


export default class PlayerInput extends Component {

    componentWillMount(){
        attachModelToView(new PlayerInputModel(this.props), this);
    }

    render(){
        return (
            <Grid fluid>
                <Row key="b">
                    <Col xs={12} md={12}>
                        { this.state.myTurn && (
                            <span style={{ lineHeight: '3em', color: 'red' }}>Sua Vez</span>
                        )}
                    </Col>
                </Row>
                <Row key="c">
                    <Col xs={12} md={12}>
                        <Row style={{ display: 'flex', justifyContent:'center', alignItems:'center' }}>
                            <input 
                                style={{ border: '1px', borderStyle: 'solid', width: '30px', lineHeight: '2em'}}
                                onChange={(event) => this.viewModel.setLetter(event.target.value) }
                                value={this.state.letter}
                                maxLength="1"
                            >
                            </input>
                            <Button bsStyle="success" 
                                onClick={() => this.viewModel.testLetter()}
                                disabled={!this.state.myTurn}>
                                Enviar Letra
                            </Button>
                        </Row>
                        <Row style={{ display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: '5px'  }}>
                            <input 
                                style={{ border: '1px', borderStyle: 'solid', lineHeight: '2em'}}
                                onChange={(event) => this.viewModel.setWord(event.target.value) }
                                value={this.state.word}
                            >
                            </input>
                            <Button bsStyle="success" 
                                onClick={() => this.viewModel.testWord()}
                                disabled={!this.state.myTurn}>
                                Enviar Palavra
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}