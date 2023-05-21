import prisma from "/config/db";


export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createItem(req, res);
    case "GET":
      return getItems(req, res);
    // case "PUT":
    //   return updateUser();
    // case "DELETE":
    //   return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getItems(req, res) {
  const items = await prisma.products.findMany({
    include: {
      metaDataImage: true,
    },
  });

  try {
    return res.status(200).json(items);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

async function createItem(req, res) {
  const { title, price, description, user, category, metaDataImage } = req.body;


  try {
    const item = await prisma.products.create({
      data: {
        title,
        price,
        description,
        user: 'admin',
        category,
        metaDataImage: {
          create: {
            name: metaDataImage.name,
            url: metaDataImage.url,
          },
        },
        timestamp: new Date()
      },
    });

    return res.status(201).json(item);
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: { error } });
  }
}
