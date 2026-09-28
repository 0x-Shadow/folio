const VARIANTS = {
  default: 'border border-rule text-ink-2',
  accent: 'border border-accent text-accent bg-accent-soft',
  quiet: 'border border-transparent text-ink-3',
};

// Printed tags, not chat bubbles: a hairline box, letterspaced, square.
const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={`inline-flex items-center px-2 py-[3px] text-[10.5px] font-medium uppercase tracking-[0.14em] ${VARIANTS[variant]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
