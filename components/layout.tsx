import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

import tw from "tailwind-styled-components";

interface LayoutProps {
  title: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  isLogIn?: boolean;
  children: React.ReactNode;
}

const Header = tw.div`
  bg-white
  flex
  items-center
  px-3
  py-3
  justify-center
  fixed
  top-0
  mx-auto 
  w-full 
  max-w-xl
  border-b
  z-10
  text-center
`;

const BackButton = tw.button`
  absolute
  left-2
`;
const LogOut = tw.button`
  absolute
  right-2
  text-sm
  border
  p-2
  rounded-md
  bg-orange-400
  text-white
  hover:bg-orange-500
`;

const Title = tw.span`
  font-bold
  text-lg
`;

const NavBar = tw.nav`
  bg-white
  mx-auto 
  w-full 
  max-w-xl
  flex
  justify-around
  items-center
  h-20
  fixed
  bottom-0
  border-t
`;

interface TabIconProps {
  $isRouterMatch: string;
}

const HomeContainer = tw.div<TabIconProps>`
  flex
  flex-col
  justify-center
  items-center
  space-y-1
  cursor-pointer
  ${(p: TabIconProps) =>
    p.$isRouterMatch === "/" ? "text-orange-400" : "text-gray-400"}
`;

const CommunityContainer = tw.div<TabIconProps>`
  flex
  flex-col
  justify-center
  items-center
  space-y-1
  cursor-pointer
  ${(p: TabIconProps) =>
    p.$isRouterMatch === "/communicate" ? "text-orange-400" : "text-gray-400"}
`;

const ChatContainer = tw.div<TabIconProps>`
  flex
  flex-col
  justify-center
  items-center
  space-y-1
  cursor-pointer
  ${(p: TabIconProps) =>
    p.$isRouterMatch === "/chats" ? "text-orange-400" : "text-gray-400"}
`;

const UserContainer = tw.div<TabIconProps>`
  flex
  flex-col
  justify-center
  items-center
  space-y-1
  cursor-pointer
  ${(p: TabIconProps) =>
    p.$isRouterMatch === "/profile" ? "text-orange-400" : "text-gray-400"}
`;

const IconName = tw.span`
  font-bold
  text-sm
`;

export default function Layout({
  title,
  canGoBack = false,
  isLogIn = false,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  const onClickLogOut = () => {
    fetch("/api/users/logout");
    router.replace("/enter");
  };
  return (
    <div>
      <Header>
        {canGoBack ? (
          <BackButton onClick={onClickBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </BackButton>
        ) : (
          <div></div>
        )}
        <Title>{title}</Title>
        {isLogIn ? (
          <LogOut onClick={onClickLogOut}>로그아웃</LogOut>
        ) : (
          <div></div>
        )}
      </Header>
      {children}
      {hasTabBar ? (
        <NavBar>
          <Link href="/">
            <HomeContainer $isRouterMatch={router.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <IconName>홈</IconName>
            </HomeContainer>
          </Link>
          <Link href="/communicate">
            <CommunityContainer $isRouterMatch={router.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <IconName>커뮤니티</IconName>
            </CommunityContainer>
          </Link>
          <Link href="/chats">
            <ChatContainer $isRouterMatch={router.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <IconName>채팅</IconName>
            </ChatContainer>
          </Link>
          <Link href="/profile">
            <UserContainer $isRouterMatch={router.pathname}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <IconName>유저</IconName>
            </UserContainer>
          </Link>
        </NavBar>
      ) : null}
    </div>
  );
}
