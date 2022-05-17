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
  space-y-10
`;

const Time = tw.span`
  text-gray-400
  text-sm
  text-right
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
  badgeText: string;
}

export default function CommunicateItem({
  id,
  questionTitle,
  name,
  createdAt,
  comment,
  badgeText,
}: CommunicateItem) {
  return (
    <Link href={`/communicate/${id}`}>
      <PostContainer>
        <Badge text={badgeText} />
        <PostInfoContainer>
          <Question>Q.. {questionTitle}</Question>
          <Name>{name}</Name>
        </PostInfoContainer>
        <PostSubInfoContainer>
          <Time>{createdAt}</Time>
          <div className="flex items-center space-x-2">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Comment>{comment}</Comment>
            </CommentContainer>
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <Comment>{comment}</Comment>
            </CommentContainer>
          </div>
        </PostSubInfoContainer>
      </PostContainer>
    </Link>
  );
}
