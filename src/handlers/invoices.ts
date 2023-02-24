import prisma from "../db";

export const createInvoice = async (req, res) => {
  const authorizedUser = await prisma.user.findFirst({
    where: {
      id: req.user.id,
      clients: { some: { id: req.body.clientId } },
    },
  });
  if (!authorizedUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { invoiceAmount, invoiceTitle, clientId } = req.body;
  const invoice = await prisma.invoice.create({
    data: {
      invoiceAmount,
      invoiceTitle,
      clientId,
      userId: req.user.id,
    },
  });
  res.status(201).json({ date: invoice });
};
export const getManyInvoices = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { invoices: true },
  });
  const { invoices } = user;
  res.status(200).json({ data: invoices });
};
export const getOneInvoice = async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });
  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }
  res.status(200).json({ data: invoice });
};
export const updateInvoice = async (req, res) => {
  const updatedInvoice = await prisma.invoice.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
      },
      data: req.body
  });
    res.status(200).json({ data: updatedInvoice });
};
export const deleteInvoice = async (req, res) => {
    const deletedInvoice = await prisma.invoice.delete({
        where: {
        id_userId: {
            id: req.params.id,
            userId: req.user.id,
        },
        },
    });
    res.status(200).json({ data: deletedInvoice });
};
