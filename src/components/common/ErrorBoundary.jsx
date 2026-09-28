import { Component } from 'react';
import { Link } from 'react-router-dom';

// Catches render crashes anywhere below it so one broken component
// never takes down the whole app.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg border border-rule px-6 py-20 text-center">
          <p className="label">Something broke</p>
          <h1 className="display mt-4 text-3xl text-ink">This page fell over.</h1>
          <p className="mt-3 text-[15px] text-ink-2">The rest of the catalogue is fine.</p>
          <Link
            to="/"
            className="mt-8 inline-block bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Back to the front
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
