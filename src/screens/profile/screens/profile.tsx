import { useAuth } from "@/src/context/auth.context";
import React from "react";
import Profile from "../components/profile";

export default function ProfileScreen() {
  const { logout, user } = useAuth();

  return <Profile user={user} onLogout={logout} />;
}
