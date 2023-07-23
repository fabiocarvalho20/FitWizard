import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { signOut } from "next-auth/react";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ marginRight: "1.5rem" }}>
          <Image width={150} height={50} alt="logo" src="/logoo.png" />
        </Link>
        <div>
          <Link
            href="/"
            style={{
              marginRight: "0.75rem",
              color: "white",
            }}
          >
            dieta
          </Link>
          <Link
            href="/form"
            style={{
              color: "white",
            }}
          >
            form
          </Link>
        </div>
      </div>
      <p>{user.email}</p>
      <Avatar
        id="profileImage"
        onClick={(e: any) => {
          setAnchorEl(e.currentTarget);
        }}
        alt={user.name || ""}
        src={user.image || ""}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={anchorEl ?? false}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => signOut()}>log out</MenuItem>
      </Menu>
    </div>
  );
}
