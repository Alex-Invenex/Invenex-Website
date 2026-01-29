// CSS-based page transitions for better performance
// Avoids loading framer-motion in critical rendering path

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter motion-reduce:animate-none">
      {children}
    </div>
  );
}
