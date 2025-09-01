export default function NotFoundView() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      fontFamily: "Montserrat, sans-serif",
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#2c3e50" }}>
        404
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#555" }}>
        Página no encontrada
      </p>
    </div>
  );
}