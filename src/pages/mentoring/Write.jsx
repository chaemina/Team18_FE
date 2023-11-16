import Fallback from "../../components/common/Fallback";
import WriteSection from "../../components/mentoring/writeEdit/WriteSection";

export default function Write() {
  return (
    <Fallback errorMessage="Failed to load write page">
      <WriteSection />
    </Fallback>
  );
}
