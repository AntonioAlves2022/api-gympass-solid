# REQUISITOS FUNCIONAIS (RF)
 - [ x ] Deve ser possivel se cadastrar na aplicação;
 - [ ] Deve ser possivel se autenticar na aplicação;
 - [ ] Deve ser possivel visualizar o perfil do usuário logado;
 - [ ] Deve ser possivel recuperar o número de check-ins realizados pelo usuário;
 - [ ] Deve ser possivel pesquisar por academias próximas do usuário;
 - [ ] Deve ser possível pesquisar academias pelo nome;
 - [ ] Deve ser possivel realizar o check-in do usuário na academia;
 - [ ] Deve ser possível validar o check-in do usuário;

# REGRAS DE NEGÓCIO (RN)
 - [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
 - [ ] O usuário não deve poder realizar mais de um check-in no mesmo dia;
 - [ ] O usuário não deve poder realizar o check-in a uma distância superior a 100 metros da localização da academia;
 - [ ] O check-in deve ser validado em até 20 minutos após sua criação;
 - [ ] O check-in deve ser validado por um administrador da aplicação;
 - [ ] As academias só podem ser cadastradas por um administrador da aplicação;

# REQUISITOS NÃO FUNCIONAIS (RNF)
- [ x ] A senha deve ser criptografada;
- [ ] Os dados da aplicação devem ser persistidos em um banco POSTGRESQL
- [ ] As pesquisas devem paginadas e mostrar 20 resultados por página
- [ ] O usuário deve ser autenticado por JSON WEB Token (JWT)
