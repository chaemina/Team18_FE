import Fallback from "../../components/common/Fallback";
import PostsSection from "../../components/mentoring/posts/PostsSection";

export default function Posts() {
  return (
    <Fallback errorMessage="Failed to load list page">
      <PostsSection />
    </Fallback>
  );
}
