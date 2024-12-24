import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./pages/Nav";
import AverageCasualties from "./pages/AverageCasualties";
import AttackTypes from "./pages/AttackTypes";
import YearsGraph from "./pages/YearsGraph";
import GangCountry from "./pages/GangCountry";
import GangesByYear from "./pages/GangesByYear";
import DeadliestGangCountry from "./pages/DeadliestGangCountry";


export default function PagesRouter() {
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-100 overflow-hidden p-10">
      <Nav />
      <div className="flex-grow ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/attack-types" element={<AttackTypes />} />
          <Route path="/average-casualties" element={<AverageCasualties />} />
          <Route path="/years-incidents" element={<YearsGraph />} />
          <Route path="/gang-country" element={<GangCountry />} />
          <Route path="/ganges-by-year" element={<GangesByYear />} />
          <Route path="/deadliest-gang-country" element={<DeadliestGangCountry />} />
        </Routes>
      </div>
    </div>
  );
}
