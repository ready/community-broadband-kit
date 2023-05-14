export function storeAnswers(answeredFields, ipAddress) {
  let storedQuestionObjects = JSON.parse(localStorage.getItem('answeredQs'))

  if (storedQuestionObjects) {
    let ipExists = false
    storedQuestionObjects = storedQuestionObjects.map((questionObject) => {
      if (questionObject.ipAddress === ipAddress) {
        questionObject.answered = [...questionObject.answered, ...answeredFields]
        ipExists = true
      }
      return questionObject
    })
    if (!ipExists) {
      storedQuestionObjects.push({
        ipAddress, 
        answered: answeredFields
      })
    }
  } else {
    storedQuestionObjects = [{
      ipAddress, 
      answered: answeredFields
    }]
  }
  localStorage.setItem('answeredQs', JSON.stringify(storedQuestionObjects))
}

export function getUnansweredQuestions(survey, ipAddress) {
  const newSurvey = survey.slice()
  // Gets the array of already answered survey questions from local storage
  const storedQuestionObjects = JSON.parse(localStorage.getItem('answeredQs'))

  // If answered questions exist for the ipAddress in local storage, remove them from the testSurvey array
  if (storedQuestionObjects) {
    for (const questionObject of storedQuestionObjects) {
      if (questionObject.ipAddress === ipAddress) {
        for (const question of questionObject.answered) {
          // Finds the index of an attribute/survey question that has already been answered
          const indexOfObject = survey.findIndex(surveyQuestion => {
            if (surveyQuestion.type === 'nested') {
              let subQuestionArray = surveyQuestion.subquestions
              for (const subQuestion of subQuestionArray) {
                return subQuestion.attribute === question
              }
            }
              else {
              return surveyQuestion.attribute === question;
            }
          })
          // Remove survey question from testSurvey 
          newSurvey.splice(indexOfObject, 1)
        }
      }
    }
  }

  return newSurvey
}