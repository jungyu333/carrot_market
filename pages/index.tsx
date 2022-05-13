import type { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "../components/layout";

const Wrapper = tw.div`
  mt-14
  relative
`;

const ProductContainer = tw.div`
  w-full
  flex
  justify-between
  items-center
  border-b
  py-4
  px-4
  cursor-pointer
  hover:bg-slate-100
`;

const ImgContainer = tw.div`
  w-16
  h-16
  bg-slate-300
  rounded-md
  mr-4
`;

const ProductImage = tw.div``;

const ProductInfoContainer = tw.div`
  flex
  justify-evenly
  
`;

const ProductName = tw.div`
  font-bold
  text-2xl
  text-gray-600
`;

const Seller = tw.div`
  text-sm
  mt-1
`;

const ProductSubInfoContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-3
`;

const Price = tw.div`
  font-bold
  text-gray-600
`;

const Heart = tw.div`
  font-medium
  ml-1
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
`;

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar canGoBack={false} isLogIn>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ProductContainer key={i}>
            <ProductInfoContainer>
              <ImgContainer>
                <ProductImage />
              </ImgContainer>
              <div>
                <ProductName>Camera</ProductName>
                <Seller>jungyu</Seller>
              </div>
            </ProductInfoContainer>
            <ProductSubInfoContainer>
              <Price>$12</Price>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <Heart>1</Heart>
              </div>
            </ProductSubInfoContainer>
          </ProductContainer>
        ))}
        <NewProduct>
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
        </NewProduct>
      </Wrapper>
    </Layout>
  );
};

export default Home;
