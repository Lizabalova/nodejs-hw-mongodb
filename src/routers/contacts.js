import { Router } from 'express';
import {
    getContactsByIdController,
    getContactsController,
    createContactController,
    deleteContactController,
    patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateObjectId } from '../middlewares/validateObjectId.js'; // Import the new middleware
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', validateObjectId, ctrlWrapper(getContactsByIdController));
router.patch('/contacts/:contactId', validateObjectId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', validateObjectId, ctrlWrapper(deleteContactController));

export default router;
