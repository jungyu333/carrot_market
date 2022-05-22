import type { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import Item from "@components/item";
import FloatingButton from "@components/floatingButton";
import { Product, User } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import React, { useEffect } from "react";

const Wrapper = tw.div`
  mt-14
  relative
  mb-20
`;

interface ProductWithUser extends Product {
  user: User;
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithUser[];
  pages: number;
}

const Home: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
    if (pageIndex === 0) return `/api/items?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/products?page=${pageIndex + 1}`;
  };
  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);
  const products = data ? data.map((item) => item.products).flat() : [];
  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      setSize((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Layout title="Home" hasTabBar isLogIn>
      <Wrapper>
        {products?.map((product) => (
          <Item
            name={product?.user.name}
            productName={product?.name}
            heart={2}
            price={product?.price}
            key={product?.id}
            id={product?.id}
          />
        ))}

        <FloatingButton href="/items/newItem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </FloatingButton>
      </Wrapper>
    </Layout>
  );
};

export default Home;
