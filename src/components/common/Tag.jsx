import { CATEGORY, ROLE } from "../account/constants/TAGLIST";

const Tag = ({ children, ...props }) => {
  const tagList = [
    ...CATEGORY.map((item) => ({ ...item, type: "category" })),
    ...ROLE.map((item) => ({ ...item, type: "role" })),
  ];

  const tagInfo = tagList.find(
    (item) => item.category === children || item.role === children
  );

  const tagStyle = `${
    tagInfo?.style || "bg-gray-100"
  } py-1 px-2 text-xs rounded-xl border-2 ${
    children.includes("MENT") ? "" : "border-[#0000]"
  }`;
  return (
    <span className={tagStyle} {...props}>
      {children}
    </span>
  );
};

export default Tag;
