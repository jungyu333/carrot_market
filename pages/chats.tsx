import tw from "tailwind-styled-components";
import Layout from "../components/layout";

const Wrapper = tw.div`
  mt-16
`;

const ChatContainer = tw.div`
  border-b
  py-2
  px-4
  flex
  items-center
  space-x-4
  cursor-pointer
  hover:bg-gray-200
`;

const AvatarContainer = tw.div`
  w-16
  h-16
  bg-slate-300
  rounded-full
`;

const Avater = tw.div``;

const MainContainer = tw.div`
  flex
  flex-col
  space-y-3
`;

const UserName = tw.span`
  font-medium
  text-lg
`;

const Content = tw.span`
  text-sm
  text-gray-400
`;

export default function Chat() {
  return (
    <Layout title="채팅" isLogIn canGoBack={false} hasTabBar>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ChatContainer key={i}>
            <AvatarContainer>
              <Avater />
            </AvatarContainer>
            <MainContainer>
              <UserName>Jungyu</UserName>
              <Content>How are You!</Content>
            </MainContainer>
          </ChatContainer>
        ))}
      </Wrapper>
    </Layout>
  );
}
