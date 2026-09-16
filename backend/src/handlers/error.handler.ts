import { AppError } from "../errors/app-error.error.js";
import { FastifyReply, FastifyRequest } from "fastify";

export function appErrorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error.fields ? { fields: error.fields } : {})
      }
    });
  }

  request.log.error(error);

  return reply.status(500).send({
    code: "INTERNAL_ERROR",
    message: "Internal server error"
  });
}