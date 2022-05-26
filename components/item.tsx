import useMutaion from "@libs/client/useMutation";
import Link from "next/link";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import tw from "tailwind-styled-components";

const ProductContainer = tw.div<DeleteIconProps>`
  w-full
  flex
  justify-between
  items-center
  py-4
  px-4
  cursor-pointer
  hover:bg-slate-100
  ${(p: DeleteIconProps) => (p.$isSell ? "" : "border-b")}
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
  flex
  items-center
`;

const Seller = tw.div`
  text-sm
  mt-1
`;

const ProductSubInfoContainer = tw.div`
  flex
  flex-col
  justify-center
  items-end
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

const DeleteIcon = tw.span<DeleteIconProps>`
  text-gray-500
  cursor-pointer
  w-1/12
  
  h-24
  flex
  justify-center
  items-center
  hover:bg-red-500
  hover:text-white
  ${(p: DeleteIconProps) => (p.$isSell ? "" : "hidden")}
`;

interface ItmeProps {
  productName: string;
  name: string;
  price: number;
  heart: number;
  id: number;
  isSell?: boolean;
}

interface DeleteIconProps {
  $isSell: boolean;
}

interface DeleteMutaionResult {
  ok: boolean;
}

export default function Item({
  productName,
  name,
  price,
  heart,
  id,
  isSell = false,
}: ItmeProps) {
  const [deleteItem, { loading, data }] =
    useMutaion<DeleteMutaionResult>("/api/items/itemdel");
  const { mutate } = useSWRConfig();
  const onClickDelete = (id: number) => {
    if (loading) return;
    deleteItem(id);
  };
  useEffect(() => {
    if (data && data.ok) {
      mutate("/api/profile/sell");
    }
  }, [mutate, data]);
  return (
    <div className="flex  w-full items-center">
      <DeleteIcon $isSell={isSell} onClick={() => onClickDelete(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </DeleteIcon>
      <Link href={`/items/${id}`}>
        <ProductContainer $isSell={isSell}>
          <ProductInfoContainer>
            <ImgContainer>
              <ProductImage />
            </ImgContainer>
            <div>
              <ProductName>{productName}</ProductName>
              <Seller>{name}</Seller>
            </div>
          </ProductInfoContainer>
          <ProductSubInfoContainer>
            <Price>${price}</Price>
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
              <Heart>{heart}</Heart>
            </div>
          </ProductSubInfoContainer>
        </ProductContainer>
      </Link>
    </div>
  );
}
