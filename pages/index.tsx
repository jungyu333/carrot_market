import type { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import Item from "@components/item";
import FloatingButton from "@components/floatingButton";
import useSWR from "swr";
import { Product, User } from "@prisma/client";

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
}

const Home: NextPage = () => {
  const { data } = useSWR<ProductsResponse>("/api/items");

  return (
    <Layout title="Home" hasTabBar isLogIn>
      <Wrapper>
        {data?.products.map((product) => (
          <Item
            name={product.user.name}
            productName={product.name}
            heart={2}
            price={product.price}
            key={product.id}
            id={product.id}
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
