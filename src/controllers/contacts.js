import mongoose from "mongoose";
import { createContact, deleteContact, getAllContacts, getAllContactsById, updateContact } from "../services/contacts.js";
import { throwNotFoundError } from "../utils/error.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
    try {
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);

        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
        });

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const getContactsByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const contact = await getAllContactsById(contactId);

        if (!contact) {
            return next(createHttpError(404, "Contact not found"));
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const createContactController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data: contact,
        });
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const result = await updateContact(contactId, req.body);

        if (!result) {
            return next(createHttpError(404, "Contact not found"));
        }

        res.json({
            status: 200,
            message: "Successfully patched a contact!",
            data: result,
        });
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const contact = await deleteContact(contactId);

        if (!contact) {
            return next(createHttpError(404, "Contact not found"));
        }

        res.status(204).send();
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};
