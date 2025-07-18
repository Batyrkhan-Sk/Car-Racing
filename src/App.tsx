import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/garage" />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
