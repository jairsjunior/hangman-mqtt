import React, { Component } from 'react'; 
import { RhelenaPresentationModel, globalState } from 'rhelena';
import manuh from 'manuh';

export default class PlayerInputModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);
        this.playerName= props.player;
        this.playerCode= props.code;
        this.letter = '';
        this.word = '';
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
                globalState['gamePlay/myturn'] = this.myTurn;
            }
        })

        manuh.subscribe(`forca/end`, `PlayerInput-${this.playerCode}`, (msg, info) => {
            if(msg != null){
                if(msg.runningGame == false){
                    this.myTurn = false;
                }
            }
        })

        manuh.subscribe(`forca/remote/end`, `PlayerInput-${this.playerCode}-remote`, (msg, info) => {
            if(msg != null){
                msg = JSON.parse(msg);
                if(msg.runningGame == false){
                    this.myTurn = false;
                }
            }
        })
    }

    testLetter(){
        if(this.letter.trim() != ''){
            manuh.publish(`forca/player/letter/set`, JSON.stringify({ letter: this.letter, player: this.playerName, playerCode: this.playerCode }));
            // manuh.publish(`forca/player/turn/change`, JSON.stringify({ actual: this.playerCode }));
            this.letter = '';
        }else{
            console.log('Campo não pode ser vazio!');
        }
    }

    testWord(){
        if(this.word.trim() != ''){
            manuh.publish(`forca/player/word/set`, JSON.stringify({ word: this.word, player: this.playerName, playerCode: this.playerCode }));
            // manuh.publish(`forca/player/turn/change`, JSON.stringify({ actual: this.playerCode }));
            this.word = '';
        }else{
            console.log('Campo não pode ser vazio!');
        }
    }
    
    setLetter(letter){
        this.letter = letter;
    }

    setWord(word){
        this.word = word;
    }
}