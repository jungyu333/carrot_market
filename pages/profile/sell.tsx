import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import { Product, User } from "@prisma/client";
import useSWR from "swr";

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
    </Layout>
  );
};

export default Sell;
