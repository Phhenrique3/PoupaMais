import { Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("poupamais.token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
