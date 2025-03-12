export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="fixed top-0 left-0 overflow-hidden" style={{ height: '600px', width: '1600px' }}>
        {children}
      </div>
    </div>
  );
}
