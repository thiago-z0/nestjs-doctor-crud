import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError | any, host: ArgumentsHost) {
    console.log(exception);

    if (exception instanceof EntityNotFoundError) {
      const ctx = host.switchToHttp();

      const response = ctx.getResponse<Response>();

      return response.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: exception.message,
      });
    } else {
      const ctx = host.switchToHttp();

      const response = ctx.getResponse<Response>();

      return response.status(exception.status).json(exception.response);
    }
  }
}
