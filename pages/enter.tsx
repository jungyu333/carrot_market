import mitt from "next/dist/shared/lib/mitt";
import { useState } from "react";
import tw from "tailwind-styled-components";
import SubmitButton from "../components/submitButton";

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
  $props: "email" | "phone";
}

const EmailMethod = tw.button<MethodButtonProps>`
  text-xl
  w-full
  border-b
  pb-2
  text-gray-500
  ${(p: any) =>
    p.$props === "email"
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
    p.$props === "phone"
      ? "text-orange-400 font-bold  border-orange-400"
      : "border-transparent hover:text-gray-400 text-gray-500"}
`;

const FormWrapper = tw.form`
  mt-6
`;

const InputLabel = tw.label`
  font-medium
  text-sm
  
`;

const InputContainer = tw.div`
    my-2
`;

const EmailInput = tw.input`

  appearance-none
  w-full
  shadow-sm
  rounded-md
  border-[1px]
  border-l-
  text-gray-500
  border-gray-300
  placeholder-gray-400
  focus:outline-none
  focus:ring-orange-500
  focus:border-orange-500
`;

const PhoneInput = tw.input`
  px-3
  py-2
  appearance-none
  w-full
  shadow-sm
  rounded-r-md
  border-[1px]
  text-gray-500
  border-gray-300
  placeholder-gray-400
    focus:outline-none
  focus:ring-orange-500
  focus:border-orange-500
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

export default function Enter() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onClickEmail = () => {
    setMethod("email");
  };
  const onClickPhone = () => {
    setMethod("phone");
  };
  return (
    <Wrapper>
      <Title>Enter to Carrot</Title>
      <MethodWrapper>
        <MethodHeader>Using Method</MethodHeader>
        <MethodContainer>
          <EmailMethod $props={method} onClick={onClickEmail}>
            Email
          </EmailMethod>
          <PhoneMethod $props={method} onClick={onClickPhone}>
            Phone
          </PhoneMethod>
        </MethodContainer>
      </MethodWrapper>
      <FormWrapper>
        <InputLabel>
          {method === "email" ? "Email Address" : null}
          {method === "phone" ? "Phone Number" : null}
        </InputLabel>
        <InputContainer>
          {method === "email" ? (
            <EmailInput
              autoComplete="off"
              placeholder="Input Your Email!"
              type="email"
              required
            />
          ) : null}
          {method === "phone" ? (
            <div className="flex rounded-md shadow-sm">
              <span className="flex select-none items-center  justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                +82
              </span>
              <PhoneInput type="text" />
            </div>
          ) : null}
        </InputContainer>
        <SubmitButtonContainer>
          {method === "email" ? (
            <SubmitButton text="Enter With Email!" />
          ) : null}
          {method === "phone" ? (
            <SubmitButton text="Enter With Phone Number!" />
          ) : null}
        </SubmitButtonContainer>
      </FormWrapper>
      <CreatedBy>Created By Jun</CreatedBy>
    </Wrapper>
  );
}
