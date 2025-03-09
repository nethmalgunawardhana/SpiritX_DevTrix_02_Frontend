"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children , availableFor }: { children: React.ReactNode , availableFor: string[] }) {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;
  const role = authContext ? authContext.role : null;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (role) {
        console.log(`Role: ${role} available for ${availableFor}` );
      if(!availableFor.includes(role)){
        router.replace("/403");
        }
    }
  }, [role, router]);

  if (!user) return null;

  return <>{children}</>;
}
