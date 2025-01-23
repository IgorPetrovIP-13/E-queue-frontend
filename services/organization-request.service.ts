import { axiosWithCredentialsInstance } from "@/common/axios/interceptors";
import {
  ICreateOrganizationRequestReq,
  ICreateOrganizationRequestRes,
  IGetMyOrganizationRequestRes
} from "@/types/services/organization-request.types";

class OrganizationRequestService {
  private readonly BASE_URL = "/organization-requests";

  async create(data: ICreateOrganizationRequestReq) {
    const response =
      await axiosWithCredentialsInstance.post<ICreateOrganizationRequestRes>(
        `${this.BASE_URL}`,
        data
      );

    return response.data;
  }

  async getMyRequests() {
    const response = await axiosWithCredentialsInstance.get<
      IGetMyOrganizationRequestRes[]
    >(`${this.BASE_URL}/my-requests`);

    return response.data;
  }
}

export const organizationRequestService = new OrganizationRequestService();
