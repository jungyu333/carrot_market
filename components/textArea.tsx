import { UseFormRegisterReturn } from "react-hook-form";
import tw from "tailwind-styled-components";

const DescriptionLabel = tw.label`
  font-bold
  text-gray-700
  text-lg
  cursor-pointer
`;

const Text = tw.textarea`
  w-full
  rounded-md
  border
  text-gray-500
  border-gray-300
  placeholder-gray-400
  focus:ring-orange-500
  focus:border-orange-500
`;

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function TextArea({
  label,
  placeholder,
  register,
}: TextAreaProps) {
  return (
    <>
      <DescriptionLabel>{label}</DescriptionLabel>
      <Text {...register} placeholder={placeholder} rows={6} />
    </>
  );
}
