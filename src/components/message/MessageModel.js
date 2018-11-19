import React, { Component } from 'react'; 
import { RhelenaPresentationModel, globalState } from 'rhelena';
import manuh from 'manuh';

export default class MessageModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.message = '';
        this.showModal = false;

        manuh.subscribe(`forca/end`, `ForcaModal-${this.type}`, (msg, info) => {
            if(msg != undefined){
                this.showModal = true;
                this.messsage = `O Vencedor por acertar a palavra foi o Jogador ${msg.playerCode}`
            }
        });
    }

    close(){
        this.showModal = false;
        this.message = '';
    }
}