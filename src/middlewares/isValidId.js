import { isValidObjectId } from 'mongoose';
import createError from 'http-errors'; // Импорт через дефолтный экспорт

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createError(404, 'Not found'); // Используйте createError
  }
  next();
};