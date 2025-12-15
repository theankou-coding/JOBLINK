import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Job Categories",
  description: "Sign in to access the admin dashboard",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
