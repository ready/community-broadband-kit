'use strict'

// False in deployed environments
export const LOCAL_TESTING_FLAG = window.location.href.includes('localhost')

const BGA_URLS = {
    local: 'http://localhost:4000/graphql',
    dev: 'https://boss-api-dev.wl.r.appspot.com/graphql',
    prod: 'https://api.ready.net/graphql'
}

// Graphql API url for client-side
export const BGA_URL = LOCAL_TESTING_FLAG ? BGA_URLS.local : BGA_URLS.prod

// TODO: Change depending on local, dev, prod
export const DEFAULT_ORG_ID = ['505', '281']

// Address input is required by default
export const REQUIRE_ADDRESS_FLAG = true

// Survey questions and answers
export const survey = [
    {
        id: 0,
        question: "Which best describes the location you are reporting?",
        type: "radio",
        answers: ["Home", "Business", "School"],
        attribute: "locationType",
        attributeType: "string"
    },
    {
        id: 1,
        question: "What is the primary type of internet service used at this location?",
        type: "radio",
        answers: ["Cable", "DSL (Digital Subscriber Line)", "Fiber", "Fixed wireless", "Satellite", "Dial-up", "Not sure"],
        attribute: "internetType",
        attributeType: "string"
    },
    {
        id: 2,
        question: "Select the range which best describes which tier of service you are subscribed to.",
        type: "nested",
        subquestions: [
            {
                question: "Download:",
                type: "select",
                attribute: "downloadTier",
                attributeType: "string",
                answers: [
                    "Choose",
                    "0 to 10 Mbps",
                    "10 to 50 Mbps",
                    "51 to 100 Mbps",
                    "101 to 300 Mbps",
                    "301 to 600 Mbps",
                    "601 to 1000 Mbps",
                    "Over 1000 Mbps"
                ]
            },
            {
                question: "Upload:",
                type: "select",
                attribute: "uploadTier",
                attributeType: "string",
                answers: [
                    "Choose",
                    "0 to 10 Mbps",
                    "10 to 50 Mbps",
                    "51 to 100 Mbps",
                    "101 to 300 Mbps",
                    "301 to 600 Mbps",
                    "601 to 1000 Mbps",
                    "Over 1000 Mbps"
                ]
            },
        ],
    },
    {
        id: 3,
        question: "Are you paying for the highest tier of service available from your provider?",
        type: "radio",
        answers: ["Yes", "No", "I don't know"],
        attribute: "usesHighestTier",
        attributeType: "string"
    },
    {
        id: 4,
        question: "On average how many devices at your location use the internet at the same time?",
        type: "select",
        attribute: "countDevices",
        attributeType: "string",
        answers: [
            "Choose",
            "None",
            "1 device",
            "2 devices",
            "3 devices",
            "4 devices",
            "5 devices",
            "6+ devices",
        ]
    },
    {
        id: 5,
        question: 'How many people live in your home?',
        type: 'select',
        attribute: "countPeople",
        attributeType: "string",
        answers: [
            "Choose",
            "1 person",
            "2 people",
            "3 people",
            "4 people",
            "5 people",
            "6+ people",
        ]
    },
    {
        id: 6,
        question: "How many people at your location are...",
        type: "nested",
        subquestions: [
            {
                question: "Students:",
                type: "select",
                attribute: "countStudents",
                attributeType: "string",
                answers: [
                    "Choose",
                    "None",
                    "1 student",
                    "2 students",
                    "3 students",
                    "4 students",
                    "5 students",
                    "6+ students",
                ]
            },
            {
                question: "Seniors:",
                type: "select",
                attribute: "countSeniors",
                attributeType: "string",
                answers: [
                    "Choose",
                    "None",
                    "1 senior",
                    "2 seniors",
                    "3 seniors",
                    "4 seniors",
                    "5 seniors",
                    "6+ seniors",
                ]
            },
            {
                question: "Work-from-home:",
                type: "select",
                attribute: "countWorkFromHome",
                attributeType: "string",
                answers: [
                    "Choose",
                    "None",
                    "1 person",
                    "2 people",
                    "3 people",
                    "4 people",
                    "5 people",
                    "6+ people",
                ]
            }
        ],
    },
    {
        id: 7,
        question: "How many people can use your current internet connection at once without any stalling, long waits for downloads, or other delays?",
        type: "select",
        attribute: "countPeopleNoDelay",
        attributeType: "string",
        answers: [
            "Choose",
            "None",
            "1 person",
            "2 people",
            "3 people",
            "4 people",
            "5 people",
            "6+ people",
        ]
    },
    {
        id: 8,
        question: "Does anyone at your location use the internet to complete school assignments or job training course work?",
        type: "radio",
        answers: ["Yes", "No"],
        attribute: "usesInternetForSchool",
        attributeType: "boolean"
    },
    {
        id: 9,
        question: "How important is the internet to your daily life?",
        type: "radio",
        answers: ["Very important", "Somewhat important", "Less important"],
        attribute: "internetImportance",
        attributeType: "string"
    },
    {
        id: 10,
        question: 'What is your primary use of the internet?',
        type: 'radio',
        answers: ['Telehealth', 'Education', 'Work', 'Entertainment', 'Communication', 'Other'],
        attribute: "internetUse",
        attributeType: "string"
    },
    {
        id: 11,
        question: "How satisfied are you with the speed of your connection?",
        type: "radio",
        answers: ["Very satisfied", "Somewhat satisfied", "Somewhat dissatisfied", "Very dissatisfied", "No opinion"],
        attribute: "speedSatisfaction",
        attributeType: "string"
    },
    {
        id: 12,
        question: "How satisfied are you with the reliability of your connection?",
        type: "radio",
        answers: ["Very satisfied", "Somewhat satisfied", "Somewhat dissatisfied", "Very dissatisfied", "No opinion"],
        attribute: "reliabilitySatisfaction",
        attributeType: "string"
    },
    {
        id: 13,
        question: "When do you struggle most with your internet?",
        type: "radio",
        answers: ["While streaming videos", "On video calls", "While loading pages on the internet", "I don't struggle with my internet"],
        attribute: "struggleMost",
        attributeType: "string"
    },
    {
        id: 14,
        question: "If you participate in video calls do you struggle with lagging and or dropping out of calls?",
        type: "radio",
        answers: ["Yes", "No", "I do not participate in video calls"],
        attribute: "videoCallLag",
        attributeType: "string"
    },
    {
        id: 15,
        question: "What are your reasons for any dissatisfaction with your current internet service?",
        type: "radio",
        answers: ["Price is too high", "Service is unreliable", "Lack of technical support", "Connection is too slow", "Poor customer service", "Other", "I'm not dissatisfied"],
        attribute: "dissatisfactionReasons",
        attributeType: "string"
    },
    {
        id: 16,
        question: "Do you have trouble paying for the internet?",
        type: "radio",
        answers: ["Yes", "No"],
        attribute: "hasTroublePaying",
        attributeType: "boolean"
    },
    {
        id: 17,
        question: "To the best of your knowledge, how much are you currently paying per month for internet access?",
        type: "radio",
        answers: ["Under $30", "$30 to $49", "$50 to $69", "$70 to $99", "$100 to $149", "$150 to $199", "Over $200"],
        attribute: "currentCost",
        attributeType: "string"
    },
    {
        id: 18,
        question: "How much (per month) would you be willing to pay for high-quality internet service that meets your needs/requirements?",
        type: "radio",
        answers: ["$30 to $49", "$50 to $69", "$70 to $99", "$100 to $149", "$150 to $199", "Over $200"],
        attribute: "idealCost",
        attributeType: "string"
    },
    {
        id: 19,
        question: "If you were offered to upgrade to a better service plan, how much more would you be willing to pay?",
        type: "radio",
        answers: ["None, I wouldn't upgrade", "Less than $20",  "$20 to $29", "$30 to $39", "$40 to $59", "$60 to $99", "Over $100", "Not sure"],
        attribute: "idealAdditionalCost",
        attributeType: "string"
    },
    {
        id: 20,
        question: "If you were offered a $30 per month credit toward your internet bill, would you use it?",
        type: "radio",
        answers: ["Yes", "No"],
        attribute: "wouldUseCredit",
        attributeType: "boolean"
    },
    {
        id: 21,
        question: "Considering your current expenses and needs, how much would you be willing to pay monthly for a 1 Gbps (gigabits per second) speed internet access at your location?",
        type: "radio",
        answers: ["$30 to $49", "$50 to $69", "$70 to $99", "$100 to $149", "$150 to $199", "Over $200"],
        attribute: "idealGigCost",
        attributeType: "string",
    },
    {
        id: 22,
        question: "Do you use cellular service at this location? (e.g. Verizon, T-Mobile, AT&T, US Cellular, Sprint, etc.)",
        type: "radio",
        answers: ["Yes, for voice calls and internet data", "Yes, for voice calls only", "Yes, for internet data only", "No, I do not have cellular service here", "Not sure"],
        attribute: "usesCell",
        attributeType: "string"
    },
    {
        id: 23,
        question: "How satisfied are you with the cellular service at this location?",
        type: "radio",
        answers: ["Very satisfied", "Somewhat satisfied", "Somewhat dissatisfied", "Very dissatisfied", "No opinion"],
        attribute: "cellSatisfaction",
        attributeType: "string"
    },
]

// Map constants
export const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVhZHlnZW8iLCJhIjoiY2t1emEybG85N2F6ZzJwbzNycWhkcjByeiJ9.Ego8nI7YHxkQMQNus_SFyw'
export const MAP_LIGHT_STYLE = "mapbox://styles/mapbox/light-v10"
export const MAP_COUNTY_LAYER_ID = "bosscounty_mapbox"
export const MAP_COUNTY_LAYER_URL = "mapbox://readygeo.boss_county"
export const DETROIT_COUNTY_GEOIDS = ['26163']

export const APOLLO_CLIENT_NAME = 'Community Broadband Kit'