import Fallback from "../../components/common/Fallback";
import PostSection from "../../components/mentoring/post/PostSection";

export default function Post() {
  return (
    <Fallback errorMessage="Failed to load mentoring page">
      <PostSection />
    </Fallback>
  );
}
