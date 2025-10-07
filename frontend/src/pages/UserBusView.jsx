"use client"

import { useEffect, useState } from "react"
import { getBusTimes } from "../../api/busApi"
import CommentSection from "./CommentSection"
import LoadingSpinner from "../../components/LoadingSpinner"
import { MapPin, ChevronDown } from "lucide-react"

function formatTime24to12(time24) {
  if (!time24) return ""
  const [hourStr, minute] = time24.split(":")
  let hour = Number.parseInt(hourStr)
  const ampm = hour >= 12 ? "PM" : "AM"
  hour = hour % 12
  if (hour === 0) hour = 12
  return `${hour}:${minute} ${ampm}`
}

function UserBusView() {
  const [busTimes, setBusTimes] = useState([])
  const [openTab, setOpenTab] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBusTimes()
  }, [])

  const fetchBusTimes = async () => {
    try {
      const data = await getBusTimes()
      setBusTimes(data)
    } catch (err) {
      console.error("Failed to fetch bus times:", err)
    } finally {
      setLoading(false)
    }
  }

  const toggleTab = (id) => {
    setOpenTab(openTab === id ? null : id)
  }

  if (loading) {
    return <LoadingSpinner fullPage />
  }

  const nextBus = busTimes.find((bus) => !bus.checked)

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 pointer-events-none" />

      <div className="relative z-10 lg:flex lg:min-h-screen">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[45%] lg:flex lg:items-center lg:justify-center lg:border-r lg:border-zinc-800/50 px-6 py-12 lg:py-0">
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 lg:mb-8 relative">
              {/* Flowing flame glows around the 17 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top flame */}
                <div
                  className="absolute -top-8 sm:-top-12 lg:-top-16 left-1/2 -translate-x-1/2 w-32 sm:w-48 lg:w-64 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-orange-500/40 via-orange-600/20 to-transparent blur-2xl sm:blur-3xl"
                  style={{ animation: "flame-top 3s ease-in-out infinite" }}
                />
                {/* Right flame */}
                <div
                  className="absolute top-1/2 -right-8 sm:-right-12 lg:-right-16 -translate-y-1/2 w-16 sm:w-24 lg:w-32 h-32 sm:h-48 lg:h-64 bg-gradient-to-l from-orange-500/40 via-red-600/20 to-transparent blur-2xl sm:blur-3xl"
                  style={{ animation: "flame-right 2.5s ease-in-out infinite" }}
                />
                {/* Bottom flame */}
                <div
                  className="absolute -bottom-8 sm:-bottom-12 lg:-bottom-16 left-1/2 -translate-x-1/2 w-32 sm:w-48 lg:w-64 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-orange-500/40 via-yellow-600/20 to-transparent blur-2xl sm:blur-3xl"
                  style={{ animation: "flame-bottom 2.8s ease-in-out infinite" }}
                />
                {/* Left flame */}
                <div
                  className="absolute top-1/2 -left-8 sm:-left-12 lg:-left-16 -translate-y-1/2 w-16 sm:w-24 lg:w-32 h-32 sm:h-48 lg:h-64 bg-gradient-to-r from-orange-500/40 via-orange-600/20 to-transparent blur-2xl sm:blur-3xl"
                  style={{ animation: "flame-left 3.2s ease-in-out infinite" }}
                />
                {/* Additional flickering flames */}
                <div
                  className="absolute -top-4 sm:-top-6 lg:-top-8 right-1/4 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br from-orange-400/30 to-transparent blur-xl sm:blur-2xl"
                  style={{ animation: "flicker 1.5s ease-in-out infinite" }}
                />
                <div
                  className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-1/4 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-tr from-red-500/30 to-transparent blur-xl sm:blur-2xl"
                  style={{ animation: "flicker 2s ease-in-out infinite 0.5s" }}
                />
              </div>

              {/* Orbiting particles around the 17 */}
              <div className="absolute inset-0 -m-16 sm:-m-24 lg:-m-32 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full opacity-60"
                    style={{
                      top: "50%",
                      left: "50%",
                      animation: `orbit ${8 + i * 2}s linear infinite`,
                      animationDelay: `${i * -1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Main 17 - static, no float animation */}
              <div
                className="text-[120px] sm:text-[160px] lg:text-[280px] font-black leading-none tracking-tighter relative"
                style={{
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
                <span className="relative text-orange-500">17</span>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h1
                className="text-xl sm:text-2xl lg:text-4xl font-light text-white tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Route <span className="font-semibold">17</span> Schedule
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm lg:text-base text-orange-500/60 uppercase tracking-[0.15em] font-light">
                <span className="whitespace-nowrap">Departures</span>
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">SLIIT Bus Stop</span>
              </div>
              {nextBus && (
                <div className="hidden lg:block mt-10 pt-10 border-t border-zinc-800/30">
                  <p className="text-xs text-orange-500/50 uppercase tracking-[0.2em] font-light mb-3">
                    Next Departure
                  </p>
                  <p className="text-5xl font-light text-white tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {formatTime24to12(nextBus.arrival_time)}
                  </p>
                  <p className="text-base text-white/40 mt-2 font-light">Bus {nextBus.bus_number}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="lg:flex-1 lg:overflow-y-auto px-4 sm:px-6 pb-12 lg:px-12 lg:py-16">
          <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {busTimes.map((bus) => (
              <div key={bus.id} className="lg:h-fit">
                <button
                  onClick={() => toggleTab(bus.id)}
                  className={`w-full text-left transition-all duration-300 ${
                    bus.checked ? "opacity-40" : "hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <div
                    className={`relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-7 border transition-all duration-300 ${
                      bus.checked
                        ? "border-zinc-800/50"
                        : openTab === bus.id
                          ? "border-orange-500/60 shadow-[0_0_40px_rgba(251,146,60,0.15),inset_0_0_20px_rgba(251,146,60,0.05)]"
                          : "border-zinc-800/50 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(251,146,60,0.1)]"
                    }`}
                  >
                    {!bus.checked && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent rounded-t-2xl" />
                    )}

                    <div className="absolute top-4 right-4">
                      <ChevronDown
                        className={`w-4 h-4 transition-all duration-300 ${
                          openTab === bus.id ? "rotate-180" : ""
                        } ${bus.checked ? "text-zinc-700" : "text-orange-500/40 hover:text-orange-500/60"}`}
                      />
                    </div>

                    <div className="flex items-start justify-between mb-4 gap-4 pr-8">
                      <span
                        className={`text-4xl sm:text-5xl font-black tracking-tight ${
                          bus.checked ? "text-zinc-600" : "text-orange-500"
                        }`}
                      >
                        {bus.bus_number}
                      </span>
                      <div className="text-right">
                        <span
                          className={`text-2xl sm:text-3xl font-light tracking-tight block ${
                            bus.checked ? "text-zinc-700" : "text-white"
                          }`}
                        >
                          {formatTime24to12(bus.arrival_time).split(" ")[0]}
                        </span>
                        <span className={`text-sm font-light ${bus.checked ? "text-zinc-700" : "text-white/60"}`}>
                          {formatTime24to12(bus.arrival_time).split(" ")[1]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <MapPin
                          className={`w-4 h-4 flex-shrink-0 ${bus.checked ? "text-zinc-700" : "text-orange-500/60"}`}
                        />
                        <span
                          className={`text-sm sm:text-base font-medium truncate ${
                            bus.checked ? "text-zinc-600" : "text-white/80"
                          }`}
                        >
                          {bus.destination}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 ${
                          bus.checked
                            ? "text-zinc-700 bg-zinc-800/30"
                            : "text-orange-500 bg-orange-500/10 border border-orange-500/20"
                        }`}
                      >
                        {bus.status}
                      </span>
                    </div>
                  </div>
                </button>

                {openTab === bus.id && (
                  <div className="mt-3 px-4 sm:px-5 py-4 sm:py-5 bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800/50">
                    <CommentSection busId={bus.id} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <footer className="mt-20 lg:mt-28 pt-12 border-t border-zinc-800/30">
            <div className="text-center space-y-4">
              <p className="text-sm text-orange-500/50 uppercase tracking-[0.2em] font-light">
                Real-Time Departure Information • SLIIT Campus Transport
              </p>
              <p className="text-xs text-white/15 font-light">
                © {new Date().getFullYear()} Route 17 Bus Schedule System
              </p>
            </div>
          </footer>
        </main>
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
            transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @media (min-width: 640px) {
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
        }
        
        @media (min-width: 1024px) {
          @keyframes orbit {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
              opacity: 0;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default UserBusView
