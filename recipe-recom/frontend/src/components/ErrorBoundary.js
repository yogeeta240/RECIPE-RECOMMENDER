import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console (optional, for debugging)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Something Went Wrong</h1>
          <p>We encountered an error while loading the application.</p>
          <p>Error: {this.state.error?.message || 'Unknown error'}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      );
    }
    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;