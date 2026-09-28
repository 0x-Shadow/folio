const Badge = ({ children, variant = 'default', size = 'md' }) => {
    const variants = {
      default: 'bg-primary-soft text-muted',
      primary: 'bg-accent-soft text-accent-strong dark:text-accent',
      success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
      warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
      danger: 'bg-red-500/15 text-red-600 dark:text-red-400',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    };

    return (
      <span
        className={`inline-flex items-center rounded-full font-medium backdrop-blur-sm ${variants[variant]} ${sizes[size]}`}
      >
        {children}
      </span>
    );
  };

  export default Badge;
