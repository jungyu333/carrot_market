import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-16
  px-3
`;

const ImageContainer = tw.div`
  h-72
  bg-slate-300
`;

const ProductInfoWrapper = tw.div`
  flex
  justify-between
  items-center
  mt-5
  border-b
  pb-2
`;

const ProductInfoContainer = tw.div`
  flex
  flex-col
  space-y-4
  justify-center
  items-start
`;

const ProductName = tw.h1`
  font-bold
  text-3xl
`;

const UserContainer = tw.div`
  flex
  items-center
  space-x-2
`;

const Avatar = tw.div`
  bg-slate-400
  h-8
  w-8
  rounded-full
`;

const UserName = tw.span`
  font-medium
  text-gray-500
`;

const ProductSubInfoContainer = tw.div`
  flex
  flex-col
  space-y-3
`;

const Price = tw.span`
  text-2xl
  pr-4
`;

const Heart = tw.div`
  flex
  items-center
  justify-center
`;

const ButtonContainer = tw.div`
  mt-4
`;

const Button = tw.button`
  border
  p-2
  w-full
  py-3
  rounded-md
  bg-orange-500
  text-white
  text-lg
  hover:bg-orange-600
  focus:outline-none
`;

const DescriptionWrapper = tw.div`
  mt-5
  border-b
  pb-4
  space-y-2
`;

const DescriptionHeader = tw.h1`
  font-bold
  text-lg
`;

const Description = tw.div`
  w-full
  bg-slate-400
  h-48
  scroll-auto
`;

const SimilarWrapper = tw.div`
  mt-5
  border-b
  pb-4
  space-y-2
`;

const SimilarHaeder = tw.h1`
  font-bold
  text-lg
`;

const SimilarContainer = tw.div`
  grid
  grid-cols-2
  gap-2
`;

const SimilarProduct = tw.div`
  cursor-pointer
`;

const SimilarImage = tw.div`
  w-full
  h-52
  bg-slate-300
  
`;

const SimilarName = tw.span`
  text-sm
  text-gray-400
`;
const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack title="물품 정보" hasTabBar={false} isLogIn>
      <Wrapper>
        <ImageContainer></ImageContainer>
        <ProductInfoWrapper>
          <ProductInfoContainer>
            <ProductName>Camera</ProductName>
            <UserContainer>
              <Avatar />
              <UserName>Jungyu</UserName>
            </UserContainer>
          </ProductInfoContainer>
          <ProductSubInfoContainer>
            <Price>$12</Price>
            <Heart>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </Heart>
          </ProductSubInfoContainer>
        </ProductInfoWrapper>
        <ButtonContainer>
          <Button>Talk to Seller!</Button>
        </ButtonContainer>
        <DescriptionWrapper>
          <DescriptionHeader>Description!</DescriptionHeader>
          <Description></Description>
        </DescriptionWrapper>
        <SimilarWrapper>
          <SimilarHaeder>Similar!</SimilarHaeder>
          <SimilarContainer>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <SimilarProduct key={item}>
                <SimilarImage />
                <SimilarName>camera box</SimilarName>
              </SimilarProduct>
            ))}
          </SimilarContainer>
        </SimilarWrapper>
      </Wrapper>
    </Layout>
  );
};

export default ItemDetail;
