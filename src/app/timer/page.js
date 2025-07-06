import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Timer from "@/components/timer/Timer";
import PlayerCard from "@/components/layout/PlayerCard";

export default function TimerPage() {
  return (
    <ProtectedRoute>
      <PlayerCard/>
      <Timer/>
    </ProtectedRoute>
  )
}