// A ruled box — used for panels that genuinely need an edge (filters, forms).
// Most surfaces in Folio are separated by hairlines instead.
const Card = ({ children, className = '', hover = false, onClick }) => (
  <div
    onClick={onClick}
    className={`border border-rule bg-raised p-6 ${
      hover ? 'transition-colors duration-200 hover:border-rule-strong' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
