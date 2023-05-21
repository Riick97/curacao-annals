const products = [
  {
    id: 1,
    title: "Basic Tee 8-Pack",
    price: "256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    category: "8 colors",
    metaDataImage: {
      url:
        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    },
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    title: "Basic Tee",
    href: "#",
    price: "32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    category: "Black",
    metaDataImage: {
      url:
        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
    },
    imageAlt: "Front of plain black t-shirt.",
  },
  // More products...
];

export default function SectionProducts({products}) {
    //PropsCheck
    console.log({SectionProductsPropsCheck: {products}})

  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-w-1 aspect-h-2 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-52">
                <img
                //   src={`${product.metaDataImage.url}`}
                  src={`https://ispstorage143.blob.core.windows.net/randompics/${product.metaDataImage[0].url}`}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={`pageDetailProduct/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm italic text-gray-500">
                    {product.category}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
