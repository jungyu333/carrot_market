import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWRInfinite from "swr/infinite";
import { Product, User } from "@prisma/client";
import { useEffect } from "react";

const Wrapper = tw.div`
  mt-16
`;

interface purchaseProductWithUser extends Product {
  user: User;
  _count: {
    favorite: number;
  };
}

interface purchaseProductResponse {
  ok: boolean;
  purchaseProducts: purchaseProductWithUser[];
  pages: number;
}

const PurChase: NextPage = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: purchaseProductResponse
  ) => {
    if (pageIndex === 0) return `/api/profile/purchase?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/profile/purchase?page=${pageIndex + 1}`;
  };
  const { data, setSize } = useSWRInfinite<purchaseProductResponse>(getKey);
  const purchaseProducts = data
    ? data.map((item) => item.purchaseProducts).flat()
    : [];
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
    <Layout canGoBack isLogIn title="구매 목록">
      <Wrapper>
        {purchaseProducts.map((purchaseProduct) => (
          <Item
            id={purchaseProduct?.id}
            key={purchaseProduct?.id}
            name={purchaseProduct?.user.name}
            productName={purchaseProduct?.name}
            price={purchaseProduct?.price}
            heart={purchaseProduct?._count.favorite}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default PurChase;
