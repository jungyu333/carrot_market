import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import useMutaion from "@libs/client/useMutation";

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
  items-end
`;

const Price = tw.span`
  text-2xl
  pr-4
`;

const Heart = tw.div`
  flex
  items-center
  justify-center
  mr-4
  cursor-pointer
  hover:text-red-400
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
  bg-slate-100
  h-48
  scroll-auto
  p-2
  rounded-md
`;

const SimilarWrapper = tw.div`
  mt-5
  pb-4
  space-y-2
`;

const SimilarHeader = tw.h1`
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

interface ProductWithUser extends Product {
  user: User;
}

interface productResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<productResponse>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );
  const [clickHeart, { loading, data: favData }] = useMutaion(
    router.query.id ? `/api/items/${router.query.id}/fav` : ""
  );
  const onClickHeart = () => {
    if (loading) return;
    clickHeart({});
  };

  return (
    <Layout canGoBack title="물품 정보" isLogIn>
      <Wrapper>
        <ImageContainer></ImageContainer>
        <ProductInfoWrapper>
          <ProductInfoContainer>
            <ProductName>{data?.product?.name}</ProductName>
            <UserContainer>
              <Avatar />
              <UserName>{data?.product?.user?.name}</UserName>
            </UserContainer>
          </ProductInfoContainer>
          <ProductSubInfoContainer>
            <Price>${data?.product?.price}</Price>
            <Heart onClick={onClickHeart}>
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
          <Description>{data?.product?.description}</Description>
        </DescriptionWrapper>
        <SimilarWrapper>
          {data?.relatedProducts.length === 0 ? null : (
            <SimilarHeader>Similar!</SimilarHeader>
          )}
          <SimilarContainer>
            {data?.relatedProducts.map((relatedItem) => (
              <Link key={relatedItem.id} href={`/items/${relatedItem.id}`}>
                <SimilarProduct>
                  <SimilarImage />
                  <SimilarName>{relatedItem.name}</SimilarName>
                </SimilarProduct>
              </Link>
            ))}
          </SimilarContainer>
        </SimilarWrapper>
      </Wrapper>
    </Layout>
  );
};

export default ItemDetail;
