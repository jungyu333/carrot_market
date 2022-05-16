import tw from "tailwind-styled-components";

const Button = tw.button`
  text-center
  bg-orange-500
  text-orange-200
  w-full
  border-2
  py-3
  rounded-md
  focus:outline-none
  focus:ring-2
  focus:ring-orange-500
  hover:text-white
`;

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return <Button>{text}</Button>;
}
