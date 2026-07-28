import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/api/auth/register", { method: "POST", body: JSON.stringify(form) });
      navigate("/login", { replace: true, state: { message: "Conta criada. Agora entre para continuar." } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-800">Crie sua conta</h1>
        <p className="mb-6 text-center text-sm text-gray-600">Comece a organizar sua vida financeira.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Nome<input className="mt-1 block w-full rounded-md border border-gray-300 p-2" name="name" value={form.name} onChange={updateField} required /></label>
          <label className="block text-sm font-medium text-gray-700">E-mail<input className="mt-1 block w-full rounded-md border border-gray-300 p-2" type="email" name="email" value={form.email} onChange={updateField} required /></label>
          <label className="block text-sm font-medium text-gray-700">Senha<input className="mt-1 block w-full rounded-md border border-gray-300 p-2" type="password" name="password" minLength="6" value={form.password} onChange={updateField} required /></label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">{loading ? "Criando..." : "Criar conta"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">Já possui conta? <Link className="text-indigo-600 hover:underline" to="/login">Entrar</Link></p>
      </section>
    </main>
  );
}
