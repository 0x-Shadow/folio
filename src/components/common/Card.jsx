const Card = ({ children, className = '', hover = false, onClick }) => {
    const hoverEffect = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '';

    return (
      <div
        className={`bg-white rounded-lg shadow-sm border border-cream-200 overflow-hidden ${hoverEffect} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  export default Card;
