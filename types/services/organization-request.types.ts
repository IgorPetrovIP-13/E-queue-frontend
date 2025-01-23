export interface ICreateOrganizationRequestReq {
  organization_logo: string | null;
  organization_type_id: string;
  organization_title: string;
  desired_connection_type_id: string;
  desired_connection: string;
  organization_description: string;
  organization_website: string | null;
  attachments: string[];
}

export interface ICreateOrganizationRequestRes
  extends ICreateOrganizationRequestReq {
  _id: string;
  user_id: string;
  status: string;
  admin_id: string | null;
  admin_comments: string[];
  rejection_comment: string | null;
  approval_comment: string | null;
}

export interface IGetMyOrganizationRequestRes
  extends ICreateOrganizationRequestRes {}
