// A short, left-aligned message with one way forward. Used wherever a list can
// come up empty: search, shelves, a book with no reviews, an unknown title.
const EmptyState = ({ title, children, action }) => (
  <div className="border border-rule bg-raised px-6 py-10">
    <p className="font-display text-xl text-ink">{title}</p>
    {children && <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-2">{children}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
