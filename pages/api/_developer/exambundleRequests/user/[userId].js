import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getExamBundleRequestByUserId(req, res);
    case "PUT":
      return updateRequestById(req, res);
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getExamBundleRequestByUserId(req, res) {
  const userId = Number(req.query.userId);

  try {
    const examBundleRequest = await prisma.examBundleRequests.findMany({
      where: {
        userID: userId,
      },
      include: {
        Users2: true,
      },
    });
    console.log({ examBundleRequest });
    res.status(200).json(examBundleRequest);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

async function updateRequestById(req, res) {
  const userId = Number(req.query.userId);
  const newId = req.body.userId;

  if (!newId) {
    res.status(404).json({ success: false, message: "Invalid id" });
  }

  try {
     const request = await prisma.examBundleRequests.findUnique({
       where: { userID: Number(userId) },
     });

     if (!request) {
       res.status(404).json({ success: false, message: "exambundle not found" });
     }

    const updated = await prisma.examBundleRequests.update({
      where: {
        userID: Number(userId),
      },
      data: {
        userID: newId,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}