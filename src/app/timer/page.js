import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Timer from "@/components/timer/Timer";

export default function TimerPage() {
  return (
    <ProtectedRoute>
      <Timer/>
    </ProtectedRoute>
  )
}