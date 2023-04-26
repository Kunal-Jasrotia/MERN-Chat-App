import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Chats from './pages/Chats';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chats />} />
      </Routes >
    </>
  );
}

export default App;
