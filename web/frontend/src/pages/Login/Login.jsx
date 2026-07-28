import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoPoupa from "../../assets/logoPoupa+.png";
import { api } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("poupamais.token", token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <img src={logoPoupa} alt="Logo Poupa+" className="h-32" />
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">Entrar na sua conta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            E-mail
            <input className="mt-1 block w-full rounded-md border border-gray-300 p-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Senha
            <input className="mt-1 block w-full rounded-md border border-gray-300 p-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">Ainda não tem conta? <Link className="text-indigo-600 hover:underline" to="/cadastro">Criar conta</Link></p>
      </section>
    </main>
  );
}
