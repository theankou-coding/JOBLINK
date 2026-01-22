// app/save_post/layout.tsx

export default function savePostLayout({
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
