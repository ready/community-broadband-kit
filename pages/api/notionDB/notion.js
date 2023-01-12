const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})

const getDatabase = async () => {
  const res = await notion.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID })
  return res.results[0].properties.customId.number
}

// const getDatabasemeta=(async()=>{
// const res =  await notion.databases.retrieve({database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID,});
// console.log("resres",res.properties.test.multi_select)
// console.log(" res.results[0].properties.id.number", res.results[0].properties.id.number)
// return res.results[0].properties.id.numberc
//  })

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  try {
    const customId = await getDatabase() + 1
    console.log('idid', await getDatabase())
    const data = JSON.parse(req.body)
    console.log('data', data, typeof (data))
    const {
      applicantType,
      email,
      fccIspId,
      fundingSoughtEstimate,
      interestedInFunding,
      matchFunding,
      name,
      organizationName,
      phone,
      states,
      title,
      website,
      fundingTypes,
      hearAbout,
      someWhereElseName,
      assessment,
      broadbandOperator,
      broadbandPlan,
      dataMappingBroadband,
      questionsNTIA,
      strategy,
      AUM,
      broadbandInfrastructure,
      financialGoals,
      investmentGroup,
      standaloneProjectsPoolProjects,
      investmentOpportunities,
      successfulProject,
      joinBBMExpert,
      areaOfExpertise,
      references,
      businessEstablishedYear,
      broadbandOperatorNames,
      fromTelecompetitor,
      nrecaSharing,
      offerInternetService,
      interestedMapCommunity,
      alreadyMapCommunity,
      createdBroadbandPlan,
      planPublishedOnline,
      connectedBroadbandOffice,
      connectivityProfile,
      planUrl,
      timeLine,
      interestedFields,
      interestedFieldsOther,
      questionsForUs

    } = JSON.parse(req.body)
    // define is_test based on env

    const env = process.env.NEXT_PUBLIC_ENVIORNMENT
    let is_test = ''
    if (env === 'prod') {
      is_test = 'No'
    } else {
      is_test = 'Yes'
    }
    let fccIspId1 = fccIspId
    let title1 = title
    let phone1 = phone
    let someWhereElseName1 = someWhereElseName
    let hearAbout1 = hearAbout
    let fundingSoughtEstimate1 = fundingSoughtEstimate
    let matchFunding1 = matchFunding
    let interestedInFunding1 = interestedInFunding
    if (typeof (fccIspId) === 'undefined') { fccIspId1 = 'null' }
    if (typeof (title) === 'undefined') { title1 = 'null' }
    if (typeof (phone) === 'undefined') { phone1 = 'null' }
    if (typeof (someWhereElseName) === 'undefined') { someWhereElseName1 = 'null' }
    if (typeof (hearAbout) === 'undefined') { hearAbout1 = 'null' }
    if (typeof (applicantType) === 'undefined') { applicantType = 'null' }
    if (typeof (email) === 'undefined') { email = 'null' }
    if (typeof (fundingSoughtEstimate) === 'undefined') { fundingSoughtEstimate1 = 'null' }

    if (typeof (matchFunding) === 'undefined') { matchFunding1 = false }
    if (typeof (name) === 'undefined') { name = 'null' }
    if (typeof (organizationName) === 'undefined') { organizationName = 'null' }
    let website1 = website
    if (typeof (website) === 'undefined') { website1 = 'null' }
    if (typeof (interestedInFunding) === 'undefined') { interestedInFunding1 = false }
    let assessment1 = assessment
    let broadbandOperator1 = broadbandOperator
    let broadbandPlan1 = broadbandPlan
    let dataMappingBroadband1 = dataMappingBroadband
    let questionsNTIA1 = questionsNTIA
    let strategy1 = strategy
    let broadbandOperatorNames1 = broadbandOperatorNames
    if (typeof (assessment) === 'undefined') { assessment1 = false }
    if (typeof (broadbandOperator) === 'undefined') { broadbandOperator1 = false }
    if (typeof (broadbandPlan) === 'undefined') { broadbandPlan1 = false }
    if (typeof (dataMappingBroadband) === 'undefined') { dataMappingBroadband1 = false }
    if (typeof (questionsNTIA) === 'undefined') { questionsNTIA1 = false }
    if (typeof (strategy) === 'undefined') { strategy1 = false }
    if (typeof (broadbandOperatorNames) === 'undefined') { broadbandOperatorNames1 = 'null' }
    let AUM1 = AUM
    let broadbandInfrastructure1 = broadbandInfrastructure
    let investmentGroup1 = investmentGroup
    let standaloneProjectsPoolProjects1 = standaloneProjectsPoolProjects
    if (typeof (AUM) === 'undefined') { AUM1 = 'null' }
    if (typeof (broadbandInfrastructure) === 'undefined') { broadbandInfrastructure1 = false }
    if (typeof (investmentGroup) === 'undefined') { investmentGroup1 = 'null' }
    if (typeof (standaloneProjectsPoolProjects) === 'undefined') { standaloneProjectsPoolProjects1 = 'null' }
    let successfulProject1 = successfulProject
    let joinBBMExpert1 = joinBBMExpert
    let references1 = references
    let businessEstablishedYear1 = businessEstablishedYear
    if (typeof (successfulProject) === 'undefined') { successfulProject1 = false }
    if (typeof (joinBBMExpert) === 'undefined') { joinBBMExpert1 = false }
    if (typeof (references) === 'undefined') { references1 = 'null' }
    if (typeof (businessEstablishedYear) === 'undefined') { businessEstablishedYear1 = 'null' }

    let fromTelecompetitor1 = fromTelecompetitor
    if (typeof (fromTelecompetitor) === 'undefined') { fromTelecompetitor1 = false }
    const nrecaSharing1 = nrecaSharing?.includes(true) || false
    let offerInternetService1 = offerInternetService
    if (typeof (offerInternetService) === 'undefined') { offerInternetService1 = 'null' }

    let interestedMapCommunity1 = interestedMapCommunity
    let alreadyMapCommunity1 = alreadyMapCommunity
    let createdBroadbandPlan1 = createdBroadbandPlan
    let planPublishedOnline1 = planPublishedOnline
    let connectedBroadbandOffice1 = connectedBroadbandOffice
    let connectivityProfile1 = connectivityProfile
    let planUrl1 = planUrl
    if (typeof (interestedMapCommunity) === 'undefined') { interestedMapCommunity1 = false }
    if (typeof (alreadyMapCommunity) === 'undefined') { alreadyMapCommunity1 = false }
    if (typeof (createdBroadbandPlan) === 'undefined') { createdBroadbandPlan1 = false }
    if (typeof (planPublishedOnline) === 'undefined') { planPublishedOnline1 = false }
    if (typeof (planUrl) === 'undefined') { planUrl1 = '' }
    if (typeof (connectedBroadbandOffice) === 'undefined') { connectedBroadbandOffice1 = false }
    if (typeof (connectivityProfile) === 'undefined') { connectivityProfile1 = false }

    let timeLine1 = timeLine
    let interestedFields1 = interestedFields
    let interestedFieldsOther1 = interestedFieldsOther
    let questionsForUs1 = questionsForUs
    if (typeof (timeLine) === 'undefined') { timeLine1 = 'null' }
    if (typeof (interestedFields) === 'undefined') { interestedFields1 = 'null' }
    if (typeof (interestedFieldsOther) === 'undefined') { interestedFieldsOther1 = 'null' }
    if (typeof (questionsForUs) === 'undefined') { questionsForUs1 = 'null' }

    // for funding type mutiselect
    let map_fundingtypes = [{ name: 'null' }]
    if (typeof (fundingTypes) !== 'undefined') {
      map_fundingtypes = Object.values(fundingTypes).map((fundingType) => {
        const fundObject = new Object()
        fundObject.name = fundingType
        return fundObject
      })
    }
    // for states mutiselect
    let map = [{ name: 'null' }]
    if (typeof (states) !== 'undefined') {
      map = Object.values(states).map((state) => {
        const fundObject = new Object()
        fundObject.name = state
        return fundObject
      })
    }
    // for financialGoals mutiselect
    let map_financialGoals = [{ name: 'null' }]
    if (typeof (investmentOpportunities) !== 'undefined') {
      map_financialGoals = Object.values(financialGoals).map((financialGoal) => {
        const fundObject = new Object()
        fundObject.name = financialGoal
        return fundObject
      })
    }
    // for investmentOpportunitie smutiselect
    let map_investmentOpportunities = [{ name: 'null' }]
    if (typeof (investmentOpportunities) !== 'undefined') {
      map_investmentOpportunities = Object.values(investmentOpportunities).map((investmentOpportunitie) => {
        const fundObject = new Object()
        fundObject.name = investmentOpportunitie
        return fundObject
      })
    }
    // for areaOfExpertise  mutiselect
    let map_areaOfExpertise = [{ name: 'null' }]
    if (typeof (areaOfExpertise) !== 'undefined') {
      map_areaOfExpertise = Object.values(areaOfExpertise).map((Expertise) => {
        const fundObject = new Object()
        fundObject.name = Expertise
        return fundObject
      })
    }

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toISOString()

    let fundingSoughtEstimate_string = ''
    let lower_bound = null
    let upper_bound = null
    if (fundingSoughtEstimate === 'dontKnow') {
      fundingSoughtEstimate_string = "I don't know"
    } else if (fundingSoughtEstimate === 'oneHundredMillionPlus') {
      fundingSoughtEstimate_string = '100M+'
      lower_bound = 100000000
      upper_bound = 100000000
    } else if (fundingSoughtEstimate === 'fiveMillionToTwentyFiveMillion') {
      fundingSoughtEstimate_string = '5M-25M'
      lower_bound = 5000000
      upper_bound = 25000000
    } else if (fundingSoughtEstimate === 'twentyFiveMillionToOneHundredMillion') {
      fundingSoughtEstimate_string = '25M-100M'
      lower_bound = 25000000
      upper_bound = 100000000
    } else if (fundingSoughtEstimate === 'oneMillionToFiveMillion') {
      fundingSoughtEstimate_string = '1M-5M'
      lower_bound = 1000000
      upper_bound = 5000000
    } else if (fundingSoughtEstimate === 'hundredThounsandToOneMillion') {
      fundingSoughtEstimate_string = '100K-1M'
      lower_bound = 100000
      upper_bound = 1000000
    } else { fundingSoughtEstimate_string = 'null' }

    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID
      },
      properties: {
        organization_name: {
          title: [
            {
              text: {
                content: organizationName
              }
            }
          ]
        },
        name: {
          rich_text: [
            {
              text: {
                content: name

              }
            }
          ]
        },
        email: {
          email
        },
        customId: {
          number: customId
        },
        phone: {
          rich_text: [
            {
              text: {
                content: phone1
              }
            }
          ]

        },
        Title: {
          rich_text: [
            {
              text: {
                content: title1
              }
            }
          ]
        },
        funding_types: {
          multi_select: map_fundingtypes
        },
        states: {
          multi_select: map
        },
        applicant_type: {
          select: {
            name: applicantType
          }
        },
        website: {
          url: website1
        },
        fcc_isp_id: {
          rich_text: [
            {
              text: {
                content: fccIspId1
              }
            }
          ]

        },

        funding_sought_estimate: {
          select: {
            name: fundingSoughtEstimate_string
          }
        },
        hear_about_us: {
          select: {
            name: hearAbout1
          }
        },
        somewhere_else: {
          rich_text: [
            {
              text: {
                content: someWhereElseName1

              }
            }
          ]
        },
        'Has match': {
          checkbox: matchFunding1
        },
        'Wants match': {
          checkbox: interestedInFunding1
        },
        assessment: {
          checkbox: assessment1
        },
        broadbandOperator: {
          checkbox: broadbandOperator1
        },
        broadbandPlan: {
          checkbox: broadbandPlan1
        },
        strategy: {
          checkbox: strategy1
        },
        broadbandOperatorNames: {
          rich_text: [
            {
              text: {
                content: broadbandOperatorNames1
              }
            }
          ]

        },
        questionsNTIA: {
          checkbox: questionsNTIA1
        },
        dataMappingBroadband: {
          checkbox: dataMappingBroadband1
        },
        AUM: {
          select: {
            name: AUM1
          }
        },
        investmentGroup: {
          select: {
            name: investmentGroup1
          }
        },
        standaloneProjectsPoolProjects: {
          select: {
            name: standaloneProjectsPoolProjects1
          }
        },
        broadbandInfrastructure: {
          checkbox: broadbandInfrastructure1
        },
        financialGoals: {
          multi_select: map_financialGoals
        },
        investmentOpportunities: {
          multi_select: map_investmentOpportunities
        },
        businessEstablishedYear: {
          rich_text: [
            {
              text: {
                content: businessEstablishedYear1
              }
            }
          ]

        },
        references: {
          rich_text: [
            {
              text: {
                content: references1
              }
            }
          ]

        },
        areaOfExpertise: {
          multi_select: map_areaOfExpertise
        },
        successfulProject: {
          checkbox: successfulProject1
        },
        joinBBMExpert: {
          checkbox: joinBBMExpert1
        },

        is_test: {
          select: {
            name: is_test
          }
        },
        created_at: {
          date: { start: today }
        },
        lower_bound: {
          number: lower_bound
        },
        upper_bound: {
          number: upper_bound
        },
        fromTelecompetitor: { checkbox: fromTelecompetitor1 },
        nrecaSharing: { checkbox: nrecaSharing1 },
        offerInternetService: {
          select: {
            name: offerInternetService1
          }
        },
        interestedMapCommunity: {
          checkbox: interestedMapCommunity1
        },
        alreadyMapCommunity: {
          checkbox: alreadyMapCommunity1
        },
        createdBroadbandPlan: {
          checkbox: createdBroadbandPlan1
        },
        planPublishedOnline: {
          checkbox: planPublishedOnline1
        },
        connectedBroadbandOffice: {
          checkbox: connectedBroadbandOffice1
        },
        connectivityProfile: {
          checkbox: connectivityProfile1
        },
        planUrl: {
          rich_text: [
            {
              text: {
                content: planUrl1
              }
            }
          ]

        },
        timeLine: {
          select: {
            name: timeLine1
          }
        },
        interestedFields: {
          select: {
            name: interestedFields1
          }
        },
        interestedFieldsOther: {
          rich_text: [
            {
              text: {
                content: interestedFieldsOther1
              }
            }
          ]

        },
        questionsForUs: {
          rich_text: [
            {
              text: {
                content: questionsForUs1
              }
            }
          ]

        }
      }
    })
    res.status(201).json({ msg: 'Successsend to notion ' })
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' })
  }
}
