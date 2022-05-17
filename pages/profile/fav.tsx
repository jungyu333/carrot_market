import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-16
`;

const Fav: NextPage = () => {
  return (
    <Layout canGoBack isLogIn hasTabBar={false} title="관심 목록">
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Item
            name="jungyu"
            price={25}
            heart={4}
            productName="IPhone 13"
            id={i}
            key={i}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Fav;
