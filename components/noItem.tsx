import tw from "tailwind-styled-components";

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

interface NoItemProps {
  text: string;
  children: React.ReactNode;
}

export default function NoItem({ text, children }: NoItemProps) {
  return (
    <div>
      <NoCartContainer>
        {children}
        <NoCart>{text}</NoCart>
      </NoCartContainer>
    </div>
  );
}
