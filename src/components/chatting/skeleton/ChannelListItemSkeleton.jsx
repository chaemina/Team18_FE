const ChannelListItemSkeleton = () => {
  return (
    <div className="flex gap-12 px-2 py-3">
      <div className="w-28 h-28 bg-gray-200 rounded-2xl"></div>
      <div className="flex flex-col gap-2">
        <span className="w-40 h-6 bg-gray-200 rounded"></span>
        <span className="w-20 h-4 bg-gray-200 rounded"></span>
        <span className="w-40 h-4 bg-gray-200 rounded"></span>
      </div>
    </div>
  );
};

export default ChannelListItemSkeleton;
