import { useState, useEffect } from "react";

export const useTalkLogin = (client, simpleUserInfo, login) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const getUserInfo = async () => {
    const res = await simpleUserInfo();
    const { id, firstName, lastName, profileImage } = res.data.data;
    return {
      userId: id,
      username: `${firstName} ${lastName}`,
      profileImageUrl: profileImage,
    };
  };

  const loginUser = async (userInfo) => {
    await login(userInfo);
    setIsLogin(client.isLoggedIn());
  };

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserId(String(userInfo.userId));
        try {
          await loginUser(userInfo);
        } catch (loginError) {
          console.log(loginError);
        }
      } catch (userInfoError) {
        console.log(userInfoError);
      }
    };

    handleLogin();
  }, []);

  return { isLogin, userId };
};
