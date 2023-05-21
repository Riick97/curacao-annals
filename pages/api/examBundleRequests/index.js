import prisma from "/config/db";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createExamBundleRequest(req, res);
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
  const examBundleRequests = await prisma.examBundleRequests.findMany({
    include: {
      _count: {
        select: { photosPayment: true },
      },
      Users2: true,
    },
  });

  try {
    return res.status(200).json(examBundleRequests);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

async function createExamBundleRequest(req, res) {
  const {
    lastName,
    firstName,
    gender,
    address,
    addressNumber,
    placeOfBirth,
    countryOfBirth,
    nationality,
    dateOfBirth,
    identificationNumber,
    expiryDate,
    expiryDateStayPermit,
    identificationPhoto,
    passportPhoto,
    stayPermitPhoto,
    copyClientPhoto,
    mobile,
    phone,
    work,
    emergencyPhone,
    email,
    emergencyEmail,
    comunityKnowledgeIsFirsTime,
    comunityKnowledgeHasParticularities,
    comunityKnowledgeParticularity,
    comunityKnowledgeExam,
    papiamentuIsFirstTime,
    papiamentuHasParticularities,
    papiamentuParticularity,
    papiamentuExamReading,
    papiamentuExamListening,
    papiamentuExamWriting,
    papiamentuExamTalking,
    dutchIsFirstTime,
    dutchHasParticularities,
    dutchParticularity,
    dutchExamReading,
    dutchExamListening,
    dutchExamWriting,
    dutchExamTalking,
    photosArboLetterComunityKnowledge,
    photosDiplomaComunityKnowledge,
    photosGradesListComunityKnowledge,
    photosCertificateComunityKnowledge,
    photosArboLetterPapiamentu,
    photosDiplomaPapiamentu,
    photosGradesListPapiamentu,
    photosCertificatePapiamentu,
    photosArboLetterDutch,
    photosDiplomaDutch,
    photosGradesListDutch,
    photosCertificateDutch,
    ntNummer,
    userId,
    periodId,
  } = req.body;

  const comunityKnowledgeExamCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { comunityKnowledgeExam: "Inaplikabel" },
    },
  });

  const papiamentuExamReadingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { papiamentuExamReading: "Inaplikabel" },
    },
  });

  const papiamentuExamListeningCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { papiamentuExamListening: "Inaplikabel" },
    },
  });

  const papiamentuExamTalkingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { papiamentuExamTalking: "Inaplikabel" },
    },
  });

  const papiamentuExamWritingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { papiamentuExamWriting: "Inaplikabel" },
    },
  });

  const dutchExamReadingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { dutchExamReading: "Inaplikabel" },
    },
  });

  const dutchExamListeningCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { dutchExamListening: "Inaplikabel" },
    },
  });

  const dutchExamWritingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { dutchExamWriting: "Inaplikabel" },
    },
  });

  const dutchExamTalkingCount = await prisma.examBundleRequests.count({
    where: {
      NOT: { dutchExamTalking: "Inaplikabel" },
    },
  });

  const limit = 150;

  let comunityKnowledgeExamNotAllowed =
    comunityKnowledgeExam !== "Inaplikabel" &&
    comunityKnowledgeExamCount >= limit;

  let papiamentuExamReadingNotAllowed =
    papiamentuExamReading !== "Inaplikabel" &&
    papiamentuExamReadingCount >= limit;

  let papiamentuExamListeningNotAllowed =
    papiamentuExamListening !== "Inaplikabel" &&
    papiamentuExamListeningCount >= limit;

  let papiamentuExamWritingNotAllowed =
    papiamentuExamWriting !== "Inaplikabel" &&
    papiamentuExamWritingCount >= limit;

  let papiamentuExamTalkingNotAllowed =
    papiamentuExamTalking !== "Inaplikabel" &&
    papiamentuExamTalkingCount >= limit;

  let dutchExamReadingNotAllowed =
    dutchExamReading !== "Inaplikabel" && dutchExamReadingCount >= limit;

  let dutchExamListeningNotAllowed =
    dutchExamListening !== "Inaplikabel" && dutchExamListeningCount >= limit;

  let dutchExamWritingNotAllowed =
    dutchExamWriting !== "Inaplikabel" && dutchExamWritingCount >= limit;

  let dutchExamTalkingNotAllowed =
    dutchExamTalking !== "Inaplikabel" && dutchExamTalkingCount >= limit;

  if (comunityKnowledgeExamNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba Konosementu a yega e limite di ${limit} kupo.`,
    });
  }

  if (papiamentuExamReadingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Papiamentu: lesa' a yega e limite di ${limit} kupo.`,
    });
  }

  if (papiamentuExamListeningNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Papiamentu: skucha' a yega e limite di ${limit} kupo.`,
    });
  }

  if (papiamentuExamWritingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Papiamentu: skirbi' a yega e limite di ${limit} kupo.`,
    });
  }

  if (papiamentuExamTalkingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Papiamentu: papia' a yega e limite di ${limit} kupo.`,
    });
  }

  if (dutchExamReadingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Hulandes: lesa' a yega e limite di ${limit} kupo.`,
    });
  }

  if (dutchExamListeningNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Hulandes: skucha' a yega e limite di ${limit} kupo.`,
    });
  }

  if (dutchExamWritingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Hulandes: skirbi' a yega e limite di ${limit} kupo.`,
    });
  }

  if (dutchExamTalkingNotAllowed) {
    return res.status(405).json({
      message: `Kantidat di kupo pa e prueba 'Hulandes: papia' a yega e limite di ${limit} kupo.`,
    });
  }

  try {
    const examBundleRequest = await prisma.examBundleRequests.create({
      data: {
        lastName,
        firstName,
        gender,
        address,
        addressNumber: addressNumber.toString(),
        placeOfBirth,
        countryOfBirth,
        nationality,
        dateOfBirth: new Date(dateOfBirth),
        identificationNumber: identificationNumber.toString(),
        expiryDate: new Date(expiryDate),
        expiryDateStayPermit: new Date(expiryDateStayPermit),
        photosExamBundleIdentification: {
          create: {
            type: identificationPhoto.type,
            base64: identificationPhoto.base64,
            name: identificationPhoto.name,
          },
        },
        photosExamBundlePassport: {
          create: {
            type: passportPhoto?.type,
            base64: passportPhoto?.base64,
            name: passportPhoto?.name,
          },
        },
        photosExamBundleStayPermit: {
          create: {
            type: stayPermitPhoto.type,
            base64: stayPermitPhoto.base64,
            name: stayPermitPhoto.name,
          },
        },
        photosExamBundleCopyClient: {
          create: {
            type: copyClientPhoto?.type,
            base64: copyClientPhoto?.base64,
            name: copyClientPhoto?.name,
          },
        },
        mobile,
        phone,
        work,
        emergencyPhone,
        email,
        emergencyEmail,
        comunityKnowledgeIsFirsTime,
        comunityKnowledgeHasParticularities,
        comunityKnowledgeParticularity,
        comunityKnowledgeExam,
        papiamentuIsFirstTime,
        papiamentuHasParticularities,
        papiamentuParticularity,
        papiamentuExamReading,
        papiamentuExamListening,
        papiamentuExamWriting,
        papiamentuExamTalking,
        dutchIsFirstTime,
        dutchHasParticularities,
        dutchParticularity,
        dutchExamReading,
        dutchExamListening,
        dutchExamWriting,
        dutchExamTalking,
        ntNummer,
        LinkAppendix: "https://ete-portal.vercel.app/ExamBundleRequest/",
        Users2: {
          connect: { id: Number(userId) },
        },
        periods: {
          connect: { id: Number(periodId) },
        },
        photosArboLetterComunityKnowledge: {
          create: {
            type: photosArboLetterComunityKnowledge?.type,
            base64: photosArboLetterComunityKnowledge?.base64,
            name: photosArboLetterComunityKnowledge?.name,
          },
        },
        photosDiplomaComunityKnowledge: {
          create: {
            type: photosDiplomaComunityKnowledge?.type,
            base64: photosDiplomaComunityKnowledge?.base64,
            name: photosDiplomaComunityKnowledge?.name,
          },
        },
        photosGradesListComunityKnowledge: {
          create: {
            type: photosGradesListComunityKnowledge?.type,
            base64: photosGradesListComunityKnowledge?.base64,
            name: photosGradesListComunityKnowledge?.name,
          },
        },
        photosCertificateComunityKnowledge: {
          create: {
            type: photosCertificateComunityKnowledge?.type,
            base64: photosCertificateComunityKnowledge?.base64,
            name: photosCertificateComunityKnowledge?.name,
          },
        },
        photosArboLetterPapiamentu: {
          create: {
            type: photosArboLetterPapiamentu?.type,
            base64: photosArboLetterPapiamentu?.base64,
            name: photosArboLetterPapiamentu?.name,
          },
        },
        photosDiplomaPapiamentu: {
          create: {
            type: photosDiplomaPapiamentu?.type,
            base64: photosDiplomaPapiamentu?.base64,
            name: photosDiplomaPapiamentu?.name,
          },
        },
        photosGradesListPapiamentu: {
          create: {
            type: photosGradesListPapiamentu?.type,
            base64: photosGradesListPapiamentu?.base64,
            name: photosGradesListPapiamentu?.name,
          },
        },
        photosCertificatePapiamentu: {
          create: {
            type: photosCertificatePapiamentu?.type,
            base64: photosCertificatePapiamentu?.base64,
            name: photosCertificatePapiamentu?.name,
          },
        },
        photosArboLetterDutch: {
          create: {
            type: photosArboLetterDutch?.type,
            base64: photosArboLetterDutch?.base64,
            name: photosArboLetterDutch?.name,
          },
        },
        photosDiplomaDutch: {
          create: {
            type: photosDiplomaDutch?.type,
            base64: photosDiplomaDutch?.base64,
            name: photosDiplomaDutch?.name,
          },
        },
        photosGradesListDutch: {
          create: {
            type: photosGradesListDutch?.type,
            base64: photosGradesListDutch?.base64,
            name: photosGradesListDutch?.name,
          },
        },
        photosCertificateDutch: {
          create: {
            type: photosCertificateDutch?.type,
            base64: photosCertificateDutch?.base64,
            name: photosCertificateDutch?.name,
          },
        },
      },
    });

    return res.status(201).json(examBundleRequest);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: { error } });
  }
}
