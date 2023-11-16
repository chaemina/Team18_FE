const ChannelListItem = ({ data }) => {
  const { imageUrl, name, memberCount, data: detail } = data;
  return (
    <div className="flex gap-12 px-2 py-3">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="channel image"
          className="w-28 h-28 rounded-2xl"
        />
      ) : (
        <div className="w-28 h-28 bg-gray-200 rounded-2xl"></div>
      )}
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">{name}</span>
        <span className="text-gray-400 text-xs">{memberCount} people</span>
        <span className="text-gray-700 text-sm text-ellipsis">
          {detail?.content ? detail.content : ""}
        </span>
      </div>
    </div>
  );
};
export default ChannelListItem;
