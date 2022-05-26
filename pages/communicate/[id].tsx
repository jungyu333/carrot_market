import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Answer, Post, User } from "@prisma/client";
import useMutaion from "@libs/client/useMutation";
import AnswerItem from "@components/answerItem";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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

const CommentContainer = tw.div<CommentProps>`
  flex
  items-center
  space-x-2
  cursor-pointer
  ${(p: CommentProps) => (p.$isWondering ? "text-teal-500" : "")}
`;

const Comment = tw.span`
  text-sm
  text-gray-500
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
  mt-2
  space-y-2
`;

const AnswerForm = tw.form`
  mt-10
  px-3
`;

const Error = tw.span`
  text-sm
  text-red-400
  block
  mb-2
`;

interface CommentProps {
  $isWondering: boolean;
}

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  answer: AnswerWithUser[];
  _count: {
    answer: number;
  };
}

interface PostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface FormData {
  answer: string;
}

interface answerMutationResult {
  ok: boolean;
  newAnswer: Answer;
}

interface useUserDataResponse {
  ok: boolean;
  currentUser: User;
}

const CommunicateDetail: NextPage = () => {
  const { data: useUserData } = useSWR<useUserDataResponse>("/api/users/me");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const router = useRouter();
  const { data, mutate } = useSWR<PostResponse>(
    router.query.id ? `/api/communicate/${router.query.id}` : ""
  );
  const [wonder, { loading }] = useMutaion(
    `/api/communicate/${router.query.id}/wonder`
  );
  const [answer, { loading: answerLoading, data: answerData }] =
    useMutaion<answerMutationResult>(
      `/api/communicate/${router.query.id}/answer`
    );

  const onClickWondering = () => {
    if (loading) return;
    wonder({});
    if (!data) return;
    mutate({ ...data, isWondering: !data?.isWondering }, false);
  };
  const onValid = (validForm: FormData) => {
    if (answerLoading) return;
    answer(validForm);
    if (!answerData) return;
  };
  useEffect(() => {
    if (answerData?.ok) {
      reset();
      mutate();
    }
  }, [reset, answerData, mutate]);

  return (
    <Layout canGoBack isLogIn title="궁금해요">
      <Wrapper>
        <UserWrapper>
          <UserContainer>
            <Avatar />
            <UserInfoContainer>
              <UserName>{data?.post?.user.name}</UserName>
              <ViewProfile>View Profile</ViewProfile>
            </UserInfoContainer>
          </UserContainer>
          <QuestionTime>
            {data?.post?.createdAt.toString().split("T", 1)}
          </QuestionTime>
        </UserWrapper>
        <CommentWrapper>
          <CommentContainer
            $isWondering={data?.isWondering}
            onClick={onClickWondering}
          >
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
            <Comment>궁금해요</Comment>
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
            <Comment>답변 {data?.post?._count?.answer}</Comment>
          </CommentContainer>
        </CommentWrapper>
        <QuestionWrapper>
          <QuestionTitle>
            <Q>Q.</Q>
            <Title>{data?.post?.title}</Title>
          </QuestionTitle>
          <Question>
            <QuestionContext>{data?.post?.question}</QuestionContext>
          </Question>
        </QuestionWrapper>
        <AnswerWrapper>
          {data?.post?.answer.map((ans) => (
            <AnswerItem
              key={ans.id}
              id={ans.id}
              name={
                ans.user.id === data.post.user.id ? "글쓴이" : ans.user.name
              }
              answer={ans.answer}
              time={ans.createdAt.toString().split("T", 1)}
              canDelete={ans.user.id === useUserData?.currentUser.id}
            />
          ))}
        </AnswerWrapper>
        <AnswerForm onSubmit={handleSubmit(onValid)}>
          <TextArea
            register={register("answer", { required: "답변을 입력해주세요" })}
            placeholder="your answer"
          />
          <Error>{errors.answer?.message}</Error>
          <SubmitButton text={answerLoading ? "Loading..." : "답변 달기"} />
        </AnswerForm>
      </Wrapper>
    </Layout>
  );
};

export default CommunicateDetail;
