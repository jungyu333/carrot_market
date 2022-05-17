import tw from "tailwind-styled-components";

interface MessageProps {
  isreversed?: boolean;
  name: string;
  text: string;
}

interface MessageProps {
  $isreversed?: boolean;
}

const MessageContainer = tw.div<MessageProps>`
  flex
  mt-5
  ${(p: MessageProps) => (p.$isreversed ? "flex-row-reverse " : " ")}
`;

const Avatar = tw.div`
  w-10
  h-10
  bg-slate-300
  rounded-full
  mx-1
`;

const TextContainer = tw.div`
  w-1/3
  flex
  flex-col
  justify-center
  items-start
  space-y-2
  -mt-1
`;

const Name = tw.span<MessageProps>`
  w-full
  px-2
  ${(p: MessageProps) => (p.$isreversed ? "text-right" : "text-left ")}
`;

const Text = tw.p<MessageProps>`
  border
  py-3
  px-2
  w-full
  break-words
  rounded-br-lg
  rounded-bl-lg
  ${(p: MessageProps) =>
    p.$isreversed
      ? "rounded-tl-lg   bg-orange-300 text-right"
      : " rounded-tr-lg  bg-slate-200"}
`;

export default function Message({
  name,
  text,
  isreversed = false,
}: MessageProps) {
  return (
    <MessageContainer $isreversed={isreversed}>
      <Avatar />
      <TextContainer>
        <Name $isreversed={isreversed}>{name}</Name>
        <Text $isreversed={isreversed}>{text}</Text>
      </TextContainer>
    </MessageContainer>
  );
}
