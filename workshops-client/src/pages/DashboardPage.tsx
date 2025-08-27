import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card";

export function DashboardPage() {
  const { user, fetchMe, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      fetchMe().catch(() => {});
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Panel de usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <p>
                <span className="font-semibold">ID:</span> {user.id}
              </p>
              <p>
                <span className="font-semibold">Nombre:</span> {user.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <Button
                className="w-full mt-4"
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <p className="text-gray-500">Cargando usuario...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
