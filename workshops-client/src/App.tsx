import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { WorkshopsPage } from "./pages/WorkshopsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Bienvenido! (home o dashboard)</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
