import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.questions = [
            { text: "Teste" , word: "teste" },
            { text: "Jane" , word: "jane" },
            { text: "Junior" , word: "junior" },
        ]

        this.actualPlayer = 1;

        manuh.subscribe(`forca/player/turn/change`, `HomeModel`, (msg, info) => {
            if(msg != undefined){
                this.actualPlayer == 1 ? this.actualPlayer = 2 : this.actualPlayer = 1;
                manuh.publish(`forca/player/turn/set`, { code: this.actualPlayer }); 
            }
        })
    }

    startGame(){
        manuh.publish(`forca/player/turn/set`, { code: this.actualPlayer });
        this.setWord();
    }


    setWord(){
        let position = Math.floor(Math.random() * this.questions.length)
        manuh.publish(`forca/question/set`, this.questions[position])
    }

    cleanGame(){
        window.location.reload();
    }
}