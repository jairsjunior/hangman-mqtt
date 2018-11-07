import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView, globalState } from 'rhelena';
import PalavrasModel from './PalavrasModel'


export default class Palavras extends Component {

    componentWillMount(){
        attachModelToView(new PalavrasModel(this.props), this);
    }

    render(){
        return this.state.question != undefined ? (
            <Grid fluid>
                <Row key="a">
                    <Col xs={12} md={12}>
                        <div>
                            <h3>Pergunta:</h3>
                            { this.state.question.text }
                        </div>
                    </Col>
                </Row>
                <Row key="b">
                    <Col xs={12} md={12}>
                        <div style={{ margin: "2em"}}>
                        { this.state.lettersShow.map((value, index) => {
                            if(value.visible){
                                return ( <span key={index} style={{ borderColor: "black", borderWidth: "2px", borderStyle: "solid", padding: "5px", margin: "10px" }}>{value.letter}</span> );
                            }else{
                                return ( <span key={index} style={{ borderColor: "black", borderWidth: "2px", borderStyle: "solid", padding: "5px", margin: "10px" }}>&nbsp;&nbsp;</span> );
                            }
                        }) }
                        </div>
                    </Col>
                </Row>
                <Row key="c">
                    <Col xs={12} md={12}>
                        <div style={{ marginTop: "4em", marginBottom: "2em" }}>
                            <h3>Letras com Tentativa</h3>
                            { Object.values(this.state.lettersTry).map((value) => {
                                return ( <span style={{ padding: "5px", margin: "10px" }}>{value}</span> )
                            }) }
                        </div>
                    </Col>
                </Row>
            </Grid>
        ) : ('')
    }
}