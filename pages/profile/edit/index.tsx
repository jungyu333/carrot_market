import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";
import useSWR from "swr";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutaion from "@libs/client/useMutation";
import { useRouter } from "next/router";

const Wrapper = tw.form`
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

const Error = tw.span`
  text-red-500
  text-sm
  
`;

interface CurrentUserResponse {
  ok: boolean;
  currentUser: User;
}

interface FormData {
  name: string;
  phone: number;
  introduce: string;
}

interface UpdateMutaionResult {
  ok: boolean;
}

const Edit: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<CurrentUserResponse>("/api/users/me");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [update, { loading, data: updateData }] =
    useMutaion<UpdateMutaionResult>("/api/users/update");
  useEffect(() => {
    if (data?.currentUser.name) setValue("name", data.currentUser.name);
    if (data?.currentUser.phone) setValue("phone", data.currentUser.phone);
    if (data?.currentUser.introduce)
      setValue("introduce", data.currentUser.introduce);

    if (updateData && updateData.ok) {
      alert("정보가 수정되었습니다");
      router.replace("/profile");
    }
  }, [setValue, data, updateData, router, reset]);

  const onValid = (validForm: FormData) => {
    if (loading) return;
    update(validForm);
  };
  return (
    <Layout canGoBack title="내 정보">
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <AvatarContainer>
          <Avatar />
          <EditImage htmlFor="image">Edit Image</EditImage>
          <ImageFile id="image" accept="image/*" type="file" />
        </AvatarContainer>
        <InputContainer>
          <Input
            register={register("name", { required: "이름을 입력해주세요" })}
            type="text"
            label="name"
            labelBold
            placeholder="name"
          />
        </InputContainer>
        <Error>{errors.name?.message}</Error>

        <InputContainer>
          <Input
            register={register("phone", { required: "번호를 입력해주세요" })}
            type="phone"
            label="Phone Number"
            labelBold
          />
        </InputContainer>
        <Error>{errors.phone?.message}</Error>
        <InputContainer>
          <TextArea
            register={register("introduce")}
            placeholder="Introduce"
            label="Introduce"
          />
        </InputContainer>

        <SubmitButton text="Edit Profile" />
      </Wrapper>
    </Layout>
  );
};

export default Edit;
