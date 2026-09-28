const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    type = 'button',
    className = ''
  }) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-navy-800 text-white hover:bg-navy-900 focus:ring-navy-500',
      secondary: 'bg-cream-200 text-navy-800 hover:bg-cream-300 focus:ring-navy-500',
      outline: 'border-2 border-navy-800 text-navy-800 hover:bg-navy-50 focus:ring-navy-500',
      ghost: 'text-navy-700 hover:bg-navy-50 focus:ring-navy-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
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
