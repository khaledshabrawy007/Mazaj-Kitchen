import React from 'react';

/**
 * ErrorBoundary — catches any runtime React crash and shows a
 * recovery screen instead of a blank white page.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[Mazaj Kitchen] App crashed:', error, info);
  }

  handleClearAndReload = () => {
    // Wipe potentially corrupt localStorage then reload
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFF8F3',
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              padding: '2.5rem',
              maxWidth: '420px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⚠️</div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#1A1A1A',
                marginBottom: '0.5rem',
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#6B7280',
                fontWeight: 600,
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              The app encountered an error. This is usually caused by outdated
              cached data. Clearing the cache and reloading will fix it.
            </p>

            <button
              onClick={this.handleClearAndReload}
              style={{
                width: '100%',
                background: '#E8572A',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginBottom: '0.75rem',
              }}
            >
              🔄 Clear Cache &amp; Reload
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '0.75rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Just Reload
            </button>

            {this.state.error && (
              <details
                style={{
                  marginTop: '1.25rem',
                  textAlign: 'left',
                  fontSize: '0.7rem',
                  color: '#9CA3AF',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 700 }}>
                  Error details
                </summary>
                <pre
                  style={{
                    marginTop: '0.5rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    background: '#F9FAFB',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
