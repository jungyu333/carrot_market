import imageUrl from "@libs/client/imageUrl";
import useMutaion from "@libs/client/useMutation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import tw from "tailwind-styled-components";
import noAvatar from "../public/noAvatar.jpeg";

const AnswerContainer = tw.div`
  flex
  items-center
  justify-between
  px-3
  py-3
`;

const AnswerInfoContainer = tw.div`
  flex 
  items-start
`;

const AnswerAvatar = tw.div`
  mr-3
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
  flex
  items-center
  
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

const DeleteIcon = tw.span<DeleteIconProps>`
  text-gray-500
  cursor-pointer
  hover:text-gray-900
  ${(p: DeleteIconProps) => (p.$canDelete ? "" : "hidden")}
`;

interface DeleteIconProps {
  $canDelete: boolean;
}

interface AnswerItemProps {
  name: string;
  answer: string;
  time: string[];
  avatar: string | null;
  canDelete: boolean;
  id: number;
}

interface MutationResult {
  ok: boolean;
}

export default function AnswerItem({
  avatar,
  name,
  answer,
  time,
  id,
  canDelete = false,
}: AnswerItemProps) {
  const onClickDelete = () => {
    if (loading) return;
    answerdel(id);
  };
  const router = useRouter();
  const [answerdel, { loading, data }] = useMutaion<MutationResult>(
    "/api/communicate/answerdel"
  );
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (data && data.ok) {
      mutate(`/api/communicate/${router.query.id}`);
    }
  }, [mutate, data, router]);

  return (
    <>
      <AnswerContainer>
        <AnswerInfoContainer>
          {avatar ? (
            <AnswerAvatar>
              <Image
                src={imageUrl(avatar, "avatar")}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
                loading="lazy"
              />
            </AnswerAvatar>
          ) : (
            <AnswerAvatar>
              <Image
                src={noAvatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
                placeholder="blur"
              />
            </AnswerAvatar>
          )}
          <AnswerUserContainer>
            <AnswerUserName>
              {name}
              <DeleteIcon $canDelete={canDelete} onClick={onClickDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </DeleteIcon>
            </AnswerUserName>
            <Answer>{answer}</Answer>
          </AnswerUserContainer>
        </AnswerInfoContainer>
        <AnswerTime>{time}</AnswerTime>
      </AnswerContainer>
    </>
  );
}
