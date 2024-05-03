
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Routes, Route, Navigate } from 'react-router-dom'

import RegistrationForm from './components/registrationForm';
import LoginForm from './components/loginForm';
import HomePage from './components/homePage';
import CandidateList from './components/candidates/candidateList';
import VoteConfirmation from './components/voteConfirmation';
import ResultsPage from './components/citySelection/liveResults';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/candidates" element = {<CandidateList />} />
        <Route path="/vote-cnfm" element = {<VoteConfirmation />} />
        <Route path="/results" element = {<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  
  
    </div>
  );
}

export default App;
