// app/create_post/layout.tsx

export default function CreatePostLayout({
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