import { useEffect, useState } from "react";
import { UserModel } from "@app/js/app.types";
import userList from "@app/js/services/api/userListApi";
import listOfUsersComponent from "@app/js/React/components/listOfUsersComponent/listOfUsersComponent";

type UserListResponse = 
  | { error: string }
  | { rows: UserModel[] };

export default function Users() {
  const [user, setUser] = useState<UserModel[] | "error">();

  const listUsers = async () => {
    const resp = await userList(10) as UserListResponse;
    if ("error" in resp) return setUser("error");
    setUser(resp.rows);
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <>
      
    </>
  );
}
