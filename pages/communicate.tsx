import tw from "tailwind-styled-components";

const Wrapper = tw.div`
  mt-10
`;

const PostContainer = tw.div`
  px-4
  py-4
  border-b
  flex
  items-center
  justify-between
  relative
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

const PostInfoContainer = tw.div``;

const Question = tw.div``;

const Name = tw.span``;

const PostSubInfoContainer = tw.div``;

export default function Communicate() {
  return (
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
              <div>11:20</div>
              <div>
                <div>2</div>
                <div>1</div>
              </div>
            </PostSubInfoContainer>
          </PostContainer>
        </>
      ))}
    </Wrapper>
  );
}
