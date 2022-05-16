import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";

const CreateNew = tw.a`
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
  cursor-pointer
`;

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({
  children,
  href,
}: FloatingButtonProps) {
  return (
    <Link href={href}>
      <CreateNew>{children}</CreateNew>
    </Link>
  );
}
