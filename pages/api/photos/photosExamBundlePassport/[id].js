import prisma from "/config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getByRequestId(req, res);
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getByRequestId(req, res) {
  try {
    const photosExamBundlePassport =
      await prisma.photosExamBundlePassport.findMany({
        where: {
          ExamBundleRequestId: Number(req.query.id),
        },
      });
    res.status(200).json(photosExamBundlePassport);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
