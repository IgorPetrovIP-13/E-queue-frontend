import { RoutesValues } from "@/common/enums/routes-values";

export function getRouteValue (pathname: string) {
	return RoutesValues[pathname];
}