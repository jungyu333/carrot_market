import tw from "tailwind-styled-components";
import Layout from "../components/layout";

const Wrapper = tw.div`
  mt-16
  px-5
`;

const UserWrapper = tw.div`
  flex
`;

const AvatarContainer = tw.div`
  w-20
  h-20
  bg-slate-300
  rounded-full
  mr-4
`;

const Avatar = tw.div``;

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

const PurchaseContainer = tw.div`
  flex 
  flex-col 
  items-center 
  space-y-2
  cursor-pointer
`;

const PurchaseIcon = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-16
  h-16
  border
  bg-orange-400
  p-4
  rounded-full
`;

const Purchase = tw.span`
  font-medium
  text-gray-500
`;

const SalesContainer = tw.div`
  flex 
  flex-col 
  items-center 
  space-y-2
  cursor-pointer
`;

const SalesIcon = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-16
  h-16
  border
  bg-orange-400
  p-4
  rounded-full
`;

const Sales = tw.span`
  font-medium
  text-gray-500
`;

const WatchContainer = tw.div` 
  flex 
  flex-col 
  items-center 
  space-y-2
  cursor-pointer
`;

const WatchIcon = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-16
  h-16
  border
  bg-orange-400
  p-4
  rounded-full
`;

const Watch = tw.span`
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

export default function Profile() {
  return (
    <Layout title="마이페이지" isLogIn hasTabBar canGoBack={false}>
      <Wrapper>
        <UserWrapper>
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
          <UserInfo>
            <UserName>jungyu</UserName>
            <Edit>Edit Profile</Edit>
          </UserInfo>
        </UserWrapper>
        <ListWrapper>
          <PurchaseContainer>
            <PurchaseIcon>
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
            </PurchaseIcon>
            <Purchase>구매목록</Purchase>
          </PurchaseContainer>
          <SalesContainer>
            <SalesIcon>
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
            </SalesIcon>
            <Sales>판매목록</Sales>
          </SalesContainer>
          <WatchContainer>
            <WatchIcon>
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
            </WatchIcon>
            <Watch>관심목록</Watch>
          </WatchContainer>
        </ListWrapper>
        <span className="  text-2xl font-bold">Introduce!</span>
        <Introduce>Hello!</Introduce>
      </Wrapper>
    </Layout>
  );
}
