import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

import { NEXT_URL } from "/config/index";

import SectionProducts from '/components/PageCatalog/SectionProducts'
import LoaderSpinner from "/components/CommonAllPages/LoaderSpinner";

export default function PageCatalog() {

  //FetchFunctions
  const fetchProducts = async () => {
    return axios.get(
      `${NEXT_URL}/api/products`
    );
  };

    //QueryFunctions
  const { data: dataProducts, status: statusProducts } = useQuery(
    [`PageProducts`],
    () => fetchProducts(),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      onSuccess: (data) => {
        console.log({ PageProductsData: data });
      },
    }
  );


  if (statusProducts === "error") {
    return <div>Error: Couldn't fetch</div>;
  }
  
  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Full Catalog
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            {statusProducts === "loading" && <div className="my-20"> <LoaderSpinner /> </div>}
          {statusProducts !== "loading" && <SectionProducts products={dataProducts.data} />}
        </div>
        {/* /End replace */}
      </div>
    </>
  );
}
