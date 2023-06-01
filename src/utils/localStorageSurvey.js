export function storeAnswers(answeredField, ipAddress) {
  if (!ipAddress) return
  
  let storedQuestionObjects = JSON.parse(localStorage.getItem('answeredQs'))

  if (storedQuestionObjects) {
    let ipExists = false
    storedQuestionObjects = storedQuestionObjects.map((questionObject) => {
      if (questionObject.ipAddress === ipAddress) {
        questionObject.answered = [...questionObject.answered, answeredField]
        ipExists = true
      }
      return questionObject
    })
    if (!ipExists) {
      storedQuestionObjects.push({
        ipAddress, 
        answered: [answeredField]
      })
    }
  } else {
    storedQuestionObjects = [{
      ipAddress, 
      answered: [answeredField]
    }]
  }
  localStorage.setItem('answeredQs', JSON.stringify(storedQuestionObjects))
}

export function storeIsHome(ipAddress, locationType) {
  if (!ipAddress) return
  let storedQuestionObjects = JSON.parse(localStorage.getItem('answeredQs'))

  if (storedQuestionObjects) {
    let ipExists = false
    storedQuestionObjects = storedQuestionObjects.map((questionObject) => {
      if (questionObject.ipAddress === ipAddress) {
        ipExists = true
        questionObject.isHome = locationType === 'Home'
      }
      return questionObject
    })
    if (!ipExists) {
      storedQuestionObjects.push({
        ipAddress, 
        isHome: locationType === 'Home'
      })
    }
  } else {
    storedQuestionObjects = [{
      ipAddress, 
      isHome: locationType === 'Home'
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
      if (ipAddress && questionObject.ipAddress === ipAddress) {

        if (questionObject.isHome === false ) {
          const questionIdsToRemove = [5, 6]
          questionIdsToRemove.forEach(questionId => {
            const index = newSurvey.findIndex(question => question.id === questionId)
            if (index != -1) {
              newSurvey.splice(index, 1)
            }
          })
        }

        for (const question of questionObject.answered) {
          // Finds the index of an attribute/survey question that has already been answered
          const indexOfObject = newSurvey.findIndex(surveyQuestion => {
            if (surveyQuestion.type === 'nested') {
              let subQuestionArray = surveyQuestion.subquestions
              for (const subQuestion of subQuestionArray) {
                if (subQuestion.attribute === question) {
                  return true
                }
              }
              return false
            }
              else {
              return surveyQuestion.attribute === question
            }
          })
          // Remove survey question from testSurvey 
          if (indexOfObject !== -1) {
            newSurvey.splice(indexOfObject, 1)
          }
        }
      }
    }
  }

  return newSurvey
}