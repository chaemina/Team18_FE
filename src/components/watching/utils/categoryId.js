import { CATEGORY } from "../../account/constants/TAGLIST";

export const nameToCategoryId = (categoryName) => {
  const category = CATEGORY.find((c) => c.category === categoryName);
  return category ? category.id : undefined;
};

export const categoryIdToName = (categoryid) => {
  const category = CATEGORY.find((c) => c.id === categoryid);

  return category ? category.category : undefined;
};
