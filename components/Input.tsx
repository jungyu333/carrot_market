import { UseFormRegisterReturn } from "react-hook-form";
import tw from "tailwind-styled-components";

interface InputProps {
  type: "member" | "nonMember" | "text" | "price" | "email" | "phone";
  label: string;
  labelBold?: boolean;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
}

interface InputLabelProps {
  $labelBold?: boolean;
}

const InputLabel = tw.label<InputLabelProps>`
  flex
  mb-2
  ${(p: InputLabelProps) =>
    p.$labelBold ? "font-bold text-lg" : "font-medium  text-sm"}
 
`;

const MemberInput = tw.input`
  appearance-none
  w-full
  shadow-sm
  rounded-md
  border-[1px]
  text-gray-500
  border-gray-300
  placeholder-gray-400
  focus:outline-none
  focus:ring-orange-500
  focus:border-orange-500
`;

const NonMemberInput = tw.input`
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

const PriceInput = tw.input`
  appearance-none
  w-full
  shadow-sm
  rounded-md
  border-[1px]
  text-gray-500
  border-gray-300
  placeholder-gray-400
  focus:outline-none
  focus:ring-orange-500
  focus:border-orange-500
 
`;

export default function Input({
  type,
  label,
  labelBold = false,
  placeholder,
  register,
  required,
}: InputProps) {
  return (
    <>
      {type === "member" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <MemberInput
            {...register}
            autoComplete="off"
            placeholder={placeholder}
            type="email"
            required={required}
          />
        </>
      ) : null}
      {type === "email" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <MemberInput
            {...register}
            autoComplete="off"
            required={required}
            placeholder={placeholder}
            type="email"
          />
        </>
      ) : null}
      {type === "nonMember" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <div className="flex rounded-md shadow-sm">
            <span className="flex select-none items-center  justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +82
            </span>
            <NonMemberInput
              {...register}
              required={required}
              autoComplete="off"
              type="text"
            />
          </div>
        </>
      ) : null}
      {type === "phone" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <div className="flex rounded-md shadow-sm">
            <span className="flex select-none items-center  justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +82
            </span>
            <NonMemberInput
              {...register}
              required={required}
              autoComplete="off"
              type="text"
            />
          </div>
        </>
      ) : null}
      {type === "price" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <div className="relative">
            <PriceInput
              {...register}
              autocomplete="off"
              type="text"
              placeholder="0.00"
              required={required}
            />
          </div>
        </>
      ) : null}
      {type === "text" ? (
        <>
          <InputLabel $labelBold={labelBold}>{label}</InputLabel>
          <MemberInput
            {...register}
            autoComplete="off"
            type="text"
            placeholder={placeholder}
            required={required}
          />
        </>
      ) : null}
    </>
  );
}
