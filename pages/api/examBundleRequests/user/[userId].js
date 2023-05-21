import prisma from "/config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getExamBundleRequestByUserId(req, res);
    case "PUT":
      return updateUser();
    case "DELETE":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getExamBundleRequestByUserId(req, res) {
  console.log({ query: req.query });

  try {
    const examBundleRequest = await prisma.examBundleRequests.findMany({
      where: {
        userID: +req.query.userId,
        periodId: +req.query.periodId,
      },
      include: {
        Users2: {
          include: {
            photosCopyClient: true,
            photosIdentification: true,
            photosPassport: true,
            photosStayPermit: true,
          },
        },
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
