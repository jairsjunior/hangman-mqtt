import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';

export default class PlayerInputModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);
        this.playerName= props.player;
        this.playerCode= props.code;
        this.letter = '';
        this.myTurn = false;

        manuh.subscribe(`forca/player/turn/set`, `PlayerInput-${this.playerCode}`, (msg, info) => {
            if(msg != undefined){
                console.log('Turn Change');
                if(this.playerCode == msg.code){
                    this.myTurn = true;
                }else{
                    this.myTurn = false;
                }
            }
        })

        manuh.subscribe(`forca/end`, `PlayerInput-${this.playerCode}`, (msg, info) => {
            if(msg != null){
                if(msg.runningGame == false){
                    this.myTurn = false;
                }
            }
        })
    }

    testLetter(){
        if(this.letter != ''){
            manuh.publish(`forca/player/letter/set`, { letter: this.letter, player: this.playerName, playerCode: this.playerCode });
            manuh.publish(`forca/player/turn/change`, { actual: this.playerCode })
            this.letter = '';
        }
    }
    
    setLetter(letter){
        this.letter = letter;
    }
}