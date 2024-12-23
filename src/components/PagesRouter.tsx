import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./pages/Nav";
import AverageCasualties from "./pages/AverageCasualties";
import AttackTypes from "./pages/AttackTypes";


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
        </Routes>
      </div>
    </div>
  );
}
