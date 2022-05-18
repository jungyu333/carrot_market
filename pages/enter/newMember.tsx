import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import TextArea from "@components/textArea";
import { useForm } from "react-hook-form";
import SubmitButton from "@components/submitButton";
import useMutaion from "../../libs/client/useMutation";

const Wrapper = tw.form`
  mt-24
  px-3
  space-y-2
`;

interface FormData {
  name: string;
  email: string;
  phone: number;
  introduce: string;
  password: string;
}

const NewMember: NextPage = () => {
  const [newMember, { loading, data, error }] =
    useMutaion("/api/users/newUser");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onValid = (validForm: FormData) => {
    if (loading) return;
    newMember(validForm);
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
            minLength: {
              value: 6,
              message: "비밀번호는 6자 이상으로 만들어주세요",
            },
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
