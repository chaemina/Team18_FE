import Fallback from "../../components/common/Fallback";
import EditSection from "../../components/mentoring/writeEdit/EditSection";

export default function Edit() {
  return (
    <Fallback errorMessage="Failed to load edit page">
      <EditSection />
    </Fallback>
  );
}
