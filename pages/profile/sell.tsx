import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import { Product, User } from "@prisma/client";
import useSWR from "swr";
import NoItem from "@components/noItem";

const Wrapper = tw.div`
  mt-14
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
}

const Sell: NextPage = () => {
  const { data } = useSWR<sellProductResponse>("/api/profile/sell");
  return (
    <Layout canGoBack isLogIn title="판매 목록">
      {data?.sellProducts.length !== 0 ? (
        <Wrapper>
          {data?.sellProducts?.map((sellProduct) => (
            <Item
              isSell
              id={sellProduct?.id}
              key={sellProduct?.id}
              name={sellProduct?.user.name}
              productName={sellProduct?.name}
              price={sellProduct?.price}
              heart={sellProduct?._count.favorite}
              avatar={sellProduct.avatar}
            />
          ))}
        </Wrapper>
      ) : (
        <NoItem text="판매 중인 물건이 없습니다">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-28 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </NoItem>
      )}
    </Layout>
  );
};

export default Sell;
