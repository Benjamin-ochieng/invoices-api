import prisma from "../db";

export const createClient = async (req, res) => {
   try {
      const newClient = await prisma.client.create({
        data: {
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail,
          userId: req.user.id,
        },
      });

      return res.status(201).json({ data: newClient });
   } catch (error) {
    console.log(error);
    
   }
};

export const getManyClients = async (req, res) => {
  const clients = await prisma.client.findMany({
    where: {
      userId: req.user.id,
    },
  });
  return res.status(200).json({ data: clients });
};
export const getOneClient = async (req, res) => {
  const client = await prisma.client.findUnique({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });
  return res.status(200).json({ data: client });
};
export const updateOneClient = async (req, res) => {
    const updatedClient = await prisma.client.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
    data: req.body
  });
  return res.status(200).json({ data: updatedClient });
};
export const deleteOneClient = async (req, res) => {
      const deletedClient = await prisma.client.delete({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },

  });
  return res.status(200).json({ data: deletedClient });
};
