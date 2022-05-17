import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import TextArea from "../../components/textArea";

const Wrapper = tw.div`
  mt-24
  px-3
  space-y-2
`;

const NewMember: NextPage = () => {
  return (
    <Layout canGoBack title="회원 가입">
      <Wrapper>
        <Input type="text" label="이름" labelBold />
        <Input type="email" label="Email" labelBold />
        <Input type="phone" label="Phone" labelBold />
        <div className="pt-2">
          <TextArea label="자기소개" />
        </div>
      </Wrapper>
    </Layout>
  );
};

export default NewMember;
