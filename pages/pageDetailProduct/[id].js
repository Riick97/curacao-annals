import { useRouter } from "next/router";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getSession } from "next-auth/react";
import axios from "axios";

import { NEXT_URL } from "/config/index";

import CardProductDetail from "/components/PageDetailProduct/CardProductDetail";
import LoaderSpinner from "/components/CommonAllPages/LoaderSpinner";

export default function PageDetailProduct() {
  const router = useRouter();
  const productId = router.query.id;

  //FetchFunctions
  const fetchProduct = async (productId) => {
    return axios.get(`${NEXT_URL}/api/products/${productId}`);
  };

  //QueryFunctions
  const { data: dataProduct, status: statusProduct } = useQuery(
    [`PageProductDetail`, productId],
    () => fetchProduct(productId),
    {
      onSuccess: (data) => {
        console.log({ PageProductData: data });
      },
    }
  );


  if (statusProduct === "error") {
    return <div>Error: Couldn't fetch</div>;
  }

  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Product Overview
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          {/* Section */}
          {statusProduct !== "loading" && (
            <CardProductDetail product={dataProduct.data} />
          )}

          {statusProduct === "loading" && (
            <div className="my-20">
              {" "}
              <LoaderSpinner />{" "}
            </div>
          )}
        </div>
        {/* /End replace */}
      </div>
    </>
  );
}
