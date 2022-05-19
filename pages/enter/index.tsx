import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import SubmitButton from "@components/submitButton";
import { useForm } from "react-hook-form";
import useMutaion from "@libs/client/useMutation";

const Wrapper = tw.div`
  mt-16
  px-4
`;

const Title = tw.div`
  text-center
  font-bold
  text-3xl
  text-orange-400
  hover:text-orange-500
  
`;

const MethodWrapper = tw.div`
  mt-12
  flex
  flex-col
`;

const MethodHeader = tw.span`
  text-center
  text-md
`;

const MethodContainer = tw.div`
  grid 
  border-b 
  w-full 
  mt-8 
  grid-cols-2 
`;

interface MethodButtonProps {
  $props: "member" | "nonMember";
}

const EmailMethod = tw.button<MethodButtonProps>`
  text-xl
  w-full
  border-b
  pb-2
  text-gray-500
  ${(p: any) =>
    p.$props === "member"
      ? "text-orange-400 font-bold border-orange-400"
      : "border-transparent hover:text-gray-400 text-gray-500"}
`;

const PhoneMethod = tw.button<MethodButtonProps>`
  text-xl
  w-full
  border-b
  pb-2
  text-gray-500
  ${(p: any) =>
    p.$props === "nonMember"
      ? "text-orange-400 font-bold  border-orange-400"
      : "border-transparent hover:text-gray-400 text-gray-500"}
`;

const FormWrapper = tw.form`
  mt-6
`;

const NewMember = tw.span`
  text-left
  text-sm
  font-bold
  my-10
  mt-5
  text-gray-400
  hover:text-gray-700
  cursor-pointer
`;

const SubmitButtonContainer = tw.div`
    mt-16
`;

const CreatedBy = tw.div`
    text-sm
    flex
    justify-center
    items-center
    mt-6
    border-t
`;

interface FormData {
  email?: string;
  phone?: string;
  password: string;
}

const Enter: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const router = useRouter();
  const [method, setMethod] = useState<"member" | "nonMember">("member");
  const onClickEmail = () => {
    setMethod("member");
    reset({ phone: "" });
  };
  const onClickPhone = () => {
    setMethod("nonMember");
    reset({ email: "", password: "" });
  };
  const onClickNewMember = () => {
    router.push("/enter/newMember");
  };
  const [newNonUser, { loading, data }] = useMutaion("/api/users/newNonUser");

  const onValid = (validForm: FormData) => {
    if (method === "nonMember") {
      if (loading) return;
      newNonUser(validForm);
    }
  };

  return (
    <Wrapper>
      <Title>Enter to Carrot</Title>
      <MethodWrapper>
        <MethodHeader>Using Method</MethodHeader>
        <MethodContainer>
          <EmailMethod $props={method} onClick={onClickEmail}>
            Member Login
          </EmailMethod>
          <PhoneMethod $props={method} onClick={onClickPhone}>
            Non-Member Login
          </PhoneMethod>
        </MethodContainer>
      </MethodWrapper>
      <FormWrapper onSubmit={handleSubmit(onValid)}>
        {method === "member" ? (
          <div className="space-y-2">
            <Input
              register={register("email")}
              type="member"
              label="Email Address"
            />
            <Input
              type="text"
              label="Password"
              register={register("password")}
            />
          </div>
        ) : null}
        {method === "nonMember" ? (
          <Input
            register={register("phone")}
            type="nonMember"
            label="Phone Number"
          />
        ) : null}
        <NewMember onClick={onClickNewMember}>회원가입</NewMember>
        <SubmitButtonContainer>
          <SubmitButton text="Enter!" />
        </SubmitButtonContainer>
      </FormWrapper>
      <CreatedBy>Created By Jun</CreatedBy>
    </Wrapper>
  );
};

export default Enter;
