export default function Skeleton({ className = "" }) {
  return (
    <div className={`bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse ${className}`} />
  );
}
