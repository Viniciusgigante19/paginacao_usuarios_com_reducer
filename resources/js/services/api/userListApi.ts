import axios from "axios";
import { ListApi, UserModel } from "@app/js/app.types";

export default async function userListApi(limit = 10, orderBy = "id,desc") {
  try {
    const { data } = await axios.get<ListApi<UserModel>>(
      "http://localhost:8080/api/users",
      {
        params: {
          limit,
          orderBy,
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
}
