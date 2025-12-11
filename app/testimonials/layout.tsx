// app/testimonials/layout.tsx

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="features-container">{children}</main>
    </>
  );
}
