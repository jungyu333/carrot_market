import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import { Cart, Product, User } from "@prisma/client";
import useSWR from "swr";
import SubmitButton from "@components/submitButton";

const Wrapper = tw.div`
  mt-14
`;

const CalcurateContainer = tw.div`
  w-full
  mx-auto
  max-w-xl
  fixed
  bottom-4
  px-3
  space-y-1
`;

const Calcurate = tw.div`
  font-bold
  text-lg
  text-right
`;

const NoCartContainer = tw.div`
  h-screen
  flex
  flex-col
  items-center
  justify-center
`;

const NoCart = tw.span`
  text-gray-400
  mt-2
`;

interface cartProductWithUser extends Cart {
  user: User;
  product: Product;
}

interface CartResponse {
  ok: boolean;
  cartProducts: cartProductWithUser[];
}

const CartProduct: NextPage = () => {
  const { data } = useSWR<CartResponse>("/api/profile/cart");

  let total = data?.cartProducts
    ?.map((cartProduct) => cartProduct.product.price)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Layout canGoBack isLogIn title="장바구니">
      {data?.cartProducts.length !== 0 ? (
        <Wrapper>
          {data?.cartProducts?.map((cartProduct) => (
            <Item
              productName={cartProduct.product.name}
              name={cartProduct.user.name}
              price={cartProduct.product.price}
              id={cartProduct.product.id}
              avatar={cartProduct.product.avatar}
              isCart
              key={cartProduct.id}
            />
          ))}
          <CalcurateContainer>
            <Calcurate>Total : ${total}</Calcurate>
            <SubmitButton text="전부 구매하기" />
          </CalcurateContainer>
        </Wrapper>
      ) : (
        <div>
          <NoCartContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28 w-28 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <NoCart>장바구니가 비었습니다</NoCart>
          </NoCartContainer>
        </div>
      )}
    </Layout>
  );
};

export default CartProduct;
