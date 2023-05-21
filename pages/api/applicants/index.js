import prisma from "/config/db";

export default function handler(req, res) {
  switch (req.method) {
    // case "POST":
    //   return createExamBundleRequest(req, res);
    case "GET":
      return getUsers(req, res);
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getUsers(req, res) {
  const users = await prisma.users2.findMany();

  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
