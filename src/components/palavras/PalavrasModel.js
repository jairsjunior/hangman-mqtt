import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';

export default class PalavrasModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.question = props.question;

        this.letters = {};
        this.lettersShow = []; 
        this.lettersTry = {};
        this.letterCorrect = 0;
        this.wordSize = 0; 

        manuh.subscribe(`forca/player/letter/set`, `Palavras`, (msg, info) => {
            if(msg != undefined){
                if(msg.letter == undefined){
                    msg = JSON.parse(msg);
                }
                this.testLetter(msg.letter, msg.playerCode);
            }
        });

        manuh.subscribe(`forca/player/word/set`, `Palavras`, (msg, info) => {
            if(msg != undefined){
                if(props.type == "remote"){
                    msg = JSON.parse(msg);
                }
                this.testWord(msg.word, msg.playerCode);
            }
        });

        manuh.subscribe(props.type == "local" ? `forca/question/set` : `forca/remote/question/set`, `Palavras`, (msg, info) => {
            if(msg != undefined){
                if(props.type == "remote"){
                    msg = JSON.parse(msg);
                }
                this.question = msg;
                this.letterCorrect = 0;
                this.letters = {};
                this.lettersShow = []; 
                this.lettersTry = {};
                this.wordSize = this.question.word.length;
                for(let index in this.question.word){
                    let tmpLetter = this.question.word[index].toUpperCase();
                    this.letters[tmpLetter] = false;
                    this.lettersShow.push({letter: tmpLetter, visible: false});
                    this.letters = this.letters;
                    this.lettersShow = this.lettersShow;
                }
            }
        })
    }

    testWord(word, playerCode){
        word = word.trim();
        if(word.size == this.wordSize){
            if(this.question.word.toUpperCase == word.toUpperCase){
                manuh.publish(`forca/end`, { type: "winner", player: playerCode});
            }
        }
    }

    testLetter(letter, playerCode){
        let tmpLetter = letter.toUpperCase();
        if(this.letters[tmpLetter] == undefined){
            if(this.lettersTry[tmpLetter] == undefined){
                this.lettersTry[tmpLetter] = tmpLetter;
                this.lettersTry = this.lettersTry;
                manuh.publish(`forca/player/${playerCode}/add`, { letter: tmpLetter, player: this.playerName }, { retained: true });
            }else{
                console.log('Letra já informada!');
            }
        }else{
            this.letters[tmpLetter] = true;
            for(let index in this.lettersShow){
                if(this.lettersShow[index].letter == tmpLetter){
                    manuh.publish(`forca/remote/player/letter/set`, JSON.stringify({ letter: tmpLetter, player: this.playerName }));
                    this.lettersShow[index].visible = true;
                    this.letterCorrect++;
                    this.lettersShow = this.lettersShow;
                }
            }
            if(this.letterCorrect == this.wordSize){
                manuh.publish(`forca/end`, { type: "winner", player: playerCode, runningGame: false});
            }
        }
    }
    
}