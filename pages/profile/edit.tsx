import tw from "tailwind-styled-components";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submitButton";

const Wrapper = tw.div`
  mt-20
  px-4
  flex
  flex-col
  space-y-4
`;

const AvatarContainer = tw.div`
  flex
  space-x-3
  items-center
`;

const Avatar = tw.div`
  bg-slate-300
  w-16
  h-16
  rounded-full
`;

const EditImage = tw.label`
  cursor-pointer
  bg-orange-500
  p-2
  rounded-md
  hover:bg-orange-600
  text-white
  text-sm
`;

const ImageFile = tw.input`
  hidden
`;

const InputContainer = tw.div`
  space-y-2
`;

const IntroduceLabel = tw.label`
  font-bold
  text-gray-700
  text-lg
  cursor-pointer
`;

const TextArea = tw.textarea`
  w-full
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
`;

export default function Edit() {
  return (
    <Layout canGoBack title="내 정보" hasTabBar={false} isLogIn={false}>
      <Wrapper>
        <AvatarContainer>
          <Avatar />
          <EditImage htmlFor="image">Edit Image</EditImage>
          <ImageFile id="image" accept="image/*" type="file" />
        </AvatarContainer>
        <InputContainer>
          <Input type="text" label="Name" labelBold placeholder="name" />
        </InputContainer>
        <InputContainer>
          <Input type="email" label="Email" labelBold placeholder="email" />
        </InputContainer>
        <InputContainer>
          <Input type="phone" label="Phone Number" labelBold />
        </InputContainer>
        <InputContainer>
          <IntroduceLabel htmlFor="introduce">Introduce</IntroduceLabel>
          <TextArea id="introduce" rows={6} />
        </InputContainer>
        <SubmitButton text="Edit Profile" />
      </Wrapper>
    </Layout>
  );
}
