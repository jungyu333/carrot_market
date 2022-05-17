import tw from "tailwind-styled-components";
import Layout from "../../components/layout";
import Message from "../../components/message";

const Wrapper = tw.div`
  mt-20
  px-3
  relative
`;

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
        <Message name="jungyu" text="hello" isreversed />
        <Message name="jun" text="hi" />
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
