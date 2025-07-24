import type { ButtonHTMLAttributes, ReactNode } from "react";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
};

const LoadingButton = ({
  isLoading = false,
  children = "Sign In",
  className = "",
  disabled,
  ...rest
}: LoadingButtonProps) => {
  const baseClasses =
    "w-full bg-orange-600 text-white py-3 px-4 rounded-xl hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-medium";
  const disabledClasses =
    isLoading || disabled ? " opacity-50 cursor-not-allowed" : "";

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseClasses}${disabledClasses} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
