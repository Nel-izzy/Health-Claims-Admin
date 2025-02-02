
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InfluencerDetails from "./pages/InfluencerDetails";
import Research from "./pages/Research";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/influencer/:id" element={<InfluencerDetails />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </>
  );
}

export default App;