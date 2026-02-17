import AppLayout from "@/components/AppLayout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegistraCopie from "./components/RegistraCopie";
import GestioneDocenti from "./components/GestioneDocenti";
import GestioneUtenze from "./components/GestioneUtenze";
import Login from "./components/Login";
import Register from "./components/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function App() {
  const queryClient = new QueryClient()
return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} /> 
    <Route element={<AppLayout />}>
      <Route path="/" element={<RegistraCopie />} />
      <Route path="/dashboard-insegnanti" element={<Navigate to="/gestione-docenti" replace />} />
      <Route path="/gestione-docenti" element={<GestioneDocenti />} />
      <Route path="/gestione-utenze" element={<GestioneUtenze />} />
    </Route>
  </Routes>
  </BrowserRouter>
  </QueryClientProvider>
);
}

export default App;