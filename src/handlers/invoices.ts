import prisma from '../db'

export const createInvoice = async (req, res) => {
    const newInvoice = await prisma.invoice.create({
      data: {
        title: req.body.title,
        total: req.body.total,
        clientId: req.body.clientId,
        dueDate: req.body.dueDate,
      },
    });

    return res.status(200).json({data: newInvoice})
 };
export const getManyInvoices = (req, res) => {
    res.status(200).json({ message: "Testing the invoices router"})
};
export const getOneInvoice = () => {};
export const updateInvoice = () => { };
export const deleteInvoice = () => {};

