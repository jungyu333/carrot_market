import tw from "tailwind-styled-components";
import Layout from "../../components/layout";

const Wrapper = tw.div`
  mt-20
  px-3
`;

const TitleContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-2
  py-4
`;

const Title = tw.label`
  font-bold
  text-lg
`;

const TitleInput = tw.input`
  py-2
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
  placeholder:text-gray-400
`;

const MainContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-2
  py-4
`;

const Main = tw.label`
  font-bold
  text-lg
  `;

const TextArea = tw.textarea`
  py-2
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
  placeholder:text-gray-400
`;

const ButtonContainer = tw.div`
  mt-8
`;

const Button = tw.button`
  border
  w-full
  py-3
  rounded-md
  bg-orange-500
  text-white
  hover:bg-orange-600
`;
export default function WritePost() {
  return (
    <Layout canGoBack title="새 글 작성" isLogIn hasTabBar={false}>
      <Wrapper>
        <TitleContainer>
          <Title>제목</Title>
          <TitleInput type="text" placeholder="Title" />
        </TitleContainer>
        <MainContainer>
          <Main>본문</Main>
          <TextArea rows={6} placeholder="Create Post" />
        </MainContainer>
        <ButtonContainer>
          <Button>Create a Post!</Button>
        </ButtonContainer>
      </Wrapper>
    </Layout>
  );
}
