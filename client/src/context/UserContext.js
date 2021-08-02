import { createContext, useReducer, useEffect } from "react";
import { initialState, UserReducer } from "../reducer/UserReducer";
import { useHistory } from "react-router-dom";
import axios from "../utils/axios";

const UserContext = createContext();

const UserProvider = (props) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);
  let accessToken = localStorage.getItem("auth-token");
  useEffect(() => {
    async function fetchUser() {
      try {
        if (accessToken) {
          const { data } = await axios.get("/api/user/fetch");
          dispatch({ type: "FETCH_USER", payload: data.user });
          history.push("/");
        }
      } catch (err) {
        dispatch({ type: "USER_ERROR", payload: err.response?.data });
      }
    }
    fetchUser();
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
