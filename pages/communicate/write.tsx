import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutaion from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Post } from "@prisma/client";

const Wrapper = tw.form`
  mt-20
  px-3
`;

const TitleContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-2
`;

const MainContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-2
  pt-2
`;

const ButtonContainer = tw.div`
  mt-8
`;

const Error = tw.span`
  text-red-500
  text-sm
`;

interface FormData {
  title: string;
  question: string;
}

interface postMutateResult {
  ok: boolean;
  newPost: Post;
}

const WritePost: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [newPost, { loading, data }] = useMutaion<postMutateResult>(
    "/api/communicate/newPost"
  );
  const onValid = (validForm: FormData) => {
    if (loading) return;
    newPost(validForm);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/communicate/${data.newPost.id}`);
    }
  }, [router, data]);
  return (
    <Layout canGoBack title="새 글 작성" isLogIn hasTabBar={false}>
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <TitleContainer>
          <Input
            register={register("title", { required: "제목을 입력해주세요" })}
            type="text"
            label="제목"
            labelBold
          />
        </TitleContainer>
        <Error>{errors.title?.message}</Error>
        <MainContainer>
          <TextArea
            register={register("question", { required: "본문을 입력해주세요" })}
            placeholder="Create Post"
            label="본문"
          />
        </MainContainer>
        <Error>{errors.question?.message}</Error>
        <ButtonContainer>
          <SubmitButton text={loading ? "Loading..." : "Create a Post"} />
        </ButtonContainer>
      </Wrapper>
    </Layout>
  );
};

export default WritePost;
