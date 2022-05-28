import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";
import { useForm } from "react-hook-form";
import useMutaion from "@libs/client/useMutation";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Wrapper = tw.form`
  mt-16
  px-4
 
`;

const Button = tw.label`
  cursor-pointer
  bg-orange-500
  p-2
  rounded-md
  hover:bg-orange-600
  text-white
  text-sm
`;

const ProductPhoto = tw.img`
  w-full
  h-60
`;

const ImageContainer = tw.div`
  mb-4
`;

const ImageLabel = tw.label`
  w-full
  flex
  items-center
  h-60
  justify-center
  border-2
  border-dashed
  cursor-pointer
  rounded-md
  hover:border-orange-500
  hover:text-orange-500
`;

const ImageInput = tw.input`
  hidden
`;

const InputContainer = tw.div`
  space-y-2
  mb-2
`;

const Error = tw.span`
  text-sm
  text-red-500
`;

interface FormData {
  name: string;
  price: number;
  description: string;
  photo?: FileList;
}

interface productMutationResult {
  ok: boolean;
  product: Product;
}

const NewItem: NextPage = () => {
  const [photoPreview, setPhotoPreview] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [newItem, { loading, data }] =
    useMutaion<productMutationResult>("/api/items/newItem");
  const onValid = async ({ name, price, description, photo }: FormData) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const form = new FormData();
      form.append("file", photo[0], data?.product.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      newItem({
        name,
        price,
        description,
        photoId: id,
      });
    } else {
      newItem({
        name,
        price,
        description,
        photoId: "",
      });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/items/${data.product.id}`);
    }
  }, [router, data]);
  const photo = watch("photo");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);
  const onClickRemove = () => {
    setPhotoPreview("");
  };

  return (
    <Layout title="물건 등록" canGoBack isLogIn>
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <ImageContainer>
          {photoPreview ? (
            <ProductPhoto src={photoPreview} />
          ) : (
            <ImageLabel>
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <ImageInput {...register("photo")} accept="image/*" type="file" />
            </ImageLabel>
          )}
        </ImageContainer>
        <Button onClick={onClickRemove}>Reset Image</Button>
        <InputContainer>
          <Input
            register={register("name", {
              required: "물건 이름을 입력해주세요",
            })}
            type="text"
            label="name"
            labelBold
          />
        </InputContainer>
        <Error>{errors.name?.message}</Error>
        <InputContainer>
          <Input
            register={register("price", {
              required: "물건 가격을 입력해주세요($)",
            })}
            type="price"
            label="Price"
            labelBold
          />
        </InputContainer>
        <Error>{errors.price?.message}</Error>
        <InputContainer>
          <TextArea
            register={register("description")}
            label="Description"
            placeholder="Description"
          />
        </InputContainer>

        <SubmitButton text={loading ? "Loading..." : "Upload Item"} />
      </Wrapper>
    </Layout>
  );
};

export default NewItem;
