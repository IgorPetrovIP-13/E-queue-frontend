import { removeAccessToken, setAccessToken } from "./auth-token.service";

import {
  axiosNoCredentialsInstance,
  axiosWithCredentialsInstance
} from "@/common/axios/interceptors";
import {
  IRefreshRes,
  ISignInReq,
  ISignInRes,
  ISignUpReq,
  ISignUpRes
} from "@/types/services/auth.types";

class AuthService {
  private readonly BASE_URL = "/auth";

  async signIn(data: ISignInReq) {
    const response = await axiosNoCredentialsInstance.put<ISignInRes>(
      `${this.BASE_URL}/signin`,
      data
    );

    console.log(response.data.accessToken);

    setAccessToken(response.data.accessToken);

    return response.data.user;
  }

  async signUp(data: ISignUpReq) {
    const response = await axiosNoCredentialsInstance.post<ISignUpRes>(
      `${this.BASE_URL}/signup`,
      data
    );

    setAccessToken(response.data.accessToken);

    return response.data.user;
  }

  async refresh() {
    const response = await axiosNoCredentialsInstance.put<IRefreshRes>(
      `${this.BASE_URL}/refresh`
    );

    setAccessToken(response.data.accessToken);
  }

  async logout() {
    await axiosWithCredentialsInstance.put<void>(`${this.BASE_URL}/logout`);
    removeAccessToken();
  }
}

export const authService = new AuthService();
