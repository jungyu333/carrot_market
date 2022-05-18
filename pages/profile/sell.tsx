import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";

const Wrapper = tw.div`
  mt-16
`;

const Sell: NextPage = () => {
  return (
    <Layout canGoBack isLogIn hasTabBar={false} title="판매 목록">
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Item
            name="jungyu"
            productName="IPhone 14"
            heart={2}
            price={23}
            id={i}
            key={i}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Sell;
