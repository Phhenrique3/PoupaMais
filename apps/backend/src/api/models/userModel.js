// Array que armazena os usuários em memória (simulação de banco de dados)
// ⚠️ Em produção, usar banco real (MongoDB, PostgreSQL, etc)
const users = [];

module.exports = {
  /**
   * Cria um novo usuário e adiciona ao array
   * @param {Object} userData - Dados do usuário (nome, email, senha, etc)
   * @returns {Object} - O usuário criado
   */
  create(userData) {
    // Adiciona o novo usuário ao array
    users.push(userData);
    return userData;
  },

  /**
   * Busca um usuário pelo email
   * @param {string} email - Email do usuário a ser encontrado
   * @returns {Object|undefined} - Retorna o usuário se encontrado, ou undefined
   */
  findByEmail(email) {
    // Procura no array de usuários usando o método find
    return users.find((client) => client.email === email);
  },
};
