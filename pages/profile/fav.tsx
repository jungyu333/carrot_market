import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Favorite, Product, User } from "@prisma/client";

const Wrapper = tw.div`
  mt-16
`;
interface productWithUser extends Product {
  _count: {
    favorite: number;
  };
  user: User;
}

interface favProductResponseWithUser extends Favorite {
  user: User;
  product: productWithUser;
}

interface favProductResponse {
  ok: boolean;
  favProducts: favProductResponseWithUser[];
}

const Fav: NextPage = () => {
  const { data } = useSWR<favProductResponse>("/api/profile/fav");

  return (
    <Layout canGoBack isLogIn title="관심 목록">
      <Wrapper>
        {data?.favProducts?.map((favProduct) => (
          <Item
            name={favProduct.product.user.name}
            price={favProduct.product.price}
            heart={favProduct.product._count.favorite}
            productName={favProduct.product.name}
            id={favProduct.product.id}
            key={favProduct.product.id}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Fav;
