import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Cart, Product, User } from "@prisma/client";
import Link from "next/link";
import useMutaion from "@libs/client/useMutation";
import Image from "next/image";
import imageUrl from "@libs/client/imageUrl";
import noimage from "../../public/noimage.png";
import noAvatar from "../../public/noAvatar.jpeg";
import { useEffect } from "react";

const Wrapper = tw.div`
  mt-16
  px-3
`;

const ImageContainer = tw.div`
  relative 
  pb-72
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

const Heart = tw.div<HeartProps>`
  flex
  items-center
  justify-center
  mr-4
  cursor-pointer
  text-gray-400
  hover:text-red-400
  ${(p: HeartProps) => (p.$isLiked ? "text-red-500" : "")}
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
  border
  p-2
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

interface HeartProps {
  $isLiked: boolean;
}

interface ProductWithUser extends Product {
  user: User;
}

interface productResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

interface meResponse {
  ok: boolean;
  currentUser: User;
}

interface CartMutationResult {
  ok: boolean;
  newCartProduct?: Cart;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data: meData } = useSWR<meResponse>("/api/users/me");
  const { data, mutate } = useSWR<productResponse>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );
  const [clickHeart, { loading }] = useMutaion(
    router.query.id ? `/api/items/${router.query.id}/fav` : ""
  );

  const onClickHeart = () => {
    if (loading) return;
    clickHeart({});
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };

  const [addCart, { loading: cartLoading, data: cartData }] =
    useMutaion<CartMutationResult>(`/api/items/${router.query.id}/cart`);

  const onClickCart = () => {
    if (cartLoading) return;
    addCart({});
  };

  useEffect(() => {
    if (cartData && cartData.ok) alert("장바구니에 담았습니다");
    if (cartData && !cartData.ok)
      alert("이미 장바구니에 담겨져 있는 물품입니다");
  }, [cartData]);

  return (
    <Layout canGoBack title="물품 정보" isLogIn>
      <Wrapper>
        {data?.product?.avatar ? (
          <ImageContainer>
            <Image
              className="object-scale-down"
              layout="fill"
              alt="product"
              src={imageUrl(data?.product.avatar, "public")}
            />
          </ImageContainer>
        ) : (
          <ImageContainer>
            <Image
              src={noimage}
              className="object-contain"
              alt="noimage"
              placeholder="blur"
              layout="fill"
            />
          </ImageContainer>
        )}
        <ProductInfoWrapper>
          <ProductInfoContainer>
            <ProductName>{data?.product?.name}</ProductName>
            <UserContainer>
              {data?.product.user.avatar ? (
                <Image
                  src={imageUrl(data?.product.user.avatar, "avatar")}
                  width={40}
                  height={40}
                  className="rounded-full"
                  loading="lazy"
                  alt="avatar"
                />
              ) : (
                <Image
                  src={noAvatar}
                  width={40}
                  height={40}
                  className="rounded-full"
                  placeholder="blur"
                  alt="avatar"
                />
              )}
              <UserName>{data?.product?.user?.name}</UserName>
            </UserContainer>
          </ProductInfoContainer>
          <ProductSubInfoContainer>
            <Price>${data?.product?.price}</Price>
            <Heart $isLiked={data?.isLiked} onClick={onClickHeart}>
              {data?.isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
              )}
            </Heart>
          </ProductSubInfoContainer>
        </ProductInfoWrapper>
        <ButtonContainer>
          {meData?.currentUser?.id !== data?.product?.user.id ? (
            <Button onClick={onClickCart}>
              {cartLoading ? "Loading..." : "Add to Cart"}
            </Button>
          ) : null}
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
                  {relatedItem.avatar ? (
                    <div className="relative pb-40">
                      <Image
                        src={imageUrl(relatedItem.avatar, "public")}
                        alt="product"
                        layout="fill"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative pb-40">
                      <Image
                        src={noimage}
                        layout="fill"
                        className="object-contain"
                        alt="product"
                      />
                    </div>
                  )}
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
