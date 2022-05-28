import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import useMutaion from "@libs/client/useMutation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

const Wrapper = tw.form`
  mt-20
  px-4
  space-y-6
`;

const InputContainer = tw.div`
  space-y-1
`;

const Error = tw.span`
  text-red-500
  text-sm
`;

interface FormData {
  currentPassword: string;
  newPassword: string;
  checkPassword: string;
}

interface updatePasswordMutaionResult {
  ok: boolean;
  message?: string;
}
const Password: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [updatePassword, { loading, data }] =
    useMutaion<updatePasswordMutaionResult>("/api/users/updatepassword");
  const onValid = (validForm: FormData) => {
    if (loading) return;
    updatePassword(validForm);
  };
  useEffect(() => {
    if (data?.message === "password is not correct") {
      alert("현재 비밀번호가 일치하지 않습니다");
      reset({ currentPassword: "" });
    }
    if (data?.message === "password is not equal") {
      alert("비밀번호를 다시 한번 확인해주세요");
      reset({ checkPassword: "" });
    }
    if (data?.ok) {
      alert("비밀번호가 변경되었습니다.");
      router.replace("/profile");
    }
  }, [data, reset, router]);
  return (
    <Layout canGoBack title="비밀번호 변경">
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <InputContainer>
          <Input
            register={register("currentPassword", {
              required: "현재 비밀번호를 입력해주세요",
            })}
            type="password"
            label="현재 비밀번호"
            labelBold
          />
          <Error>{errors.currentPassword?.message}</Error>
        </InputContainer>

        <InputContainer>
          <Input
            register={register("newPassword", {
              required: "새로운 비밀번호를 입력해주세요",
              minLength: {
                message: "비밀번호는 6자 이상 입력해주세요",
                value: 6,
              },
            })}
            type="password"
            label="새로운 비밀번호"
            labelBold
          />
          <Error>{errors.newPassword?.message}</Error>
        </InputContainer>

        <InputContainer>
          <Input
            register={register("checkPassword", {
              required: "다시 한번 비밀번호를 입력해주세요",
              minLength: {
                message: "비밀번호는 6자 이상 입력해주세요",
                value: 6,
              },
            })}
            type="password"
            label="비밀번호 확인"
            labelBold
          />
          <Error>{errors.checkPassword?.message}</Error>
        </InputContainer>
        <SubmitButton text="비밀번호 변경" />
      </Wrapper>
    </Layout>
  );
};

export default Password;
