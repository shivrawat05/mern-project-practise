import NotFoundImage from "../../public/404-error.jpg";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "850px",
      }}
    >
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default NotFound;
