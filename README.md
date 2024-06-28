
## App de Gerenciamento De Agendamento de Serviços Para Mecânica


## Requistos Funcionais 
- [] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [] Deve ser possível registrar veículos 
- [] Deve ser possível solicitar o agendamento de um serviço 
- [] Deve ser possível escolher a data e o horário disponíveis.
- [X] Deve ser possível o cliente selecionar o tipo de serviço (manutenção, reparo, inspeção).
- [] Deve ser possível sistema verifica a disponibilidade dos técnicos e do espaço.
- [] Deve ser possível visualizar o histórico de serviços em um veículo
- [] Deve ser possíve funcionário emitir ordem de serviço para um veículo, detalhando os trabalhos e o valor.
- [] Deve ser possível cliente confirma o agendamento


## Regras De Negócio
- [] Não deve ser possível cadastrar dois usuários com o mesmo e-mail.
- [] Cada veículo deve estar associado a exatamente um usuário, mas um usuário pode ter múltiplos veículos.
- [] Funcionario Aceitam o Serviço e assim marcando o agendamento


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


