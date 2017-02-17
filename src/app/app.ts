"use strict"

// Stylesheet

import './app.scss';

// Typescript

class inputValue {
    
    public id: any;
    public value: number;

    constructor(id: string) {
        this.id = <HTMLInputElement>document.querySelector(id);
        this.value = 0;
    }

    filterInput(e: any) {
        if(isNaN(e.valueAsNumber)) {
            this.id.value = '';
            return true;
        } else {
            return true;
        }
    }

    getValue() {
        startButton.removeAttribute('disabled');
        this.value = +this.id.value;
        let valueLength: number = this.id.value.length;
        let maxValue: number = this.id.getAttribute('max');
        this.filterInput(event.target);
            if(valueLength <= 2) {
                if(this.value <= maxValue) {
                    return this.value;
                } else {
                    this.value = this.id.value = maxValue;
                    return +this.value;
                }
            } else {
                let v: string = this.value.toString().slice(0, -1);
                this.value = this.id.value = +v;
                return this.value;
            }
    }
}

let hoursValue = new inputValue('#hours');
let minutesValue = new inputValue('#minutes');
let secondsValue = new inputValue('#seconds');
let millisecondsValue = new inputValue('#milliseconds')
hoursValue.id.addEventListener('input', hoursValue.getValue.bind(hoursValue), false);
minutesValue.id.addEventListener('input', minutesValue.getValue.bind(minutesValue), false);
secondsValue.id.addEventListener('input', secondsValue.getValue.bind(secondsValue), false);
let startButton = document.querySelector('#startChr');
let stopButton = document.querySelector('#stopChr');
let pauseButton = document.querySelector('#pauseChr');



export interface timerObj {           // L'interfaccia si è resa necessaria per non incorrere nel problema dell' 'implicitly any type'
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
    interval: any,
    startTimer: any,
    pauseTimer: any,
    stopTimer: any;
}

let timerObj: timerObj = {            // Abbiamo creato un oggetto con all'interno la funzione di partenza, la pausa e lo stop, i valori di                                                 partenza e la variabile 'interval' che contiene il timer che attiva la funzione (setInterval(timer)). La                                           soluzione è stata quella di assegnare di volta in volta i valori interni della funzione - ore, minuti,                                             secondi e millisecondi - alle proprietà dell'oggetto, in modo da poter essere riutilizzate di volta in                                             volta.
        hours: hoursValue.id.value,
        minutes: minutesValue.id.value,
        seconds: secondsValue.id.value,
        milliseconds: +millisecondsValue.id.value || 1000,
        interval: null,
        startTimer: function() {
            pauseButton.classList.remove('disabled');
            startButton.classList.add('disabled');
            let initialTime = Date.now();
            this.milliseconds = +millisecondsValue.id.value || 1000;
            this.seconds = +secondsValue.value || 0;    
            this.minutes = +minutesValue.id.value; // I minuti si riazzeravano poichè il valore era dato da 'minutesValue.id.value', che non                                                 ritornava un numero, ma una stringa. Per questo che alla fase successiva la stringa veniva                                             calcolata come 'undefined' e quindi veniva azzerata.
            this.hours = +hoursValue.id.value;
            let timer = () => {
                if(this.hours === undefined) {this.hours = 0;}
                if(this.minutes === undefined) {this.minutes = 0;}
                if(this.seconds === undefined) {this.seconds = 0;}
                let countRemainingTime = Date.now() - initialTime + 1000;
                let remainingMilliseconds = this.milliseconds - (countRemainingTime % 1000) | 0;
                if(remainingMilliseconds < 0) {
                    this.milliseconds = 1000;
                    this.seconds--;
                    initialTime = Date.now();
                }
                let remainingSeconds = this.seconds - Math.floor(countRemainingTime / 1000);
    
                if(this.hours > 0 && !this.minutes && remainingSeconds < 0) {
                    this.seconds = 59;
                    this.minutes = 59;
                    this.hours--;
                    initialTime = Date.now() + 1000;
                } else if(this.minutes > 0 && remainingSeconds < 0) {
                    this.seconds = 59;
                    this.minutes--;
                    initialTime = Date.now() + 1000;
                } else if(!this.hours && !this.minutes && !remainingSeconds && remainingMilliseconds.toString().length < 3) {
                    remainingMilliseconds = 0;
                    millisecondsValue.id.value = '00' + remainingMilliseconds;
                    clearInterval(this.interval);
                    return;
                }
        
                if(this.hours < 10) {
                    hoursValue.id.value = '0' + this.hours;
                } else {
                    hoursValue.id.value = this.hours;
                }
                if(this.minutes < 10) {
                    minutesValue.id.value = '0' + this.minutes;
                } else {
                    minutesValue.id.value = this.minutes;
                }
                if(remainingSeconds < 10) {
                    secondsValue.id.value = '0' + remainingSeconds;
                } else {
                    secondsValue.id.value = remainingSeconds;
                }
                millisecondsValue.id.value = remainingMilliseconds;
        
            };
        
            this.interval = setInterval(timer, 1);    
        },
    pauseTimer: function() {
        startButton.classList.remove('disabled');
        pauseButton.classList.add('disabled');
        secondsValue.value = +secondsValue.id.value + 1;
        this.hours = +hoursValue.id.value;
        this.minutes = +minutesValue.id.value;
        this.seconds = 0;
        this.milliseconds = +millisecondsValue.id.value;
        clearInterval(this.interval);
    },
    stopTimer: function() {
        startButton.setAttribute('disabled', 'disabled');
        startButton.classList.remove('disabled');
        pauseButton.classList.add('disabled');
        secondsValue.value = 0;
        hoursValue.id.value = undefined;
        minutesValue.id.value = undefined;
        secondsValue.id.value = undefined;
        millisecondsValue.id.value = '000';
        clearInterval(this.interval);
    }
}

startButton.addEventListener('click', timerObj.startTimer.bind(this), false);

pauseButton.addEventListener('click', timerObj.pauseTimer.bind(this), false);

stopButton.addEventListener('click', timerObj.stopTimer.bind(this), false);











/*
let deadline = '02/11/2017 10:17:00 GMT+0100'
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000/60) % 60);
    let hours = Math.floor((t/1000/60/60) % 24);
    let days = Math.floor((t/1000/60/60/24));
    return {
        'total': t,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
    };
};

function initializeClock(id, endtime) {
    let clock = document.querySelector(id);
    let timeInterval = setInterval(() => {
        let t = getTimeRemaining(endtime);
        clock.innerHTML = `${t.days}:${t.hours}:${t.minutes}:${t.seconds}:${t.total}`;
        if(t.total <= 0) {
            clearInterval(timeInterval);
        }
    });
}



initializeClock('#clockdiv', deadline);*/