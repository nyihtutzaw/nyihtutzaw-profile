const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />
);

export default Skeleton;
