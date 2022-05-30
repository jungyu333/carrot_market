import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWRInfinite from "swr/infinite";
import { Cart, Product, User } from "@prisma/client";
import { useEffect } from "react";
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
      <Wrapper>
        {data?.cartProducts?.map((cartProduct) => (
          <Item
            productName={cartProduct.product.name}
            name={cartProduct.user.name}
            price={cartProduct.product.price}
            id={cartProduct.product.id}
            avatar={cartProduct.product.avatar}
            isDelete
            key={cartProduct.id}
          />
        ))}
        <CalcurateContainer>
          <Calcurate>Total : ${total}</Calcurate>
          <SubmitButton text="구매하기" />
        </CalcurateContainer>
      </Wrapper>
    </Layout>
  );
};

export default CartProduct;
