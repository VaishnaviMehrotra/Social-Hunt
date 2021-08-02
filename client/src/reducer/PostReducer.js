const initialState = {
  posts: [],
  post: {},
  comments: [],
  likes:[],
  loading: true,
  error: null,
};

function PostReducer(state, action) {
  switch (action.type) {
    case "POSTS_LOADED":
      return { ...state, posts: action.payload, loading: false };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case "POST_LOADED":
      return { ...state, post: action.payload, loading: false };
    case "POST_UNLOADED":
      return { ...state, post: {}, loading: false };
    case "POSTS_UNLOADED":
      return { ...state, posts: [], loading: false };
    case "POSTS_ERROR":
      return { ...state, error: action.payload };
    case "COMMENTS_LOADED":
      return { ...state, comments: action.payload };
    case "POST_COMMENT":
      return { ...state,
        posts: [...state.posts, action.payload],
        loading: false,
       };
    case "COMMENTS_UNLOADED":
      return { ...state, comments: [] };
    case "POST_LOADING":
      return { ...state, loading: action.payload };
      case "LIKES_LOADED":
        return { ...state, likes: action.payload };
    default:
      return state;
  }
}

export { PostReducer, initialState };