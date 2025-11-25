export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50",
    red: "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100",
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
    green: "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100",
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
