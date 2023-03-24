import { validateInputs, handleInputErrors } from "./modules/middleware";
import {
  createClient,
  getManyClients,
  getOneClient,
  updateOneClient,
  deleteOneClient,
} from "./handlers/clients";
import { getMe, updateMe } from "./handlers/users";
// import { resetPassword } from "./modules/auth";
import { Router } from "express";

import {
  createInvoice,
  getManyInvoices,
  getOneInvoice,
  updateInvoice,
  deleteInvoice,
} from "./handlers/invoices";

const router = Router();

router.get("/user", getMe);
router.put(
  "/user",
  [validateInputs("updateMe"), handleInputErrors],
  updateMe
);

// router.put(
//   "/password",
//   [validateInputs("resetPassword"), handleInputErrors],
//   resetPassword
// );

router.post(
  "/clients",
  [validateInputs("createClient"), handleInputErrors],
  createClient
);
router.get("/clients", getManyClients);
router.get("/clients/:id", getOneClient);
router.put(
  "/clients/:id",
  [validateInputs("updateOneClient"), handleInputErrors],
  updateOneClient
);
router.delete("/clients/:id", deleteOneClient);

router.post("/invoices", createInvoice);
router.get("/invoices", getManyInvoices);
router.get("/invoices/:id", getOneInvoice);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
