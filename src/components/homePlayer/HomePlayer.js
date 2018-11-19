import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import HomePlayerModel from './HomePlayerModel'
import Forca from '../forca/Forca'
// import Palavras from '../palavras/Palavras'
import PlayerInput from '../player-input/PlayerInput'
import NavBar from '../nav-bar/Navbar'
import Panel from 'react-bootstrap/lib/Panel'

export default class HomePlayer extends Component {

    componentWillMount(){
        attachModelToView(new HomePlayerModel(this.props), this);
    }

    render(){
        return (
            <div>
                <NavBar type="player"></NavBar>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={6}>
                            <PlayerInput player={this.state.playerName} code={this.state.playerCode}></PlayerInput>
                        </Col>
                        <Col xs={12} md={6}>
                            <Row style={{ paddingTop: '3vh', height: '80vh'}}>
                                <Col xs={12} md={6}>
                                    <Panel bsStyle="primary" style={{ height: '100%' }}>
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{ this.state.playerName }</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body style={{ paddingTop: '0px' }}>
                                            <Forca player={this.state.playerName} code={this.state.playerCode}></Forca>
                                        </Panel.Body>
                                    </Panel>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}