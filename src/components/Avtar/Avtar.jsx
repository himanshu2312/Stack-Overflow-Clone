import React from "react";

export default function Avtar({ children, backgroundColor, px, py, color, borderRadius, cursor, fontSize }) {
  const avt_style = {
    padding: `${py} ${px}`,
    borderRadius,
    backgroundColor,
    color: color || "black",
    fontSize,
    textAlign: "center",
    cursor: cursor || "null",
    textDecoration: "none"
  };
  return <div style={avt_style}>{children}</div>;
}
