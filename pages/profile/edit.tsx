import tw from "tailwind-styled-components";
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

const NameInputContainer = tw.div`
  space-y-2
`;

const NameLabel = tw.label`
  font-bold
  text-gray-700
  text-lg
  cursor-pointer
`;

const NameInput = tw.input`
  w-full
  py-2
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
`;

const EmailInputContainer = tw.div`
  space-y-2
`;

const EmailLabel = tw.label`
  font-bold
  text-gray-700
  text-lg
  cursor-pointer
`;

const EmailInput = tw.input`
  w-full
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
`;

const PhoneInputContainer = tw.div`
  space-y-2
`;

const PhoneLabel = tw.label`
  font-bold
  text-gray-700
  text-lg
  cursor-pointer
`;

const PhoneInput = tw.input`
  w-full
  rounded-md
  focus:ring-orange-500
  focus:border-orange-500
  pl-10
  placeholder:text-gray-400
`;

const IntroduceContainer = tw.div`
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
        <NameInputContainer>
          <NameLabel htmlFor="name">Name</NameLabel>
          <NameInput autoComplete="off" id="name" type="text" />
        </NameInputContainer>
        <EmailInputContainer>
          <EmailLabel htmlFor="email">Email</EmailLabel>
          <EmailInput id="email" autoComplete="off" type="email" />
        </EmailInputContainer>
        <PhoneInputContainer>
          <PhoneLabel htmlFor="phone">Phone Number</PhoneLabel>
          <div className="relative">
            <span className="absolute top-[10px] left-2">+82</span>
            <PhoneInput id="phone" autoComplete="off" type="text" />
          </div>
        </PhoneInputContainer>
        <IntroduceContainer>
          <IntroduceLabel htmlFor="introduce">Introduce</IntroduceLabel>
          <TextArea id="introduce" rows={6} />
        </IntroduceContainer>
        <SubmitButton text="Edit Profile" />
      </Wrapper>
    </Layout>
  );
}
