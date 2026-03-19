import React from 'react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-8 flex flex-col items-center text-center space-y-4 error-state">
            <h2 className="text-xl font-bold text-destructive">Something went wrong</h2>
            <p className="text-muted-foreground text-sm">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <GlassButton
              onClick={() => this.setState({ hasError: false })}
              className="mt-4"
            >
              Try Again
            </GlassButton>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
