const Card = ({ children, className = '', hover = false, onClick }) => {
    const hoverEffect = hover
      ? 'hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)] cursor-pointer'
      : 'shadow-[var(--shadow-sm)]';

    return (
      <div
        className={`group bg-surface rounded-[20px] border border-line overflow-hidden transition-all duration-300 ${hoverEffect} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  export default Card;
