import React from "react";
import tw from "tailwind-styled-components";

interface ListButtonProps {
  children: React.ReactNode;
}

const Circle = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-16
  h-16
  border
  bg-orange-400
  p-4
  rounded-full
`;
export default function ListButton({ children }: ListButtonProps) {
  return <Circle>{children}</Circle>;
}
