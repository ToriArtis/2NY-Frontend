import React from 'react';
import ErrorPage from '../views/ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage statusCode={500} message={this.state.error.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;