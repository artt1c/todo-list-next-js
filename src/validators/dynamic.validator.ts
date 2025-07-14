import Joi from "joi";

export const getFormSchema = (hasDescription: boolean) => {
  let schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Заголовок обовʼязковий',
      'string.min': 'Заголовок має бути не менше 3 символів',
    }),
  });

  if (hasDescription) {
    schema = schema.keys({
      description: Joi.string().allow('').optional().messages({
        'string.base': 'Опис має бути рядком',
      }),
    });
  } else {
    schema = schema.keys({
      description: Joi.any().optional(),
    });
  }

  return schema;
}