import React, { useEffect, useState, useRef } from "react";
import "./styles/systemlog.css";

export default function SystemLog() {
  const [logs, setLogs] = useState([]);
  const logEndRef = useRef(null);

  // ตั้งค่า global log function
  useEffect(() => {
    window.BMSLog = (msg, level = "info") => {
      const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
      const prefix =
        level === "warn"
          ? "⚠️"
          : level === "error"
          ? "❌"
          : level === "deploy"
          ? "🪖"
          : "•";
      const newLog = `[${time}] ${prefix} ${msg}`;
      setLogs((prev) => [...prev.slice(-49), newLog]); // เก็บสูงสุด 50 บรรทัด
    };

    // แสดงข้อความเริ่มต้น
    window.BMSLog("System operational. Awaiting commands...", "info");

    return () => {
      window.BMSLog = null;
    };
  }, []);

  // Scroll อัตโนมัติเมื่อมี log ใหม่
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="system-log">
      <div className="log-header">System Log</div>
      <div className="log-body">
        {logs.map((line, i) => (
          <div key={i} className="log-line">
            {line}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
