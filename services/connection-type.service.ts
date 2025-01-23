import { axiosWithCredentialsInstance } from "@/common/axios/interceptors";
import { IAutocompleteData } from "@/types/generic/autocomplete-data.types";

class ConnectionTypeService {
  private readonly BASE_URL = "/connection-types";

  async getAutocompleteData() {
    const response = await axiosWithCredentialsInstance.get<
      IAutocompleteData[]
    >(`${this.BASE_URL}/autocomplete-data`);

    return response.data;
  }
}

export const connectionTypeService = new ConnectionTypeService();
