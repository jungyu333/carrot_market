import type { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import Item from "@components/item";
import FloatingButton from "@components/floatingButton";

const Wrapper = tw.div`
  mt-14
  relative
  mb-20
`;

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar isLogIn>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
          <Item
            name="jungyu"
            productName="Iphone 14"
            heart={2}
            price={99}
            key={i}
            id={i}
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
