import { Router } from 'express'
import {
  createInvoice,
  getManyInvoices,
  getOneInvoice,
  updateInvoice,
  deleteInvoice,
} from "./handlers/invoices";

const router = Router()

router.post('/invoices')
router.get('/invoices', getManyInvoices)

export default router