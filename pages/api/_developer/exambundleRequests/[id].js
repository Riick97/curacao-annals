import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getExamBundleRequestById(req, res);
    case "PUT":
      return updateRequestById(req, res);
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getExamBundleRequestById(req, res) {
  const id = Number(req.query.id);

  try {
    const examBundleRequest = await prisma.examBundleRequests.findMany({
      where: {
        id: id,
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
  const id = Number(req.query.id);
  const userID = req.body.userID;

  if (!userID) {
    res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const request = await prisma.examBundleRequests.findUnique({
      where: { id: Number(id) },
    });

    if (!request) {
      res.status(404).json({ success: false, message: "exambundle not found" });
    }

    const updated = await prisma.examBundleRequests.update({
      where: {
        id: Number(id),
      },
      data: {
        userID: userID,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
