import type { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Layout from "../components/layout";
import Item from "../components/item";

const Wrapper = tw.div`
  mt-14
  relative
  mb-20
`;

const NewProduct = tw.div`
  border
  h-14 
  w-14
  rounded-full
  p-1
  flex
  items-center
  justify-center
  bg-orange-400
  hover:bg-orange-500
  fixed
  bottom-24
  right-6
  transition-colors
  shadow-sm
  text-white
  cursor-pointer
`;

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar canGoBack={false} isLogIn>
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
        <Link href="/items/newItem"></Link>
      </Wrapper>
    </Layout>
  );
};

export default Home;
