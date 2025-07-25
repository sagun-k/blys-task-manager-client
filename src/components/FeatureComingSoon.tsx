interface FeatureComingSoonProps {
  title?: string;
  description?: string;
}

const InfoIcon = () => (
  <svg
    className="w-6 h-6 text-yellow-500 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
    />
  </svg>
);

export const FeatureComingSoon = ({
  title = "Feature in Progress",
  description = "We are currently working on these features.",
}: FeatureComingSoonProps) => {
  return (
    <div className="flex items-start gap-3 p-4 border rounded-lg bg-yellow-50 border-yellow-200 text-yellow-900">
      <InfoIcon />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};
