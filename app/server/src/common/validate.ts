import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
type ValidationMessages = Record<string, string>;

export default class Validate extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
  }

  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const messages = this.collectValidationMessages(validationErrors);

    throw new HttpException(
      {
        code: 422,
        messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  private collectValidationMessages(
    validationErrors: ValidationError[],
    parentPath = '',
    messages: ValidationMessages = {},
  ): ValidationMessages {
    for (const error of validationErrors) {
      const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;

      if (error.constraints) {
        messages[propertyPath] = Object.values(error.constraints)[0];
      }

      if (error.children?.length) {
        this.collectValidationMessages(error.children, propertyPath, messages);
      }
    }

    return messages;
  }
}
