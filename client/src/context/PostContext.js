import { createContext, useReducer } from "react";
import { initialState, PostReducer } from "../reducer/PostReducer";

const PostContext = createContext(null);

const PostProvider = (props) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  return (
    <PostContext.Provider value={{ postState: state, postDispatch: dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };