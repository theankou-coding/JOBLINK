// app/for_you/layout.tsx

export default function forYouLayout({
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
