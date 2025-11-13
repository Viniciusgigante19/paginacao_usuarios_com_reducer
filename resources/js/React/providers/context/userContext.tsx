import { createContext, useState, useEffect, ReactNode } from "react";
import userListApi, { ApiResponse } from "@app/js/services/api/userListApi";
import { UserModel, ListApi } from "@app/js/app.types";


type UserContextType = {
  users: UserModel[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[] | undefined>>;
  loading: boolean;
  error: string | null;
};


export const ListUserContext = createContext<UserContextType | undefined>(undefined);


export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserModel[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      const response: ApiResponse<ListApi<UserModel>> = await userListApi();

      if (response.success) {
        
        setUsers(response.data.rows);
      } else {
        setError(response.error);
      }

      setLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <ListUserContext.Provider value={{ users, setUsers, loading, error }}>
      {children}
    </ListUserContext.Provider>
  );
}
