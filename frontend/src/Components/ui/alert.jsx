/* eslint-disable react/prop-types */

const alertVariants = {
  default: "bg-gray-100 text-gray-900",
  destructive: "bg-red-50 text-red-900",
  success: "bg-green-50 text-green-900",
  warning: "bg-yellow-50 text-yellow-900",
};

export const Alert = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 ${alertVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = "", ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
};
