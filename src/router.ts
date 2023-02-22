import { Router } from 'express'
import { createClient } from './handlers/clients';
import {
  createInvoice,
  getManyInvoices,
  getOneInvoice,
  updateInvoice,
  deleteInvoice,
} from "./handlers/invoices";

const router = Router()

router.post("/clients", createClient);

router.post("/invoices", createInvoice);
router.get('/invoices', getManyInvoices)

export default router