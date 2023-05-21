import prisma from "/config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getExamBundleRequestById(req, res);
    // case "PUT":
    //   return updateExamBundleRequestById(req, res);
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getExamBundleRequestById(req, res) {
  try {
    const examBundleRequest = await prisma.examBundleRequests.findMany({
      where: {
        id: +req.query.id,
      },
      include: {
        Users2: true,
        schedules: true,
      },
    });
    res.status(200).json(examBundleRequest);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
