import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./pages/Nav";


export default function PagesRouter() {
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-600 text-gray-100 overflow-hidden">
      <Nav />
      <div className="flex-grow ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
