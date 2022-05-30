import type { NextPage } from "next";
import Link from "next/link";
import tw from "tailwind-styled-components";
import Layout from "@components/layout";
import ListButton from "@components/listButton";
import useSWR from "swr";
import { User } from "@prisma/client";
import Image from "next/image";
import imageUrl from "@libs/client/imageUrl";
import noAvatar from "../../public/noAvatar.jpeg";

const Wrapper = tw.div`
  mt-16
  px-5
`;

const UserWrapper = tw.div`
  flex
`;

const AvatarContainer = tw.div`
  mr-4
`;

const UserInfo = tw.div`
  flex
  flex-col
  justify-center
  items-start
  space-y-2
`;

const UserName = tw.span`
  font-bold
  text-2xl
`;

const EditContainer = tw.div`
  flex 
  items-center 
  space-x-2
`;

const Edit = tw.button`
  text-sm
  text-gray-400
  font-medium
  hover:text-gray-700
`;

const ListWrapper = tw.div`
  flex
  justify-between
  px-5
  mt-12
  pb-2
  border-b
  mb-2
`;

const ListContainer = tw.div`
  flex 
  flex-col 
  items-center 
  space-y-2
  cursor-pointer
`;

const ListName = tw.span`
  font-medium
  text-gray-500
`;

const Introduce = tw.div`
  bg-orange-50
  w-full
  h-96
  mt-2
  text-gray-500
  p-3
`;

interface CurrentUserResponse {
  ok: boolean;
  currentUser: User;
}

const Profile: NextPage = () => {
  const { data } = useSWR<CurrentUserResponse>("/api/users/me");
  return (
    <Layout title="마이페이지" isLogIn hasTabBar>
      <Wrapper>
        <UserWrapper>
          {data?.currentUser?.avatar ? (
            <AvatarContainer>
              <Image
                src={imageUrl(data.currentUser.avatar, "avatar")}
                className="rounded-full"
                width={80}
                height={80}
                loading="lazy"
                alt="product"
              />
            </AvatarContainer>
          ) : (
            <AvatarContainer>
              <Image
                src={noAvatar}
                placeholder="blur"
                width={80}
                height={80}
                className="rounded-full"
                alt="noavatar"
              />
            </AvatarContainer>
          )}
          <UserInfo>
            <UserName>{data?.currentUser?.name}</UserName>
            <EditContainer>
              <Link href="/profile/edit">
                <Edit>Edit Profile</Edit>
              </Link>
              <Link href="/profile/edit/password">
                <Edit>Edit Password</Edit>
              </Link>
            </EditContainer>
          </UserInfo>
        </UserWrapper>
        <ListWrapper>
          <Link href="/profile/cart">
            <ListContainer>
              <ListButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </ListButton>
              <ListName>장바구니</ListName>
            </ListContainer>
          </Link>
          <Link href="/profile/sell">
            <ListContainer>
              <ListButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </ListButton>
              <ListName>판매목록</ListName>
            </ListContainer>
          </Link>
          <Link href="/profile/fav">
            <ListContainer>
              <ListButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </ListButton>
              <ListName>관심목록</ListName>
            </ListContainer>
          </Link>
        </ListWrapper>
        <span className="  text-2xl font-bold">Introduce!</span>
        <Introduce>
          {data?.currentUser?.introduce === ""
            ? "Introduce is Non!"
            : data?.currentUser?.introduce}
        </Introduce>
      </Wrapper>
    </Layout>
  );
};

export default Profile;
