import prisma from "../db";
export const getMe = (req, res) => res.status(200).json({ data: req.user });
export const updateMe = async (req, res) => {
  if (req.body.password) {
    console.log('no password change here');
    
  }
  
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: req.body,
    });

    res.status(200).json({ data: updatedUser });
  } catch (err) {
    console.log(err);
  }
};
