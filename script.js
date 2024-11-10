// List of Quiz Questions
let quizQuestion = [
    {
        id: 0,
        question: "Which is the largest animal in the world?",
        a: "Shark",
        b: "Blue Whale",
        c: "Elephant",
        d: "Giraffe",
        correct: "b",
        selected: null
    },
    {
        id: 1,
        question: "Which is the smallest continent in the world?",
        a: "Asia",
        b: "Australia",
        c: "Europe",
        d: "Africa",
        correct: "b",
        selected: null
    },
    {
        id: 2,
        question: "Which is the largest desert in the world?",
        a: "Kalahari",
        b: "Gobi",
        c: "Antarctica",
        d: "Sahara",
        correct: "c",
        selected: null
    },
    {
        id: 3,
        question: "Which country has the largest population in the world?",
        a: "China",
        b: "Bangladesh",
        c: "Canada",
        d: "Nepal",
        correct: "a",
        selected: null,        
    }
];

console.log(quizQuestion);

const quizContent = document.getElementById('quiz-container');
const quizBodyContent = document.getElementById('quiz-body');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

let currentQuizIndex = 0;
let score = 0;
let totalScore = quizQuestion.length;
let submitButtonClicked = false;

loadQuizData();
//viewAllAnswers();

function loadQuizData(){
    if(quizQuestion[currentQuizIndex].selected === null){
        deselectAnswers();
        submitButton.disabled = false;
    }else{
        answerElements.forEach(answerElement=>{
            if(answerElement.id == quizQuestion[currentQuizIndex].selected){
                answerElement.checked = true;
            }
        });
    
        submitButton.disabled = true;
    
    }

    let quizData = quizQuestion[currentQuizIndex];

    questionElement.innerText = quizData.question;
    a_text.innerText = quizData.a;
    b_text.innerText = quizData.b;
    c_text.innerText = quizData.c;
    d_text.innerText = quizData.d;

    document.getElementById('score_obtained').innerText = score;
    document.getElementById('total_score').innerText = totalScore;

    if(currentQuizIndex == (quizQuestion.length-1)){
        nextButton.disabled = true;
    }else{
        nextButton.disabled = false;
    }

    if(currentQuizIndex == 0){
        previousButton.disabled = true;
    }else{
        previousButton.disabled = false;
    }

}

function deselectAnswers(){
    answerElements.forEach(answerElement => answerElement.checked = false);
}

function answerSelected(){
    let answer;
    answerElements.forEach(answerElement=>{
        if(answerElement.checked){
            answer = answerElement.id;
        }
    })
    return answer;
}

function nextQuestion(){
    currentQuizIndex++;
    loadQuizData();
}

function previousQuestion(){
    currentQuizIndex--;
    loadQuizData();
}

function viewAllAnswers(){
    quizContent.innerHTML= '<div>'+quizQuestion.map(quiz=>`
        <div class="answer-content">
            <h3>${quiz.question}</h3>
            <br>
            <b>Correct Answer: ${quiz.correct}</b>
            <br>
            <hr>
        </div>
        `).join('')
        +'<br><button class="btn" onClick="location.reload()">Retake Quiz</button></div>'
}

function toggleModal(text, html, color){
    let popup = document.getElementById('popup');
    let popupText = document.getElementById('popup-text');
    let popupImg = document.getElementById('popup-img');
    popup.classList.toggle('active');
    quizContent.classList.toggle('blur');
    popupText.textContent = text;
    popupText.style.color = color;
    popupImg.innerHTML = html;
    popupImg.style.color = color;
}

nextButton.addEventListener('click', (e)=>{
    e.preventDefault();
    nextQuestion();
});

previousButton.addEventListener('click', (e)=>{
    e.preventDefault();
    previousQuestion();
});

submitButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let answerChecked = answerSelected();
    console.log(answerChecked);
    if(answerChecked){
        submitButtonClicked = true;
        if(answerChecked === quizQuestion[currentQuizIndex].correct){
            score++;
            console.log("Your Score is :"+score);
            toggleModal("Correct Answer", `<i class="fas fa-check-circle"></i>`, '#25D366');
        }else{
            toggleModal("Incorrect Answer", `<i class="far fa-times-circle"></i>`, '#F5829D');
        }
        console.log("Current Quiz Index:"+currentQuizIndex);
    
        quizQuestion[currentQuizIndex].selected = answerChecked;
        console.log(quizQuestion);
    
        currentQuizIndex++;
        if(currentQuizIndex < quizQuestion.length){
            loadQuizData();
        }else{
            quizContent.innerHTML = `
                <div class='final-answer-container'>
                    <div class='final-answer-content'>
                        <h2>You Answered ${score}/${totalScore} questions correctly</h2>
                        <div class='answer-button-content'>
                            <button class='btn' onClick="location.reload()">Reload</button>
                            <button class='btn' onClick="viewAllAnswers()">View Results</button>
                        </div>
                    </div>
                </div>
            ` 
        }
    }else{
        //alert("Please Select An Answer");
        toggleModal("Please Select An Answer", `<i class="far fa-list-alt"></i>`, '#538DD7');
    }

});