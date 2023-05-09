import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import History from './components/History/History'
import Survey from './components/Survey/Survey'
import Test from './components/Test/Test'
import Results from './components/Results/Results'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/survey" element={<Survey />}/>
        <Route path="/test" element={<Test/>} />
        <Route path="/result/:resultId" element={<Results/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
