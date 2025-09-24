"use client";

import { JSX } from "react";
import { signOut } from "next-auth/react";
import ConfirmationModal from "../global/ConfirmationModal";

export default function LogoutButton(): JSX.Element {
  return (
    <ConfirmationModal
      name="Déconnexion"
      color="red"
      title="Souhaitez-vous vraiment vous déconnecter ?"
      confirmText="Déconnexion"
      cancelText="Annuler"
      onConfirm={() => signOut({ callbackUrl: "/auth" })}
      onCancel={() => {}}
    />
  );
}
