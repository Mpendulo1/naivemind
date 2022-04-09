import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./index.css";

import {Navbar} from "./components/Navbar";
import { ModelContextProvider } from "./contexts/ModelContext";

import Home from "./pages/Home";
import Model from "./pages/Model";
import NotFound from "./pages/NotFound";

function App() {

  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen( prevState => !prevState );
  }

  return (
    <div className="App min-h-screen bg-yellow-50 py-2 px-3">
      <Router>
        <Navbar navIsOpen={navIsOpen} toggleNav={toggleNav} />

        <ModelContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ModelContextProvider>
      </Router>
    </div>
  );
}

export default App;
