import { z } from "zod";

import { long, short } from "@/common/constants/validation-errors.constants";
import {
  zodFileLinksArray,
  zodObjectId,
  zodOptionalUrl
} from "@/common/constants/zod.constants";

export const createOrganizationSchema = z.object({
  organization_logo: zodOptionalUrl,
  organization_type_id: zodObjectId,
  organization_title: z.string().min(3, short(3)).max(255, long(255)),
  desired_connection_type_id: zodObjectId,
  desired_connection: z.string().min(5, short(5)).max(255, long(255)),
  organization_description: z.string().min(3, short(3)).max(1000, long(1000)),
  organization_website: zodOptionalUrl,
  attachments: zodFileLinksArray
});
