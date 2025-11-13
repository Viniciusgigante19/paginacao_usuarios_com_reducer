// userListApi.ts
import axios from "axios";
import { ListApi, UserModel } from "@app/js/app.types";

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

export default async function userListApi(
  limit = 10,
  orderBy = "id,desc"
): Promise<ApiResponse<ListApi<UserModel>>> {
  try {
    const { data } = await axios.get<ListApi<UserModel>>(
      "http://localhost:8080/api/users",
      { params: { limit, orderBy } }
    );

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}
