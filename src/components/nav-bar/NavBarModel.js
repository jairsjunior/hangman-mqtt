import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';

export default class NavBarModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);
        this.type = props.type;
        this.actualPlayer = 1;

        this.questions = [
            { text: "Este senso está voltado para a utilização correta dos recursos necessários no ambiente de trabalho, evitando excesso, desperdício e má utilização." , word: "SEIRI" },
            { text: "O 1° Senso / SEIRI refere-se ao Senso de?" , word: "UTILIZAÇÃO" },
            { text: "É um programa de qualidade com objetivo de estabelecer padrões de organização, limpeza e bem estar nas empresas." , word: "PROGRAMA 5S" },
            { text: "O que não é útil para mim, mas pode ser útil para outro, evitando assim compras desnecessárias." , word: "REUTILIZAÇÃO" },
            { text: "Tudo que não utilizaremos mais, porém, pode ser transformado por meio de empresas especializadas." , word: "RECICLAGEM" },
            { text: "O que não é mais útil para nosso trabalho, porém ocupa espaço, causa desorganização e perda de tempo." , word: "DESCARTE" },
            { text: "Um ___________ desligado representa uma economia de 60 kilowats por hora." , word: "COMPUTADOR" },
            { text: "Muitos materiais que usamos no dia a dia do nosso trabalho podem ser compartilhados, como grampeadores, tesouras, clipes, etc. Mantenha aqueles materiais que podem ser compartilhados em local acessível, evitando compras _______________?" , word: "DESNECESSÁRIAS" },
            { text: "Um _________________ pode levar até 100 anos para se decompor." , word: "COPO DESCARTÁVEL" },
            { text: "O 5s é um programa de qualidade criado no ______________com objetivo de estabelecer padrões de organização, limpeza e bem estar nas empresas." , word: "JAPÃO" },
            { text: "No local de trabalho, tenha só o que é necessário e na quantidade certa. Essa dica refere-se ao Senso de?" , word: "UTILIZAÇÃO" },
            { text: "Redução do desperdício de materiais de uso comum e de expediente (copos descartáveis, papel toalha, papel A4, etc), é um dos _______ do Senso Seiri/Utilização." , word: "OBJETIVOS" },
            // { text: "" , word: "" },
        ]
    }

    startGame(){
        manuh.publish(`forca/player/turn/set`, JSON.stringify({ code: this.actualPlayer }));
        this.setWord();
    }

    setWord(){
        let position = Math.floor(Math.random() * this.questions.length)
        manuh.publish(`forca/question/set`, this.questions[position])
        manuh.publish(`forca/remote/question/set`, JSON.stringify(this.questions[position]))
    }

    cleanGame(){
        window.location.reload();
        manuh.publish(`forca/remote/clean/set`, JSON.stringify({ clean: true }));
    }
}