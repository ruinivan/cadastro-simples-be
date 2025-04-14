CRUD de Usuários

Backend (API REST)
Implemente os seguintes endpoints:

Usuários

[GET] /usuarios – Listar todos os usuários [x]

[GET] /usuarios/:id – Obter detalhes de um usuário específico [x]

[POST] /usuarios – Criar um novo usuário [x]

[PATCH] /usuarios/:id – Atualizar os dados de um usuário [x]

[DELETE] /usuarios/:id – Excluir um usuário [x]

Login

[POST] /login – Simular o login de um usuário (sem autenticação real) [x]

Observação: A rota de login deve verificar se o e-mail e a senha existem no banco e retornar uma resposta de sucesso ou erro. Não utilizar autenticação JWT.

Frontend
A interface deve conter as seguintes telas:

Tela de login: formulário para simular login []
Tela de cadastro de usuário: formulário para criar um novo usuário []
Tela de listagem de usuários: onde será possível listar, criar, editar e excluir usuários []