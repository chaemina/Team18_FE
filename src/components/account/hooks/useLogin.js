import { RESET } from "jotai/utils";
import { expiryAtom, tokenAtom, authAtom, uidAtom } from "../../../store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navaigate = useNavigate();
  const [expiry, setExpiry] = useAtom(expiryAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [uid, setUid] = useAtom(uidAtom);

  const loginUser = (data) => {
    const now = new Date();
    const ttl = 3600 * 1000; // 1h
    setAuth(true);
    setUid(data?.data?.user?.uid);
    setToken(data?.headers?.authorization);
    setExpiry(now.getTime() + ttl);
    window.localStorage.setItem("expiry", now.getTime() + ttl);
  };
  const logoutUser = () => {
    setAuth(RESET);
    setToken(RESET);
    setUid(RESET);
    setExpiry("");
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiry");
    window.reload();
  };

  return { expiry, loginUser, logoutUser };
};

export default useLogin;
