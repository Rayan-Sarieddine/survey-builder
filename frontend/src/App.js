import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Survey from "./pages/Survey";
import Surveys from "./pages/Surveys";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/surveys" element={<Surveys />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
