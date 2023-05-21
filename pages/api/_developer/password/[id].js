import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUserById(req, res);
    case "PUT":
      return updatePasswordById(req, res);
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getUserById(req, res) {
  const id = Number(req.query.id);

  try {
    const user = await prisma.users2.findMany({
      where: {
        id: id,
      }
    });
    console.log({ user });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

async function updatePasswordById(req, res) {
  const id = Number(req.query.id);
  const password = req.body.password;

  //PasswordCheck
  if (!password) {
    res.status(404).json({ success: false, message: "Invalid Password" });
  }

  try {
    //UserCheck
    const user = await prisma.users2.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
    }

    //Constants
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updated = await prisma.users2.update({
      where: {
        id: Number(id),
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });


    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
