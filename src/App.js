import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import { HomePage } from "./Screens/homepage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;