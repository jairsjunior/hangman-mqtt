import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid'
import { attachModelToView, globalState } from 'rhelena'
import PalavrasModel from './PalavrasModel'
import Panel from 'react-bootstrap/lib/Panel'

export default class Palavras extends Component {

    componentWillMount(){
        attachModelToView(new PalavrasModel(this.props), this);
    }

    render(){
        return this.state.question != undefined ? (
            <Grid fluid style={{ minWidth: '100%' }}>
                <Row key="a" style={{ height: '50vh'}}>
                    <Col xs={12} md={12}>
                        <Panel bsStyle="primary" style={{ height: '100%' }}>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Pergunta</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{ paddingBottom: '0px' }}>
                                <span><b>{ this.state.question.text }</b></span>
                                <div style={{ marginTop: "3em"}}>
                                    { this.state.lettersShow.map((value, index) => {
                                        if(value.visible){
                                            return ( <span key={`field-${index}`} style={{ borderColor: "black", borderWidth: "2px", borderStyle: "solid", padding: "5px", margin: "10px"}}>{value.letter}</span> );
                                        }else if (value.letter == ' '){
                                            return ( <span key={`field-${index}`}><br></br><br></br><br></br></span> );
                                        }
                                        else{
                                            return ( <span key={`field-${index}`} style={{ borderColor: "black", borderWidth: "2px", borderStyle: "solid", padding: "5px", margin: "10px"}}>&nbsp;&nbsp;</span> );
                                        }
                                    }) }
                                </div>   
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
                <Row key="b" style={{ height: '33vh'}}>
                    <Col xs={12} md={12}>
                        <Panel bsStyle="primary" style={{ marginTop: '2vh', height: '100%' }}>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Letras Não Encontradas</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body style={{ paddingBottom: '0px' }}>
                                { Object.values(this.state.lettersTry).map((value, index) => {
                                    return ( <span key={`letter-${index}`} style={{ padding: "5px", margin: "10px" }}>{value}</span> )
                                }) }
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        ) : ('')
    }
}