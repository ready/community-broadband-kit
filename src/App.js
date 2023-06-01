import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import HistoryPage from './components/History/HistoryPage'
import SurveyPage from './components/Survey/SurveyPage'
import TestPage from './components/Test/TestPage'
import ResultsPage from './components/Results/ResultsPage'
import ScrollToHashElement from './components/common/ScrollToHashElement/ScrollToHashElement'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/survey" element={<SurveyPage />}/>
        <Route path="/test" element={<TestPage />} />
        <Route path="/result/:resultId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
