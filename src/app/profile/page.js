import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileForm from "@/components/profile/ProfileForm";

export default function MyProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileForm/>
        </ProtectedRoute>
    )
}