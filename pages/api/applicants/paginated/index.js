import prisma from "/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    // case "POST":
    //   return createItem(req, res);
    case "GET":
      return getItems(req, res);
    // case "PUT":
    //   return updateItems(req, res);
    // case "DELETE":
    //   return deleteItem();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getItems(req, res) {
  try {
    // PropsCheck
    // console.log({ PropsCheck: { query: req.query } });

    //StateVariables
    let { search, limit, page, sortBy, sortDesc } = req.query;
    page = page < 0 ? 1 : page;
    limit = limit < 1 ? 10 : limit;
    let startRow = (page - 1) * limit;
    let items = 0;
    let filter = {};
    let orderBy = {};

    if (search) {
      filter = {
        firstName: {
          startsWith: search,
        },
      };
    }

    if (sortBy && sortDesc) {
      const key = sortBy;
      const direction = sortDesc === "true" ? "desc" : "asc";
      orderBy = {
        [key]: direction,
      };
    }

    //StateFunctions
    if (limit) {
      items = await prisma.users2.findMany({
        take: +limit,
        skip: +startRow,
        where: filter,
        orderBy: orderBy,
      });
    } else {
      items = await prisma.users2.findMany({
        where: filter,
      });
    }

    let totalItems = await prisma.users2.count({
      where: filter,
    });

    //FinalStateVariables
    const pagedData = {
      currentPage: page,
      pageSize: limit,
      totalItems,
      items,
      totalPages: Math.ceil(totalItems / limit),
    };

    res.status(200).json(pagedData);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
