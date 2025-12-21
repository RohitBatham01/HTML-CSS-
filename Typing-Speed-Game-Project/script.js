const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake  span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

// set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph(){
    const paragraph = [
        "Technology evolves rapidly as developers build scalable systems solve real problems and improve performance through automation clean code and continuous learning every single day",

        "Cloud platforms enable teams to deploy applications faster monitor systems efficiently and handle traffic spikes using containers automation and reliable infrastructure strategies",

        "Typing accurately requires focus rhythm and practice while maintaining speed reducing errors and improving muscle memory through consistent repetition and patience",

        "Modern applications depend on monitoring logging and alerting to ensure stability detect failures early and maintain user trust across distributed environments",

        "Learning programming is a journey where curiosity problem solving and persistence help transform simple ideas into powerful software solutions"
    ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char)
        // using backticks ``
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>input.focus());
}

//  Handling user input

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log("correct");
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value='';

    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
    input.value='';
    
}

input.addEventListener("input",initTyping);
btn.addEventListener("click" , reset);
loadParagraph();