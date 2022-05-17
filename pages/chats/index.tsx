import { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-14
  mb-20
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

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" isLogIn canGoBack={false} hasTabBar>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Link key={i} href={`/chats/${i}`}>
            <ChatContainer key={i}>
              <AvatarContainer>
                <Avater />
              </AvatarContainer>
              <MainContainer>
                <UserName>Jungyu</UserName>
                <Content>How are You!</Content>
              </MainContainer>
            </ChatContainer>
          </Link>
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Chats;
