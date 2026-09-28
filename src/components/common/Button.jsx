// The three looks a button can have. Anything bigger or bolder than this
// would fight the rest of the page.
//
// Cobalt is reserved for state — active nav, selected chips, progress — so the
// only filled button on a page is the primary action, and it is ink.
const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-accent',
  outline: 'border border-rule-strong text-ink hover:border-ink',
};

const SIZES = {
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
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
