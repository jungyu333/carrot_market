import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";
import { NextPage } from "next";

const Wrapper = tw.div`
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
  py-4
`;

const ButtonContainer = tw.div`
  mt-8
`;

const WritePost: NextPage = () => {
  return (
    <Layout canGoBack title="새 글 작성" isLogIn hasTabBar={false}>
      <Wrapper>
        <TitleContainer>
          <Input type="text" label="제목" labelBold />
        </TitleContainer>
        <MainContainer>
          <TextArea placeholder="Create Post" label="본문" />
        </MainContainer>
        <ButtonContainer>
          <SubmitButton text="Create a Post" />
        </ButtonContainer>
      </Wrapper>
    </Layout>
  );
};

export default WritePost;
