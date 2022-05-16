import { NextPage } from "next";
import tw from "tailwind-styled-components";
import CommunicateItem from "../../components/communicateItem";
import FloatingButton from "../../components/floatingButton";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-14
  mb-20
  px-2
  relative
`;

const PostContainer = tw.div`
  px-4
  py-5
  border-b
  flex
  items-center
  justify-between
  relative
  hover:bg-slate-100
  cursor-pointer
`;

const PostInfoContainer = tw.div`
  mt-3
  flex
  flex-col
  items-start
`;

const Question = tw.div`
  font-bold
  text-lg
  mb-2
`;

const Name = tw.span`
  
  font-medium
  text-sm
`;

const PostSubInfoContainer = tw.div`
  flex
  flex-col
  space-y-8
`;

const Time = tw.span`
  text-gray-400
  text-sm
`;

const CommentContainer = tw.div`
  flex
  items-center
  justify-center
`;

const Comment = tw.span`
  text-sm
`;

const Communicate: NextPage = () => {
  return (
    <Layout title="커뮤니티" hasTabBar isLogIn canGoBack={false}>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <CommunicateItem
            id={i}
            key={i}
            questionTitle="what are you doing?"
            name="jungyu"
            comment={4}
            createdAt="11:40"
          />
        ))}
        <FloatingButton href="/communicate/write">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </FloatingButton>
      </Wrapper>
    </Layout>
  );
};

export default Communicate;
