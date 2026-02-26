import React, { useEffect } from "react";

type ToastProps = {
  title: string;
  message: string;
  headerColor?: string;
  duration?: number; // milliseconds
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
  title,
  message,
  headerColor = "#3498db",
  duration = 3000,
  onClose
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.header, backgroundColor: headerColor }}>
        {title}
      </div>
      <div style={styles.body}>
        {message}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "280px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    overflow: "hidden",
    backgroundColor: "#fff",
    animation: "slideIn 0.3s ease-out"
  },
  header: {
    padding: "10px",
    fontWeight: "bold",
    color: "#fff"
  },
  body: {
    padding: "12px",
    fontSize: "14px",
    color: "#333"
  }
};

export default Toast;