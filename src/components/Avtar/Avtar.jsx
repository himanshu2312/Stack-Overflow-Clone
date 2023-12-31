import React from "react";

export default function Avtar({ children, backgroundColor, px, py, color, borderRadius, cursor, fontSize }) {
  const avt_style = {
    padding: `${py} ${px}`,
    borderRadius,
    backgroundColor: backgroundColor || "white",
    color: color || "black",
    fontSize,
    textAlign: "center",
    cursor: cursor || "null",
    textDecoration: "none",
    border: "1px solid #f8f9f9",
    margin: "0px"
  };
  return <div style={avt_style}>{children}</div>;
}
