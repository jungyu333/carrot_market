import tw from "tailwind-styled-components";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-20
  px-3
  relative
`;

const MessageContainer = tw.div<MessageProps>`
  flex
  space-x-3
  mt-5
  ${(p: MessageProps) => (p.$isreversed ? "flex-row-reverse" : " ")}
`;

const Avatar = tw.div`
  w-10
  h-10
  bg-slate-300
  rounded-full
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

interface MessageProps {
  $isreversed: boolean;
}

const InputContainer = tw.div`
  fixed
  bottom-2
  bg-white
  flex
  inset-x-0
  px-2
  max-w-xl
  mx-auto
  
`;

const Input = tw.input`
  w-full
  mx-auto
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
  border-gray-400
`;

const SendButton = tw.button`
  absolute 
  inset-y-0 
  right-2
  px-1.5 
  py-2 
  rounded-md
  bg-orange-500
  cursor-pointer
  text-white
  hover:bg-orange-600
`;

export default function ChatDetail() {
  return (
    <Layout canGoBack title="Jungyu" isLogIn={false} hasTabBar={false}>
      <Wrapper>
        <MessageContainer $isreversed>
          <Avatar />
          <TextContainer>
            <Name $isreversed>jungyu</Name>
            <Text $isreversed>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>
        <MessageContainer>
          <Avatar />
          <TextContainer>
            <Name>jungyu</Name>
            <Text>hello</Text>
          </TextContainer>
        </MessageContainer>

        <InputContainer>
          <Input type="text" />
          <SendButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </SendButton>
        </InputContainer>
      </Wrapper>
    </Layout>
  );
}
