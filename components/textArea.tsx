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
}

export default function TextArea({ label, placeholder }: TextAreaProps) {
  return (
    <>
      <DescriptionLabel>{label}</DescriptionLabel>
      <Text placeholder={placeholder} rows={6} />
    </>
  );
}
