import { AdminHeader } from "@/components/admin/AdminHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </>
  );
}
