// fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    //payload: { role: string } // payload type is used for signing and verifying
    user: {
      sub: string,
      role: "CLIENT" | "EMPLOYEE" | "BOSS"
    } // user type is return type of `request.user` object
  }
}