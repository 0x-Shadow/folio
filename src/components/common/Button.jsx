const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button',
    className = ''
  }) => {
    const baseStyles =
      'font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]';

    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary-hover shadow-[var(--shadow-sm)]',
      secondary: 'bg-primary-soft text-ink hover:bg-accent-soft',
      outline: 'border border-line-strong text-ink hover:bg-primary-soft',
      ghost: 'text-muted hover:text-ink hover:bg-primary-soft',
      danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-5 py-2 text-base',
      lg: 'px-7 py-3 text-lg'
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  export default Button;
