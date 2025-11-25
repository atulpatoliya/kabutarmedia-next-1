export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow ${className}`}>
      {children}
    </div>
  );
}
