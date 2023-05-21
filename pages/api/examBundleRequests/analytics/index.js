import prisma from "/config/db";
import { format } from "date-fns";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default function handler(req, res) {
  switch (req.method) {
    // case "POST":
    //   return createExamBundleRequest(req, res);
    case "GET":
      return getExamBundleRequest(req, res);
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getExamBundleRequest(req, res) {
  let totalRequests = await prisma.examBundleRequests.count({});

  const examBundleRequests = await prisma.examBundleRequests.findMany({
    include: {
      _count: {
        select: { photosPayment: true },
      },
    },
  });

  const totalPaid = examBundleRequests.filter(function (item) {
    return item._count.photosPayment > 0;
  }).length;

  const totalNonPaid = examBundleRequests.filter(function (item) {
    return item._count.photosPayment === 0;
  }).length;

  const nationalities = [
    ...new Set(examBundleRequests.map((item) => item.nationality)),
  ];

  const nationnalityCounts = examBundleRequests.reduce((p, c) => {
    var name = c.nationality;
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {});

   const comunityKnowledgeExamCounts = examBundleRequests.reduce((p, c) => {
     var name = c.comunityKnowledgeExam;
     if (!p.hasOwnProperty(name)) {
       p[name] = 0;
     }
     p[name]++;
     return p;
   }, {});

      const createdAtCounts = examBundleRequests.reduce((p, c) => {
        //Constants
        const year = c.createdAt.getFullYear();
        const month = c.createdAt.getMonth();
        const day = c.createdAt.getDay();
        const hour = c.createdAt.getHours();

        const name = format(c.createdAt, "yyyy-MM-dd h bbbb");

        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});
  


  //FinalStateVariables
  const data = {
    totalRequests: totalRequests,
    totalPaid: totalPaid,
    totalNonPaid: totalNonPaid,
    nationnalityCounts: nationnalityCounts,
    comunityKnowledgeExamCounts: comunityKnowledgeExamCounts,
    createdAtCounts: createdAtCounts,
  };

  try {
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
