const Badge = ({ children, variant = 'default', size = 'md' }) => {
    const variants = {
      default: 'bg-cream-100 text-navy-700',
      primary: 'bg-navy-100 text-navy-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-red-100 text-red-800',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    };

    return (
      <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
        {children}
      </span>
    );
  };

  export default Badge;
