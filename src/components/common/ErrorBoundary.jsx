import { Component } from 'react';
import { Link } from 'react-router-dom';

// Catches render crashes anywhere below it so one broken
// component never takes down the whole app.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-3">
            Something went wrong
          </h1>
          <p className="text-navy-600 mb-8">
            This page hit a snag. Try going back home.
          </p>
          <Link
            to="/"
            className="inline-block bg-navy-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-900 transition"
          >
            Back to home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
