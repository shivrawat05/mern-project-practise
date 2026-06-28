import UnaAuth from "../../public/UnAuth.jpg";

const UnauthPage = () => {
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
        src={UnaAuth}
        alt="UnaAuth"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default UnauthPage;
