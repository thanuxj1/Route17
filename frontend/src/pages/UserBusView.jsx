"use client"

import { useEffect, useState } from "react"
import { getBusTimes } from "../../api/busApi"
import CommentSection from "./CommentSection"
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

  useEffect(() => {
    fetchBusTimes()
  }, [])

  const fetchBusTimes = async () => {
    const data = await getBusTimes()
    setBusTimes(data)
  }

  const toggleTab = (id) => {
    setOpenTab(openTab === id ? null : id)
  }

  return (
    <div className="user-bus-view">
      {/* Header Section */}
      <div className="bus-header">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="header-title">SLIIT CAMPUS TRANSPORT</h1>
            <div className="header-subtitle">DEPARTURES • BUS SCHEDULE</div>
          </div>
        </div>
      </div>

      {/* Main Display Board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="schedule-board">
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
                <button
                  onClick={() => toggleTab(bus.id)}
                  className="bus-item w-full text-left px-6 py-4"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <span className="bus-number">{bus.bus_number}</span>
                    </div>
                    <div className="col-span-4">
                      <span className="bus-destination">
                        {bus.destination.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="bus-time">
                        {formatTime24to12(bus.arrival_time)}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="bus-status">ON TIME</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="expand-icon">
                        {openTab === bus.id ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Render CommentSection only if this tab is open */}
                {openTab === bus.id && (
                  <div className="comments-section px-6 py-6">
                    <CommentSection busId={bus.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer">
          <div className="footer-border">
            REAL-TIME DEPARTURE INFORMATION • SLIIT CAMPUS TRANSPORT SYSTEM
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBusView