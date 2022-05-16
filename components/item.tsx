import Link from "next/link";
import tw from "tailwind-styled-components";

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

interface ItmeProps {
  productName: string;
  name: string;
  price: number;
  heart: number;
  id: number;
}

export default function Item({
  productName,
  name,
  price,
  heart,
  id,
}: ItmeProps) {
  return (
    <Link href={`/items/${id}`}>
      <ProductContainer>
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
  );
}
