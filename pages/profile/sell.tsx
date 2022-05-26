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

interface sellProductWithUser extends Product {
  user: User;
  _count: {
    favorite: number;
  };
}

interface sellProductResponse {
  ok: boolean;
  sellProducts: sellProductWithUser[];
  pages: number;
}

const Sell: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: sellProductResponse) => {
    if (pageIndex === 0) return `/api/profile/sell?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/profile/sell?page=${pageIndex + 1}`;
  };
  const { data, setSize } = useSWRInfinite<sellProductResponse>(getKey);
  const sellProducts = data ? data.map((item) => item.sellProducts).flat() : [];
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
    <Layout canGoBack isLogIn title="판매 목록">
      <Wrapper>
        {sellProducts.map((sellProduct) => (
          <Item
            id={sellProduct?.id}
            key={sellProduct?.id}
            name={sellProduct?.user.name}
            productName={sellProduct?.name}
            price={sellProduct?.price}
            heart={sellProduct?._count.favorite}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Sell;
