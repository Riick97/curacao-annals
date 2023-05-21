import prisma from "/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    // case "POST":
    //   return addDetails(req, res);
    case "GET":
      return getParcelDetails(req, res);
    // case "PUT":
    //   return updateItems(req, res);
    // case "DELETE":
    //   return deleteItem();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getParcelDetails = async (req, res) => {
  try {
    //Constants
    const id = req.query.id;

    
    const product = await prisma.products.findUnique({
      where: { id: id },
      include: {
        metaDataImage: true,
      }
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
