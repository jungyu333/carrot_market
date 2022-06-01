import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Favorite, Product, User } from "@prisma/client";
import NoItem from "@components/noItem";

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
      {data?.favProducts.length !== 0 ? (
        <Wrapper>
          {data?.favProducts?.map((favProduct) => (
            <Item
              name={favProduct.product.user.name}
              price={favProduct.product.price}
              heart={favProduct.product._count.favorite}
              productName={favProduct.product.name}
              id={favProduct.product.id}
              key={favProduct.product.id}
              avatar={favProduct.product.avatar}
            />
          ))}
        </Wrapper>
      ) : (
        <NoItem text="관심 목록이 없습니다">
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

export default Fav;
