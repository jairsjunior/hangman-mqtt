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
                msg = JSON.parse(msg);
                console.log('Turn Change: ', msg);
                console.log('Player Code', this.playerCode); 
                console.log(this.playerCode == msg.code)
                if(this.playerCode == msg.code){
                    this.myTurn = true;
                    console.log('SET MY TURN ==>')
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
            manuh.publish(`forca/player/letter/set`, JSON.stringify({ letter: this.letter, player: this.playerName, playerCode: this.playerCode }));
            manuh.publish(`forca/player/turn/change`, JSON.stringify({ actual: this.playerCode }));
            this.letter = '';
        }
    }
    
    setLetter(letter){
        this.letter = letter;
    }
}