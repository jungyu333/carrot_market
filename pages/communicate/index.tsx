import { NextPage } from "next";
import tw from "tailwind-styled-components";
import CommunicateItem from "@components/communicateItem";
import FloatingButton from "@components/floatingButton";
import Layout from "@components/layout";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { Post, User } from "@prisma/client";
import { useEffect } from "react";

const Wrapper = tw.div`
  mt-14
  mb-20
  px-2
  relative
`;

interface PostWithUser extends Post {
  user: User;
}

interface PostsResponse {
  ok: boolean;
  posts: PostWithUser[];
  pages: number;
}

const Communicate: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: PostsResponse) => {
    if (pageIndex === 0) return `/api/communicate?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/communicate?page=${pageIndex + 1}`;
  };
  const { data, setSize } = useSWRInfinite<PostsResponse>(getKey);
  const posts = data ? data.map((item) => item.posts).flat() : [];
  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      setSize((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Layout title="커뮤니티" hasTabBar isLogIn>
      <Wrapper>
        {posts?.map((post) => (
          <CommunicateItem
            id={post?.id}
            key={post?.id}
            questionTitle={post.title}
            name={post.user.name}
            comment={4}
            createdAt={post.createdAt.toString().split("T", 1) + ""}
            badgeText="궁금해요!"
            wondering={3}
          />
        ))}
        <FloatingButton href="/communicate/write">
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </FloatingButton>
      </Wrapper>
    </Layout>
  );
};

export default Communicate;
