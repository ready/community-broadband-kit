'use strict'

import { BGA_URL } from '/static/utils/constants.js'
import { survey } from '/static/utils/constants.js'
import { getUuid } from '/static/utils/cookies.js'

// Document selectors
let navBtn 
const withTestNavBtn = document.getElementById('nav-btn')
if (withTestNavBtn) {
    navBtn= withTestNavBtn
}
const standAloneNavBtn = document.getElementById('stand-alone-survey-nav-btn')
if (standAloneNavBtn) {
    navBtn = standAloneNavBtn
}
let surveyElement
let questionElement
let questionTotalElement 
let questionProgressElement 
let surveyProgressBarElement
let standAloneSurvey = false

// Global variables
let questions
let questionIndex = 0 
let numQuestions
let response = {}
let answeredQuestions = []
let progressIncrement
let ipAddressConstant
let phoneNumberConstant
let addressLatConstant
let addressLonConstant
let addressTextConstant

/**
 * Fetches an array of survey questions to display to the user
 * @param {*} excludeQuestions an array of question IDs to exclude from the database
 * @returns an array of question to display
 */
function getSurveyQuestions(excludeQuestions, getAll) {
    const questionSet = []

    for (let i = 0; i < survey.length; i++) {
        if (!(excludeQuestions.includes(i))) {
            questionSet.push(survey[i])
        }

        if (!getAll) {
            if (questionSet.length >= 9) break
        }
        
    }

    
    
    return questionSet
}

/**
 * Removes questions related to "Home" from the questions array
 * and marks them as answered in local storage for an ip
 */
async function removeFromQuestionsArray(ipAddress) {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id == 5) {
            questions.splice(i, 1)
            addToAnsweredQs([5], ipAddress)
        }
    }
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id == 6) {
            questions.splice(i, 1)
            addToAnsweredQs([6], ipAddress)
        }
    }
}

/**
 * Initializes the survey and displays the first survey questions
 * if there are any
 * @param {*} ipAddress as a string 
 */
async function initSurvey(ipAddress, addressLat, addressLon, addressText, phoneNumber, surveyType) {
    ipAddressConstant = ipAddress
    phoneNumberConstant = phoneNumber
    addressLatConstant = addressLat
    addressLonConstant = addressLon
    addressTextConstant = addressText
    if (surveyType === "stand-alone") {
        standAloneSurvey = true
        surveyElement = document.getElementById('individual-survey-container')
        questionElement = document.getElementById('individual-survey-question')
        questionTotalElement = document.getElementById('individual-question-total')
        questionProgressElement = document.getElementById('individual-questions-answered')
        surveyProgressBarElement = document.getElementById('stand-alone-survey-progress-bar')
        // Get all survey questions
        questions = getSurveyQuestions([], true)

    } else if (surveyType === "with-test"){
        surveyElement = document.getElementById('survey-container')
        questionElement = document.getElementById('survey-question')
        questionTotalElement = document.getElementById('question-total')
        questionProgressElement = document.getElementById('questions-answered')
        surveyProgressBarElement = document.getElementById('survey-progress-bar')
    
        // Get an array of already answered questions from local storage
        let excludeQuestionsArray = JSON.parse(localStorage.getItem('answeredQs'))
        let excludeQuestions = []
        if (excludeQuestionsArray !== null) {
            for (let i = 0; i < excludeQuestionsArray.length; i++)  {
                if (excludeQuestionsArray[i].ipAddress === ipAddress) {
                    excludeQuestions = excludeQuestionsArray[i].answered
                }
            }
        }

        // Fetch the "9" survey questions 
        questions = getSurveyQuestions(excludeQuestions, false)
        
        // Check isHome varibale in local storage and if already exists, 
        // remove home related questions if school/business
        let isHomeArray = JSON.parse(localStorage.getItem('isHome'))
        if(isHomeArray) {
            for (let i = 0; i < isHomeArray.length; i++ ) {
                if (isHomeArray[i].ipAddress === ipAddress && isHomeArray[i].answered === false ) {
                    removeFromQuestionsArray(ipAddress)
                }
            }
        }
    }

    
    // Set variables for survey progress bar
    numQuestions = questions.length
    progressIncrement = 100 / numQuestions

    // Dynamically display the first question if unanswered questions exist
    if (numQuestions > 0) {
        questionProgressElement.textContent = questionIndex
        questionTotalElement.textContent = numQuestions
        if (numQuestions === 1) {
            navBtn.textContent = 'Done'
        } else {
            navBtn.textContent = 'Next'
        }

        addQuestionElement(0)
        surveyElement.style.display = 'flex'
    }
}

/**
 * Updates the array of answered survey questions in local storage
 * based on ip address
 * @param {*} questions An array of answered questions
 * @param {*} ipAddress Test taker's ip address as a string 
 */
async function addToAnsweredQs(questions, ipAddress) {
    let answeredQsArray = JSON.parse(localStorage.getItem('answeredQs'))
    let ipExistsFlag

    // If answeredQs array doesn't exist in Local Storage (first time taking the survey), create new ip address object
    if (answeredQsArray === null) {
        localStorage.setItem('answeredQs', JSON.stringify([{ipAddress: ipAddress, answered: questions}]))
    } 
    // Otherwise loop thru answeredQs array and update the proper object depending on ip address
    else {
        for (let i = 0; i < answeredQsArray.length; i++) {
            if (answeredQsArray[i].ipAddress === ipAddress) {
                answeredQsArray[i].answered = [...answeredQsArray[i].answered, ...questions]
                ipExistsFlag = true
            }
        }
        // If ip address doesn't yet exist in the answeredQs array, create new obj for it
        if (!ipExistsFlag) {
            answeredQsArray.push({ipAddress: ipAddress, answered: questions})
        }
        // Update existing answeredQs array in local storage
        localStorage.setItem('answeredQs', JSON.stringify(answeredQsArray))
    }
}

/**
 * Adds the survey question's html element to the survey
 * depending on the type of question
 * @param {*} qNum The survey question number
 */
async function addQuestionElement(qNum) {
    // Function for adding text input questions
    function addTextInput(type) {
        let textbox;

        if (type === 'short-text') {
            textbox = document.createElement('input');
            textbox.type = "text"
            textbox.classList.add('short-text-input')

        } else if (type === 'long-text') {
            textbox = document.createElement('textarea');
            textbox.classList.add('long-text-input')
        }

        textbox.name = qNum
        textbox.id = qNum
        container.appendChild(textbox)
    }

    // Function for adding number input questions
    function addNumberInput() {
        let textbox = document.createElement('input');
        textbox.type = "number"
        textbox.name = qNum
        textbox.id = qNum;
        textbox.min='0'

        container.appendChild(textbox)
    }

    // Function for radio input questions
    function addRadioInput(answers) {
        for (let i = 0; i < answers.length; i++) {
            let radiobox = document.createElement('input');
            radiobox.type = 'radio';
            radiobox.id = i;
            radiobox.name = qNum;
            radiobox.value = answers[i]
             
            let label = document.createElement('label')
            label.htmlFor = i;
             
            let description = document.createTextNode(answers[i]);
            label.appendChild(description);
            
            container.appendChild(radiobox);
            container.appendChild(label);
        }
    }

    // Function for select input questions
    function addSelectInput(answers) {
        let select = document.createElement('select')

        for (let i = 0; i < answers.length; i++) {
            let option = document.createElement('option')
            option.value = answers[i]
            option.textContent = answers[i]
            select.appendChild(option)
        }

        container.appendChild(select)
    }

    const question = questions[qNum].question
    const type = questions[qNum].type


    questionElement.textContent = question
    let container
    if (standAloneSurvey) {
        container = document.getElementById('stand-alone-survey-answers');
    } else {
        container = document.getElementById('answers');
    }
     

    // Creates appropriate survey question depending on question type
    if (type === 'nested') {
        for (const subQ of questions[qNum].subquestions) {
            let span = document.createElement('span')
            span.textContent = subQ.question

            container.appendChild(span)

            if (subQ.type === 'short-text') {
                addTextInput(subQ.type)
            } else if (subQ.type == 'number') {
                addNumberInput()
            } else if (subQ.type == 'select') {
                addSelectInput(subQ.answers)
            }

            let newline = document.createElement('br');
            container.appendChild(newline)
        }

    } else if (type === 'number') {
        addNumberInput()

    } else if (type === 'short-text' || type === 'long-text') {
        addTextInput(type)

    } else if (type === 'radio') {
        addRadioInput(questions[qNum].answers)

    } else if (type === 'select') {
        addSelectInput(questions[qNum].answers)
    }
}

/**
 * Updates the isHome varable in local storage with the state
 * @param {*} state A boolean
 */
async function updateIsHomeLocalStorage(state) {
    let isHomeArray = JSON.parse(localStorage.getItem('isHome'))
    let isHomeExistsFlag

    // If isHome array doesn't exist in Local Storage (haven't answered the location type question),
    // create new ip address object
    if (isHomeArray === null) {
        localStorage.setItem('isHome', JSON.stringify([{ipAddress: ipAddressConstant, answered: state}]))
    } 
    // Otherwise loop thru isHome array and update the proper object depending on ip address
    else {
        for (let i = 0; i < isHomeArray.length; i++) {
            if (isHomeArray[i].ipAddress === ipAddressConstant) {
                isHomeArray[i].answered = state
                isHomeExistsFlag = true
            }
        }
        // If ip address doesn't yet exist in the isHome array, create new obj for it
        if (!isHomeExistsFlag) {
            isHomeArray.push({ipAddress: ipAddressConstant, answered: state})
        }
        // Update existing isHome array in local storage
        localStorage.setItem('isHome', JSON.stringify(isHomeArray))
    }
}

/**
 * Saves the previously answered survey question to an array of answers 
 * and displays the next survey question if there are any left
 */
async function nextQuestion() {
    // Flag to keep track if question was skipped/answered
    let answeredFlag = false

    let question = questions[questionIndex]

    // Get the submitted question's type
    const qType = question.type

    if (qType === 'nested') {
        let answers
        if (standAloneSurvey) {
            answers = document.querySelectorAll('#stand-alone-survey-answers input')
            if (answers.length === 0) {
                answers = document.querySelectorAll('#stand-alone-survey-answers select')
            }
        } else {
            answers = document.querySelectorAll('#answers input')
            if (answers.length === 0) {
                answers = document.querySelectorAll('#answers select')
            }
        }
        
        answers.forEach((answer, index) => {
            if (answer.value && answer.value !== 'Choose') {
                answeredFlag = true

                response[question.subquestions[index].attribute] = {
                    value: answer.value,
                    type: question.subquestions[index].attributeType
                }
            }
        })

    } else if (qType === 'radio') {
        const radioButtons = document.querySelectorAll('input[name="' + questionIndex +'"]');
        for (let radioButton of radioButtons) {
            if (radioButton.checked) {
                answeredFlag = true

                if (radioButton.value === 'School' || radioButton.value === 'Business') {
                    // Set isHome local storage variable to 'false'
                    updateIsHomeLocalStorage(false)

                    // Remove home related questions from the survey
                    removeFromQuestionsArray(ipAddressConstant)

                    // Update the progress bar to acccount for questions removed
                    numQuestions = questions.length
                    progressIncrement = 100 / numQuestions
                    questionTotalElement.textContent = numQuestions

                } else if (radioButton.value === 'Home') {
                    updateIsHomeLocalStorage(true)
                }

                response[question.attribute] = {
                    value: radioButton.value,
                    type: question.attributeType
                }

                break;
            }
        }
    } else if (qType === 'short-text' || qType === 'long-text' || qType === 'number') {
        let answer = document.getElementById(questionIndex).value
        if (answer) {
            answeredFlag = true

            response[question.attribute] = {
                value: answer,
                type: question.attributeType
            }
        }
    } else if (qType === 'select') {
        let answer
        if (standAloneSurvey) {
            answer = document.querySelector('#stand-alone-survey-answers select').value
        } else {
            answer = document.querySelector('#answers select').value
        }

        if (answer && answer !== 'Choose') {
            answeredFlag = true

            response[question.attribute] = {
                value: answer,
                type: question.attributeType
            }
        }
    }
   
    // If answer exists 
    if (answeredFlag) {
        // Add current question ID to answered questions in local storage
        answeredQuestions.push(questions[questionIndex].id)
    }

    // Remove current question's answers from the tree
    let node
    if (standAloneSurvey) {
        node = document.getElementById('stand-alone-survey-answers');
    } else {
        node = document.getElementById('answers');
    }
    
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
   
    // Increment number of questions answered (or skipped)
    questionIndex++

    // Update survey progress
    questionProgressElement.textContent = questionIndex
    surveyProgressBarElement.value = surveyProgressBarElement.value + progressIncrement


    // Hide survey element if no more questions to be answered
    if (questionIndex === numQuestions) {
        surveyElement.style.display = 'none'
        // Upload stand alone survey results and display thank you message
        if (standAloneSurvey) {
            const uuid = getUuid()
            await uploadSurveyData(null, addressLatConstant, addressLonConstant, addressTextConstant, null, null, phoneNumberConstant, true)
            document.getElementById('end-of-survey-message').style.display = 'flex'
        }
    }
    // Otherwise display the new question
    else {
        if (questionIndex === numQuestions - 1) {
            navBtn.textContent = 'Done'
        }
        addQuestionElement(questionIndex)  
    }
}

/**
 * Uploads the survey results to the database
 * @param {String} uuid 
 * @param {Float} addressLat 
 * @param {Float} addressLon 
 * @param {String} addressText 
 * @param {String} ispName 
 * @param {String} ipAddress 
 * @returns An object containing whether or not it was successful
 */
 async function uploadSurveyData(uuid, addressLat, addressLon, addressText, ispName, ipAddress, phoneNumber, standAloneSurvey) {
    let query = `mutation {
        updateMultitestSurveyResponse(
          data: {
           
            organizationId: ${organizationId}\n`
    
    if (uuid && ipAddress) {
        query += `userId: "${uuid}"
            ipAddress: "${ipAddress}"\n`
    } 

    if(phoneNumber) {
        console.log("here,", phoneNumber)
        query += `phoneNumber: "${phoneNumber}"\n`
    }
            
    if (addressLat && addressLon) {
        query += `addressLat: ${addressLat}
                addressLon: ${addressLon}\n`
    }

    if (addressText !== '') {
        query += `address: "${addressText}"\n`
    }

    if (ispName) {
        query += `ispName: "${ispName}"\n`
    }
 
    for (const attribute in response) {
        if (response[attribute].type === 'string') {
            query += `${attribute}: "${response[attribute].value}"\n`

        } else if (response[attribute].type === 'boolean') {
            let value;
            response[attribute].value === 'Yes' ? value = true : value = false
            query += `${attribute}: ${value}\n`
        } else {
            query += `${attribute}: ${response[attribute].value}\n`
        }
    }

    query += `}) {
        success
    }}`

    // TO DO: upload data to DB
    const body = JSON.stringify({
        query: query
    });

    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(res => res.json())
    .then (result => {
        if (!standAloneSurvey) {
            addToAnsweredQs(answeredQuestions, ipAddress)
        }
        
    })
    .catch(err => console.error(err))
}

// Event listeners
navBtn.onclick = nextQuestion

export { initSurvey, uploadSurveyData }