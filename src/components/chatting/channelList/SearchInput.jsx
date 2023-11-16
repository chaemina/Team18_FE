const SearchInput = ({
  onChange,
  value,
  onSubmit,
  placeholder = "Search",
  disabled = false,
  className = "",
}) => {
  return (
    <form
      className={`flex items-center gap-2 px-4 py-3 w-full h-fit min-h-[3rem] bg-white border-solid border-b-2 ${className}`}
      onSubmit={onSubmit}
    >
      <span className="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full outline-none disabled:opacity-30"
      />
    </form>
  );
};

export default SearchInput;
