import React, {Component} from 'react'
import { attachModelToView } from 'rhelena'

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import MessageModel from './MessageModel'


export default class Message extends Component {

    componentWillMount(){
        attachModelToView(new MessageModel(this.props), this);
    }

    render(){
        return this.state.showModal && ( 
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Vencedor</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.state.message}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=> this.viewModel.close()}>Fechar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
