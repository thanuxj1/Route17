"use client"

export default function LoadingSpinner({ fullPage = false }) {
  const containerStyle = fullPage
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
      {/* Background gradient matching UserBusView */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(to bottom right, #09090b, #000000, #09090b)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Main 17 Logo with flame effects */}
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* Flowing flame glows around the 17 - matching UserBusView */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {/* Top flame */}
            <div
              style={{
                position: "absolute",
                top: "-48px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "192px",
                height: "96px",
                background: "linear-gradient(to bottom, rgba(249, 115, 22, 0.4), rgba(249, 115, 22, 0.2), transparent)",
                filter: "blur(48px)",
                animation: "flame-top 3s ease-in-out infinite",
              }}
            />
            {/* Right flame */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "-48px",
                transform: "translateY(-50%)",
                width: "96px",
                height: "192px",
                background: "linear-gradient(to left, rgba(249, 115, 22, 0.4), rgba(220, 38, 38, 0.2), transparent)",
                filter: "blur(48px)",
                animation: "flame-right 2.5s ease-in-out infinite",
              }}
            />
            {/* Bottom flame */}
            <div
              style={{
                position: "absolute",
                bottom: "-48px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "192px",
                height: "96px",
                background: "linear-gradient(to top, rgba(249, 115, 22, 0.4), rgba(234, 179, 8, 0.2), transparent)",
                filter: "blur(48px)",
                animation: "flame-bottom 2.8s ease-in-out infinite",
              }}
            />
            {/* Left flame */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-48px",
                transform: "translateY(-50%)",
                width: "96px",
                height: "192px",
                background: "linear-gradient(to right, rgba(249, 115, 22, 0.4), rgba(249, 115, 22, 0.2), transparent)",
                filter: "blur(48px)",
                animation: "flame-left 3.2s ease-in-out infinite",
              }}
            />
            {/* Additional flickering flames */}
            <div
              style={{
                position: "absolute",
                top: "-24px",
                right: "25%",
                width: "128px",
                height: "128px",
                background: "linear-gradient(to bottom right, rgba(251, 146, 60, 0.3), transparent)",
                filter: "blur(32px)",
                animation: "flicker 1.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "25%",
                width: "128px",
                height: "128px",
                background: "linear-gradient(to top right, rgba(239, 68, 68, 0.3), transparent)",
                filter: "blur(32px)",
                animation: "flicker 2s ease-in-out infinite 0.5s",
              }}
            />
          </div>

          {/* Orbiting particles around the 17 */}
          <div
            style={{
              position: "absolute",
              inset: "-96px",
              pointerEvents: "none",
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#f97316",
                  borderRadius: "50%",
                  opacity: 0.6,
                  top: "50%",
                  left: "50%",
                  animation: `orbit ${8 + i * 2}s linear infinite`,
                  animationDelay: `${i * -1}s`,
                }}
              />
            ))}
          </div>

          {/* Main 17 with 3D text shadow effect */}
          <div
            style={{
              fontSize: "120px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              position: "relative",
              textShadow: `
                0 1px 0 #ea580c,
                0 2px 0 #dc2626,
                0 3px 0 #b91c1c,
                0 4px 0 #991b1b,
                0 5px 0 #7c2d12,
                0 10px 20px rgba(0,0,0,.5),
                0 15px 30px rgba(0,0,0,.3)
              `,
            }}
          >
            <span style={{ color: "#f97316" }}>17</span>
          </div>
        </div>

        {/* Loading text with elegant typography */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "white",
              letterSpacing: "0.05em",
              fontFamily: "Georgia, serif",
              marginBottom: "0.75rem",
            }}
          >
            Route <span style={{ fontWeight: 600 }}>17</span> Schedule
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "rgba(249, 115, 22, 0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 300,
            }}
          >
            <span>Loading Departures</span>
            <span style={{ color: "rgba(249, 115, 22, 0.4)" }}>•</span>
            <span>SLIIT Bus Stop</span>
          </div>
        </div>

        {/* Animated loading dots */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#f97316",
                borderRadius: "50%",
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
                boxShadow: "0 0 10px rgba(249, 115, 22, 0.5)",
              }}
            />
          ))}
        </div>

        {/* Elegant progress indicator */}
        <div
          style={{
            width: "240px",
            height: "2px",
            backgroundColor: "rgba(39, 39, 42, 0.5)",
            borderRadius: "9999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "40%",
              background: "linear-gradient(90deg, transparent, #f97316, #eab308, transparent)",
              borderRadius: "9999px",
              animation: "slide 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Subtle footer text */}
        <p
          style={{
            fontSize: "0.625rem",
            color: "rgba(255, 255, 255, 0.15)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            marginTop: "1rem",
          }}
        >
          Real-Time Departure Information
        </p>
      </div>

      <style jsx>{`
        @keyframes flame-top {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -10px) scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes flame-right {
          0%, 100% {
            transform: translate(0, -50%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(10px, -50%) scale(1.15);
            opacity: 0.5;
          }
        }
        
        @keyframes flame-bottom {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, 10px) scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes flame-left {
          0%, 100% {
            transform: translate(0, -50%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-10px, -50%) scale(1.15);
            opacity: 0.5;
          }
        }
        
        @keyframes flicker {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
        
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(110px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(110px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-8px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(350%);
          }
        }
      `}</style>
    </div>
  )
}
