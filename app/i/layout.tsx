import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";

import Aside from "@/components/i/Aside";
import Navbar from "@/components/i/Navbar";
import { profileService } from "@/services/profile.service";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile()
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen md:min-h-full w-full flex flex-col md:flex-row">
        <Navbar />
        <Aside />
        <div className="w-full flex flex-1 flex-col p-4">
          <main className="flex-1 h-screen rounded-medium border-small border-divider p-2 md:p-4">
            {children}
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}
