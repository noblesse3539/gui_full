import { ReactElement } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../interfaces";

const currentUserIDState = atom({
  key: "CurrentUserID",
  default: null,
});

const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get: (userID) => async () => {
    const response = await myDBQuery({ userID });
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);
    return friendList.map((friendID) => get(userInfoQuery(friendID)));
  },
});

const Practice2: NextPageWithLayout = () => {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <>
      <Header title="Practice2" />
      <main>
        <div>
          <h1>{currentUser.name}</h1>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

Practice2.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Practice2;
