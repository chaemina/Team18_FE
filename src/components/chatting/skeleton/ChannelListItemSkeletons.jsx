import ChannelListItemSkeleton from "./ChannelListItemSkeleton";

export default function ChannelListItemSkeletons() {
  return (
    <div>
      {[1, 2, 3].map((index) => (
        <ChannelListItemSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
