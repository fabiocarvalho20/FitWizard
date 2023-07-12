import React from "react";
import { signIn } from "next-auth/react";
import { Button, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <div className="content" style={{ backgroundColor: "#41A130" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "whitesmoke", padding: 3 }}
      >
        Você é o que você come. <br />{" "}
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "white",
            color: "#41A130",
            marginRight: "0.75rem",
            fontWeight: "bolder",
          }}
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
        >
          Comece
        </Button>
        a ser uma pessoa melhor.
      </Typography>
    </div>
  );
}
