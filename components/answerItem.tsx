import tw from "tailwind-styled-components";

const AnswerContainer = tw.div`
  flex
  items-center
  justify-between
  space-x-3
  px-3
  py-2
`;

const AnswerInfoContainer = tw.div`
  flex 
  space-x-3
`;

const AnswerAvatar = tw.div`
  bg-slate-300
  w-12
  h-12
  rounded-full
`;

const AnswerUserContainer = tw.div`
  flex
  flex-col
  justify-center
  space-y-1
  -mt-1
`;

const AnswerUserName = tw.span`
  font-bold
`;

const Answer = tw.p`
  text-sm
  text-gray-500
`;

const AnswerTime = tw.span`
  text-sm
  text-gray-400
  pr-2
`;

const AnswerForm = tw.div`
  mt-10
  px-3
`;

interface AnswerItemProps {
  name: string;
  answer: string;
  time: string[];
  avatar: string;
}

export default function AnswerItem({
  avatar,
  name,
  answer,
  time,
}: AnswerItemProps) {
  return (
    <>
      <AnswerContainer>
        <AnswerInfoContainer>
          <AnswerAvatar />
          <AnswerUserContainer>
            <AnswerUserName>{name}</AnswerUserName>
            <Answer>{answer}</Answer>
          </AnswerUserContainer>
        </AnswerInfoContainer>
        <AnswerTime>{time}</AnswerTime>
      </AnswerContainer>
    </>
  );
}
