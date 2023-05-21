import prisma from '/config/db';


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};


export default function handler(req, res) {
  switch (req.method) {
    // case "GET":
    //   return getUserById();
    case "PUT":
      return updateUser(req, res);
    case "DELETE":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function updateUser(req, res) {
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
    ntNummer,
  } = req.body.variables;

  try {
    const applicant = await prisma.users2.findUnique({
      where: { id: Number(req.query.id) },
    });

    console.log(prisma.users2);

    if (!applicant) {
      res.status(404).json({ success: false, message: "applicant not found" });
    }

    const updated = await prisma.users2.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        lastName: lastName,
        firstName: firstName,
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
        mobile,
        phone,
        work,
        emergencyPhone,
        emergencyEmail,
        ntNummer,
        edited: 1,
        updatedBy: email,
      },
    });

    if (identificationPhoto?.id) {
      const identificationPhotoData =
        await prisma.photosIdentification.findUnique({
          where: { id: Number(identificationPhoto.id) },
        });

      if (identificationPhotoData) {
        updated.photosIdentification = await prisma.photosIdentification.update(
          {
            where: {
              id: identificationPhoto?.id || 0,
            },
            data: {
              type: identificationPhoto.type,
              base64: identificationPhoto.base64,
              name: identificationPhoto.name,
            },
          }
        );
      }
    } 

    if (passportPhoto?.id) {
      const passportPhotoData = await prisma.photosIdentification.findUnique({
        where: { id: Number(passportPhoto.id) },
      });
      if (passportPhotoData) {
        updated.photosPassport = await prisma.photosPassport.update({
          where: {
            id: passportPhoto?.id || 0,
          },
          data: {
            type: passportPhoto.type,
            base64: passportPhoto.base64,
            name: passportPhoto.name,
          },
        });
      }
    }

    if (stayPermitPhoto?.id) {
      const stayPermitPhotoData = await prisma.photosIdentification.findUnique({
        where: { id: Number(stayPermitPhoto.id) },
      });

      if (stayPermitPhotoData) {
        updated.photosStayPermit = await prisma.photosStayPermit.update({
          where: {
            id: stayPermitPhoto?.id || 0,
          },
          data: {
            type: stayPermitPhoto.type,
            base64: stayPermitPhoto.base64,
            name: stayPermitPhoto.name,
          },
        });
      }
    }

    if (copyClientPhoto?.id) {
      const copyClientPhotoData = await prisma.photosIdentification.findUnique({
        where: { id: Number(copyClientPhoto.id) },
      });

      if (copyClientPhotoData) {
        updated.photosCopyClient = await prisma.photosCopyClient.update({
          where: {
            id: copyClientPhoto?.id || 0,
          },
          data: {
            type: copyClientPhoto.type,
            base64: copyClientPhoto.base64,
            name: copyClientPhoto.name,
          },
        });
      }
    }

    res.status(200).json(updated);
  } catch (error) {
    console.log({ error });
    console.log({ user: prisma.users2 });
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
