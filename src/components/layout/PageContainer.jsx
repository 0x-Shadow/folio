const PageContainer = ({ children, className = '' }) => (
  <div className={`mx-auto max-w-[1400px] px-5 sm:px-8 py-12 sm:py-16 ${className}`}>
    {children}
  </div>
);

export default PageContainer;
