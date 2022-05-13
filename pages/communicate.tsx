import tw from "tailwind-styled-components";
import Layout from "../components/layout";

const Wrapper = tw.div`
  mt-16
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

const Badge = tw.span`
  border
  border-gray-200
  rounded-full
  p-[0.7px]
  px-2
  text-xs
  bg-slate-200
  shadow-md
  absolute
  left-2
  top-1.5
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
  text-md
`;

const CommentContainer = tw.div`
  flex
  items-center
  justify-center
`;

const Comment = tw.span`
  text-sm
`;

const NewProduct = tw.div`
  border
  h-14 
  w-14
  rounded-full
  p-1
  flex
  items-center
  justify-center
  bg-orange-400
  hover:bg-orange-500
  fixed
  bottom-24
  right-6
  transition-colors
  shadow-sm
  text-white
`;
export default function Communicate() {
  return (
    <Layout title="커뮤니티" hasTabBar isLogIn canGoBack={false}>
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <>
            <PostContainer key={i}>
              <Badge>궁금해요</Badge>
              <PostInfoContainer>
                <Question>Q.. what are you doing?</Question>
                <Name>jungyu</Name>
              </PostInfoContainer>
              <PostSubInfoContainer>
                <Time>11:20</Time>
                <CommentContainer>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 pr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <Comment>2</Comment>
                </CommentContainer>
              </PostSubInfoContainer>
            </PostContainer>
            <NewProduct>
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
            </NewProduct>
          </>
        ))}
      </Wrapper>
    </Layout>
  );
}
