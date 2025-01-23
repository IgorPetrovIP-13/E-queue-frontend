export interface IFormValues {
  organization_logo: string;
  organization_type_id: string | undefined;
  organization_title: string;
  desired_connection_type_id: string | undefined;
  desired_connection: string;
  organization_description: string;
  organization_website: string;
  attachments: string[];
}

export const initialValues: IFormValues = {
  organization_logo: "",
  organization_type_id: undefined,
  organization_title: "",
  desired_connection_type_id: undefined,
  desired_connection: "",
  organization_description: "",
  organization_website: "",
  attachments: []
};
