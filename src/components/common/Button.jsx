const VARIANTS = {
  primary: 'bg-accent text-on-accent hover:bg-accent-ink',
  outline: 'border border-rule-strong text-ink hover:border-ink',
  quiet: 'text-ink-2 hover:text-ink',
  danger: 'bg-red-700 text-white hover:bg-red-800',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-[13px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
