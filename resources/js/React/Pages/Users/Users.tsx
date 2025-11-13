import { useEffect, useState } from "react";
import { UserModel } from "@app/js/app.types";
import ListOfUsersComponent from "@app/js/React/components/listOfUsersComponent/listOfUsersComponent";
import { UserProvider } from "../../providers/context/userContext";

type UserListResponse = 
  | { error: string }
  | { rows: UserModel[] };

export default function Users() {


  useEffect(() => {

  }, []);

  return (
    <>
      <UserProvider>
          <ListOfUsersComponent/>
      </UserProvider>
    </>
  );
}
