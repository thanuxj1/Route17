"use client"

import { useEffect, useState } from "react"
import { getBusTimes } from "../../api/busApi"
import CommentSection from "./CommentSection"
import LoadingSpinner from "../../components/LoadingSpinner"
import "./UserBusView.css"

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
      setTimeout(() => setLoading(false), 800)
    }
  }

  const toggleTab = (id) => {
    setOpenTab(openTab === id ? null : id)
  }

  if (loading) {
    return <LoadingSpinner fullPage />
  }

  return (
    <div className="user-bus-view">
      {/* Header Section with Animated Background */}
      <div className="bus-header">
        <div className="header-animation-container">
          <div className="animated-bg-gradient"></div>
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
          <div className="moving-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-2 text-center relative z-10">
          <h1 className="header-title">ROUTE 17 BUS SCHEDULE</h1>
          <div className="header-subtitle">DEPARTURES • FROM SLIIT BUS STOP</div>
        </div>
      </div>

      {/* Main Display Board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Desktop/table layout */}
        <div className="schedule-board show-desktop">
          {/* Column Headers */}
          <div className="column-header">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 column-title">BUS</div>
              <div className="col-span-4 column-title">DESTINATION</div>
              <div className="col-span-3 column-title">DEPARTURE</div>
              <div className="col-span-2 column-title">STATUS</div>
              <div className="col-span-1 column-title">INFO</div>
            </div>
          </div>
          {/* Bus Listings */}
          <div className="divide-y divide-amber-800">
            {busTimes.map((bus) => (
              <div key={bus.id}>
                <button onClick={() => toggleTab(bus.id)} className="bus-item w-full text-left px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <span className="bus-number">{bus.bus_number}</span>
                    </div>
                    <div className="col-span-4">
                      <span className="bus-destination">{bus.destination.toUpperCase()}</span>
                    </div>
                    <div className="col-span-3">
                      <span className="bus-time">{formatTime24to12(bus.arrival_time)}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="bus-status">{bus.status}</span>

                    </div>
                    <div className="col-span-1 text-right">
                      <span className="expand-icon">{openTab === bus.id ? "▲" : "▼"}</span>
                    </div>
                  </div>
                </button>
                {openTab === bus.id && (
                  <div className="comments-section px-6 py-6">
                    <CommentSection busId={bus.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/card layout */}
        <div className="show-mobile">
          {busTimes.map((bus) => (
            <div className="bus-card" key={bus.id}>
              <div className="flex justify-between items-center">
                <div>
                  <div>
                    <strong>Bus:</strong> {bus.bus_number}
                  </div>
                  <div>
                    <strong>Destination:</strong> {bus.destination}
                  </div>
                  <div>
                    <strong>Departure:</strong> {formatTime24to12(bus.arrival_time)}
                  </div>
                  <div>
                    <strong>Status:</strong> {bus.status}

                  </div>
                </div>
                <button
                  onClick={() => toggleTab(bus.id)}
                  className="expand-icon"
                  style={{ fontSize: "1.5rem", background: "none", border: "none" }}
                >
                  {openTab === bus.id ? "▲" : "▼"}
                </button>
              </div>
              {openTab === bus.id && (
                <div className="comments-section mt-2">
                  <CommentSection busId={bus.id} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <footer className="footer">
          <div className="footer-border">REAL-TIME DEPARTURE INFORMATION • SLIIT CAMPUS TRANSPORT SYSTEM</div>
          <div className="footer-legal">
            © {new Date().getFullYear()} Route No 17 SLIIT Campus Bus Schedule System. All rights reserved. Unauthorized
            copying, reproduction, or distribution of this information is strictly prohibited.
          </div>
        </footer>
      </div>
    </div>
  )
}

export default UserBusView