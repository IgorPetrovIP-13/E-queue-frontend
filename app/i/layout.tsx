import Aside from "@/components/i/Aside";
import Navbar from "@/components/i/Navbar";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:min-h-full w-full flex flex-col md:flex-row">
      <Navbar />
      <Aside />
      <div className="w-full flex flex-1 flex-col p-4">
        <main className="flex-1 h-screen rounded-medium md:border-small border-divider p-0 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
