import bcrypt from "bcrypt";
import prisma from "/config/db";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        password,
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
        edited,
        ntNummer,
        isAdmin,
      } = req.body.variables;
      const userExists = await prisma.users2.findFirst({
        where: { email: email },
      });

   

      if (userExists) {
        res
          .status(400)
          .send({ success: false, message: `User With email ${email} already exists` });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users2.create({
          data: {
            password: hashedPassword,
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
            photosIdentification: {
              create: {
                type: identificationPhoto.type,
                base64: identificationPhoto.base64,
                name: identificationPhoto.name,
              },
            },
            photosPassport: {
              create: {
                type: passportPhoto?.type,
                base64: passportPhoto?.base64,
                name: passportPhoto?.name,
              },
            },
            photosStayPermit: {
              create: {
                type: stayPermitPhoto.type,
                base64: stayPermitPhoto.base64,
                name: stayPermitPhoto.name,
              },
            },
            photosCopyClient: {
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
            email: email,
            emergencyEmail,
            edited,
            isAdmin: 0,
            isActive: 1,
            ntNummer,
            createdAt: new Date(),
            createdBy: email,
            updatedBy: email,
          },
        });

        if (user) {
          res.status(200).json({
            success: true,
            message: "Account Registered successfully",
          });
        } else {
          res.status(404).send({
            success: false,
            message: "Invalid email or password",
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    } finally {
      prisma.$disconnect();
    }
  } else {
    res.status(403).json({ message: "Method not allowed" });
  }
};
export default handler;
