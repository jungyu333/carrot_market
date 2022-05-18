import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import TextArea from "../../components/textArea";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/submitButton";

const Wrapper = tw.form`
  mt-24
  px-3
  space-y-2
`;

interface FormResponse {
  name: string;
  email: string;
  phone: number;
  introduce: string;
  password: string;
}

const NewMember: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormResponse>();
  const onValid = (data: FormResponse) => {
    console.log(data);
    reset();
  };

  return (
    <Layout canGoBack title="회원 가입">
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("email", { required: "이메일을 입력해주세요" })}
          type="email"
          label="Email"
          labelBold
        />
        <span>{errors.email?.message}</span>
        <Input
          type="text"
          label="비밀번호"
          labelBold
          register={register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
        <span>{errors.password?.message}</span>
        <Input
          register={register("name", {
            required: "이름을 입력해주세요",
          })}
          type="text"
          label="이름"
          labelBold
        />
        <span>{errors.name?.message}</span>
        <Input
          register={register("phone")}
          type="phone"
          label="Phone"
          labelBold
        />

        <div className="pt-2">
          <TextArea register={register("introduce")} label="자기소개" />
        </div>
        <SubmitButton text="회원 가입" />
      </Wrapper>
    </Layout>
  );
};

export default NewMember;