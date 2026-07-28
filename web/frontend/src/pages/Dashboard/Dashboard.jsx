import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/auth/me")
      .then(setUser)
      .catch((err) => {
        localStorage.removeItem("poupamais.token");
        setError(err.message);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  function logout() {
    localStorage.removeItem("poupamais.token");
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-sm text-gray-500">Poupa+</p><h1 className="text-2xl font-semibold text-gray-800">Olá, {user?.name || "..."}</h1></div>
          <button onClick={logout} className="rounded-md border border-gray-300 px-4 py-2 text-sm">Sair</button>
        </div>
        {error ? <p role="alert" className="mt-6 text-red-600">{error}</p> : <p className="mt-8 text-gray-600">Autenticação concluída. O próximo passo é criar categorias e lançamentos financeiros.</p>}
      </section>
    </main>
  );
}
