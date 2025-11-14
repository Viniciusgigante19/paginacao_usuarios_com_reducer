import { createContext, useReducer, ReactNode, useCallback } from "react";
import userListApi, { ApiResponse } from "@app/js/services/api/userListApi";
import { UserModel, ListApi } from "@app/js/app.types";

// Estado do contexto
type UserState = {
  users: UserModel[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
};

// Ações do reducer
type UserAction =
  | { type: "SET_USERS"; payload: ListApi<UserModel> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PAGE"; payload: number };

// Estado inicial
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 2,
  totalPages: 3,
};

// Reducer
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload.rows,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

// Contexto
type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  fetchUsers: (page?: number) => Promise<void>;
};

export const ListUserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = useCallback(
  async (page: number = state.page) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const limit = 10; 
      const offset = (page - 1) * limit;

      const response: ApiResponse<ListApi<UserModel>> = await userListApi(limit, offset);

      if (response.success) {
        dispatch({ type: "SET_USERS", payload: response.data });
        dispatch({ type: "SET_PAGE", payload: page }); 
      } else {
        dispatch({ type: "SET_ERROR", payload: response.error });
      }
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message || String(err) });
    }
  },
  [state.page]
);


  return (
    <ListUserContext.Provider value={{ state, dispatch, fetchUsers }}>
      {children}
    </ListUserContext.Provider>
  );
}
