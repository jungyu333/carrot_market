import { NextPage } from "next";
import tw from "tailwind-styled-components";
import Input from "@components/Input";
import Layout from "@components/layout";
import SubmitButton from "@components/submitButton";
import TextArea from "@components/textArea";

const Wrapper = tw.div`
  mt-16
  px-4
 
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

const ProductNameContainer = tw.div`
  space-y-2
  mb-4
`;

const PriceContainer = tw.div`
  space-y-2
  mb-4
`;

const DescriptionContainer = tw.div`
  space-y-2
  mb-4
`;

const NewItem: NextPage = () => {
  return (
    <Layout title="물건 등록" canGoBack isLogIn hasTabBar={false}>
      <Wrapper>
        <ImageContainer>
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
            <ImageInput accept="image/*" type="file" />
          </ImageLabel>
        </ImageContainer>
        <ProductNameContainer>
          <Input type="text" label="Product Name" labelBold />
        </ProductNameContainer>
        <PriceContainer>
          <Input type="price" label="Price" labelBold />
        </PriceContainer>
        <DescriptionContainer>
          <TextArea label="Description" placeholder="Description" />
        </DescriptionContainer>

        <SubmitButton text="Upload Item" />
      </Wrapper>
    </Layout>
  );
};

export default NewItem;
