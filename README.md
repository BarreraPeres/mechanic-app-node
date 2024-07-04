
## App de Gerenciamento De Agendamento de Serviços Para Mecânica


## Requistos Funcionais 
- [] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [] Deve ser possível registrar veículos 
- [x] Deve ser possível solicitar o agendamento de um serviço 
- [x] Deve ser possível escolher a data e o horário disponíveis.
- [X] Deve ser possível o cliente selecionar o tipo de serviço (manutenção, reparo e inspeção).
- [] Deve ser possível cliente confirma o agendamento
- [x] Deve ser possível o agendamento conter um status (agendado, pendente ou rejeitado)
- [] Deve ser possível visualizar o histórico de serviços em um veículo
- [x] Deve ser possíve funcionário emitir ordem de serviço para um veículo, detalhando os trabalhos e o valor.
- [] Deve ser possível buscar mecânicas proximas 
- [] Deve ser possível cadastrar mecânicas
- [] Deve ser possível buscar mecânicas pelo nome


## Regras De Negócio
- [] Não deve ser possível cadastrar dois usuários com o mesmo e-mail.
- [] Cada veículo deve estar associado a exatamente um usuário, mas um usuário pode ter múltiplos veículos.
- [] Não deve ser possivel, o pedido de agendamento, conflitar com um agentamento com status pedente
- [x] O sistema verifica a disponibilidade dos técnicos e do espaço.

    
## Requisitos Não Funcionais
- [] Devem ser implementados testes automatizados cobrindo pelo menos 80% do código.
- [] A senha do usuário precisa estar criptografada
- [] O usuário deve ser identificado por um JWT (JSON Web Token)


## tecnologias

- Typescript
- Fastify
- Postgress(Prisma)
- Vitest
- Zod


