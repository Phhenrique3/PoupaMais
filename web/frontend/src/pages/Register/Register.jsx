import { useState } from "react";
import { Link } from "react-router-dom";
import logoPoupa from "../../assets/logoPoupa+.png";
import Input from "../../components/Inputs";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    // 🔎 PARTE 1 — você deve melhorar essa validação
    if (!name || !email || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      // 🔎 PARTE 2 — aqui você deve integrar com sua API
      console.log("Cadastro enviado:", { name, email, password });

      // depois você pode redirecionar para login
    } catch (error) {
      console.error("Erro no cadastro", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src={logoPoupa} alt="Logo Poupa+" className="h-40" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Criar nova conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
          />

          <Input
            label="E-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <div className="flex justify-between items-center text-sm">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Já tenho conta
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}
