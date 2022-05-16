import tw from "tailwind-styled-components";

const Badges = tw.span`
  border
  border-gray-200
  rounded-full
  p-[0.7px]
  px-2
  text-xs
  bg-slate-200
  shadow-md
  absolute
  left-2
  top-1.5
`;

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return <Badges>{text}</Badges>;
}
