"use client"

export default function LoadingSpinner({ fullPage = false }) {
  const containerStyle = fullPage
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }
    : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        {/* Main 17 Logo with rotating ring */}
        <div style={{ position: "relative" }}>
          {/* Outer rotating ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "96px",
              height: "96px",
              border: "2px solid transparent",
              borderTopColor: "#f97316",
              borderRightColor: "#f97316",
              borderRadius: "50%",
              animation: "spin 2s linear infinite",
            }}
          ></div>

          {/* Inner rotating ring - opposite direction */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              width: "80px",
              height: "80px",
              border: "2px solid transparent",
              borderBottomColor: "#eab308",
              borderLeftColor: "#eab308",
              borderRadius: "50%",
              animation: "spin 1.5s linear infinite reverse",
            }}
          ></div>

          {/* Central 17 */}
          <div
            style={{
              width: "96px",
              height: "96px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #f97316, #eab308)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              17
            </span>
          </div>
        </div>

        {/* Loading text */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#f97316", fontSize: "1.125rem", fontWeight: "500", marginBottom: "0.5rem" }}>
            SLIIT Transport
          </p>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Loading bus information...</p>
        </div>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#f97316",
              borderRadius: "50%",
              animation: "bounce 1s ease-in-out infinite",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#f97316",
              borderRadius: "50%",
              animation: "bounce 1s ease-in-out infinite",
              animationDelay: "0.1s",
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#f97316",
              borderRadius: "50%",
              animation: "bounce 1s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          ></div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "192px",
            height: "4px",
            backgroundColor: "#374151",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "9999px",
              background: "linear-gradient(90deg, #f97316, #eab308)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  )
}
