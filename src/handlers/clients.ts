import prisma from "../db";

export const createClient = async (req, res) => {
  const newClient = await prisma.client.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  return res.status(200).json({ data: newClient });
};
