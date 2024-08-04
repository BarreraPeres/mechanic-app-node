
## App de Gerenciamento De Agendamento de Serviços Para Mecânica


## Requistos Funcionais 
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível registrar veículos 
- [x] Deve ser possível solicitar o agendamento de um serviço 
- [x] Deve ser possível escolher a data e o horário disponíveis.
- [X] Deve ser possível o cliente selecionar o tipo de serviço (manutenção, reparo e inspeção).
- [x] Deve ser possível cliente confirma o agendamento
- [x] Deve ser possível o agendamento conter um status (agendado, pendente ou rejeitado)
- [x] Deve ser possível visualizar o histórico de serviços em um veículo
- [x] Deve ser possível visualizar o histórico de agendamentos
- [x] Deve ser possíve funcionário emitir ordem de serviço para um veículo, detalhando os trabalhos e o valor.
- [x] Deve ser possível buscar mecânicas proximas (até 10km)
- [x] Deve ser possível cadastrar mecânicas
- [x] Deve ser possível buscar mecânicas pelo nome


## Regras De Negócio
- [x] Não deve ser possível cadastrar dois usuários com o mesmo e-mail.
- [x] Cada veículo deve estar associado a exatamente um usuário, mas um usuário pode ter múltiplos veículos.
- [x] Não deve ser possivel, o pedido de agendamento, conflitar com um agentamento com status pedente
- [x] O sistema verifica a disponibilidade dos técnicos e do espaço.

    
## Requisitos Não Funcionais
- [x] Devem ser implementados testes automatizados cobrindo pelo menos 80% do código.
- [x] A senha do usuário precisa estar criptografada
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)


## tecnologias

- Typescript
- Fastify
- Postgress(Prisma)
- Vitest
- Zod


