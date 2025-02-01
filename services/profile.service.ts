import { axiosWithCredentialsInstance } from "@/common/axios/interceptors";
import { IGetProfileRes } from "@/types/services/profile.types";

class ProfileService {
  private readonly BASE_URL = "/profile";

  async getProfile() {
    const response = await axiosWithCredentialsInstance.get<IGetProfileRes>(
      `${this.BASE_URL}`
    );

    return response.data;
  }
}

export const profileService = new ProfileService();
