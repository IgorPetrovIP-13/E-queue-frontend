import {
  Building2,
  Calendar,
  CalendarPlus,
  GitPullRequestArrow,
  House,
  MailPlus,
  NotebookPen,
  UserPen
} from "lucide-react";

import { ROUTES } from "./routes-enum";

type RouteValue = {
  title: string;
  icon: React.ElementType;
};

export const RoutesValues: Record<string, RouteValue> = {
  [ROUTES.PROFILE]: {
    title: "Мій профіль",
    icon: UserPen
  },
  [ROUTES.DASHBOARD]: {
    title: "Дашборд",
    icon: House
  },
  [ROUTES.CREATE_QUEUE]: {
    title: "Нова черга",
    icon: CalendarPlus
  },
  [ROUTES.MY_QUEUES]: {
    title: "Мої черги",
    icon: Calendar
  },
  [ROUTES.CREATE_ORGANIZATION]: {
    title: "Нова організація",
    icon: NotebookPen
  },
  [ROUTES.MY_ORGANIZATIONS]: {
    title: "Мої організації",
    icon: Building2
  },
  [ROUTES.ORGANIZATION_REQUESTS]: {
    title: "Заявки організацій",
    icon: GitPullRequestArrow
  },
	[ROUTES.ORGANIZATION_INVITES]: {
		title: "Запрошення",
		icon: MailPlus
	}
};
