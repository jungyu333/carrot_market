import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import TextArea from "@components/textArea";
import { useForm } from "react-hook-form";
import SubmitButton from "@components/submitButton";
import useMutaion from "../../libs/client/useMutation";
import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";

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

const Error = tw.span`
  text-red-500
  text-sm
  pt-1
`;

interface MutationResult {
  ok: boolean;
  message: string;
}

const NewMember: NextPage = () => {
  const router = useRouter();
  const [newMember, { loading, data, error }] =
    useMutaion<MutationResult>("/api/users/newUser");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onValid = (validForm: FormData) => {
    if (loading) return;
    newMember(validForm);
  };

  useEffect(() => {
    if (data?.message === "existed email") {
      alert("중복된 이메일입니다.");
      reset({ email: "" });
    }
    if (data?.message === "created account") {
      alert("회원가입이 완료되었습니다.");
      router.push("/enter");
    }
  }, [data, reset, router]);

  return (
    <Layout canGoBack title="회원 가입">
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("email", { required: "이메일을 입력해주세요" })}
          type="email"
          label="Email"
          labelBold
        />
        <Error>{errors.email?.message}</Error>
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
        <Error>{errors.password?.message}</Error>
        <Input
          register={register("name", {
            required: "이름을 입력해주세요",
          })}
          type="text"
          label="이름"
          labelBold
        />
        <Error>{errors.name?.message}</Error>
        <Input
          register={register("phone")}
          type="phone"
          label="Phone"
          labelBold
        />

        <div className="pt-2">
          <TextArea register={register("introduce")} label="자기소개" />
        </div>
        <SubmitButton text={loading ? "Loading..." : "회원 가입"} />
      </Wrapper>
    </Layout>
  );
};

export default NewMember;
