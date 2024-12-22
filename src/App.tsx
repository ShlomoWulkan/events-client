import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import PagesRouter from "./components/PagesRouter";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PagesRouter />} />
        <Route path="pages/*" element={<PagesRouter />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
