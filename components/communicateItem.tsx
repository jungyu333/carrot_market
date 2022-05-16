import Link from "next/link";
import tw from "tailwind-styled-components";
import Badge from "./badge";

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

const PostInfoContainer = tw.a`
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

interface CommunicateItem {
  id: number;
  questionTitle: string;
  name: string;
  createdAt: string;
  comment: number;
}

export default function CommunicateItem({
  id,
  questionTitle,
  name,
  createdAt,
  comment,
}: CommunicateItem) {
  return (
    <Link href={`/communicate/${id}`}>
      <PostContainer>
        <Badge text="궁금해요" />
        <PostInfoContainer>
          <Question>Q.. {questionTitle}</Question>
          <Name>{name}</Name>
        </PostInfoContainer>
        <PostSubInfoContainer>
          <Time>{createdAt}</Time>
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
            <Comment>{comment}</Comment>
          </CommentContainer>
        </PostSubInfoContainer>
      </PostContainer>
    </Link>
  );
}
