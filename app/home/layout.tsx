// app/home/layout.tsx

export default function homeLayout({
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
