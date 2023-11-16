import Fallback from "../../components/common/Fallback";
import DashboardSection from "../../components/mentoring/dashboard/DashboardSection";

export default function Dashboard() {
  return (
    <Fallback errorMessage="Failed to load dashboard page">
      <DashboardSection />
    </Fallback>
  );
}
