import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-16
`;

const PurChase: NextPage = () => {
  return (
    <Layout canGoBack isLogIn hasTabBar={false} title="구매 목록">
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Item
            id={i}
            key={i}
            name="jungyu"
            productName="IPhone 14"
            price={99}
            heart={2}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default PurChase;
