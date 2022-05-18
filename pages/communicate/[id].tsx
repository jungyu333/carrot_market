import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";

const Wrapper = tw.div`
  mt-16
`;

const UserWrapper = tw.div`
  flex
  justify-between
  items-center
  border-b
  px-3
  pb-3
`;

const UserContainer = tw.div`
  flex
  space-x-3
`;

const Avatar = tw.div`
  bg-slate-400
  h-16
  w-16
  rounded-full
`;

const UserInfoContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-2
`;

const UserName = tw.h1`
  font-bold
  text-lg
`;

const ViewProfile = tw.button`
  font-medium
  text-sm
  text-gray-400
  hover:text-gray-600
`;

const QuestionTime = tw.span`
  text-sm
  text-gray-400
  pr-3
`;

const CommentWrapper = tw.div`
  flex
  items-center
  px-3
  py-2
  space-x-3
  border-b
`;

const CommentContainer = tw.div`
  
  flex
  items-center
  space-x-2
  cursor-pointer
  
`;

const Comment = tw.span`
  text-sm
  text-gray-500
  hover:text-gray-700
`;

const QuestionWrapper = tw.div`
  py-3
  px-3
  flex
  flex-col
  border-b
`;

const QuestionTitle = tw.div`
  space-x-2
  flex
  items-center
`;

const Q = tw.span`
  text-orange-500
  font-bold
`;

const Title = tw.span`
  font-bold
  text-lg
`;

const Question = tw.div`
  px-6
  mt-6
`;

const QuestionContext = tw.div`
  text-gray
  bg-gray-100
  min-h-max
  rounded-md
  p-2
`;

const AnswerWrapper = tw.div`
  divide-y-[1px]
  
`;

const AnswerContainer = tw.div`
  flex
  items-center
  justify-between
  space-x-3
  px-3
  py-2
  
`;

const AnswerInfoContainer = tw.div`
  flex 
  space-x-3
`;

const AnswerAvatar = tw.div`
  bg-slate-300
  w-12
  h-12
  rounded-full
`;

const AnswerUserContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-1
  -mt-1
`;

const AnswerUserName = tw.span`
  font-bold
`;

const Answer = tw.p`
  text-sm
  text-gray-500
`;

const AnswerTime = tw.span`
  text-sm
  text-gray-400
  pr-2
`;

const AnswerForm = tw.div`
  mt-10
  px-3
`;
const CommunicateDetail: NextPage = () => {
  return (
    <Layout canGoBack isLogIn title="궁금해요">
      <Wrapper>
        <UserWrapper>
          <UserContainer>
            <Avatar />
            <UserInfoContainer>
              <UserName>jungyu</UserName>
              <ViewProfile>View Profile</ViewProfile>
            </UserInfoContainer>
          </UserContainer>
          <QuestionTime>11:20</QuestionTime>
        </UserWrapper>
        <CommentWrapper>
          <CommentContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            <Comment>궁금해요 2</Comment>
          </CommentContainer>
          <CommentContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            <Comment>답변 3</Comment>
          </CommentContainer>
        </CommentWrapper>
        <QuestionWrapper>
          <QuestionTitle>
            <Q>Q.</Q>
            <Title>What are you Doing?</Title>
          </QuestionTitle>
          <Question>
            <QuestionContext>happy Coding!</QuestionContext>
          </Question>
        </QuestionWrapper>
        <AnswerWrapper>
          <AnswerContainer>
            <AnswerInfoContainer>
              <AnswerAvatar />
              <AnswerUserContainer>
                <AnswerUserName>jun</AnswerUserName>
                <Answer>good!</Answer>
              </AnswerUserContainer>
            </AnswerInfoContainer>
            <AnswerTime>5시간 전</AnswerTime>
          </AnswerContainer>
        </AnswerWrapper>
        <AnswerForm>
          <TextArea placeholder="your answer" />
          <SubmitButton text="답변 달기" />
        </AnswerForm>
      </Wrapper>
    </Layout>
  );
};

export default CommunicateDetail;
