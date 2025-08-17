import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react"; // install: npm i lucide-react

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const variantClasses = {
    filled:
      "bg-gray-100 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400",
    outlined:
      "bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400",
    ghost:
      "bg-transparent border-b border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400",
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={passwordToggle && !showPassword ? "password" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg shadow-sm outline-none transition-all duration-200 
            ${sizeClasses[size]} 
            ${variantClasses[variant]} 
            ${disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""}
            ${invalid ? "border-red-500 focus:border-red-500 focus:ring-red-400" : ""}
          `}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            className="absolute right-9 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => onChange({ target: { value: "" } })}
          >
            <X size={18} />
          </button>
        )}

        {/* Password toggle */}
        {passwordToggle && (
          <button
            type="button"
            className="absolute right-2 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Helper or error text */}
      {helperText && !invalid && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}
