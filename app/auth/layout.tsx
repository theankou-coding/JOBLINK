// app/auth/layout.tsx

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="features-container">{children}</main>
    </>
  );
}
