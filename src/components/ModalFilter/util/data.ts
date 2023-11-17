// impory icons from sort features
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { IoTimeOutline, IoTimerOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { BsAppIndicator } from "react-icons/bs";
import { TbProgressCheck } from "react-icons/tb";

// choose data list sort feature
export const listSort = [
  {
    name: "Sort A-Z",
    icon: "BsSortAlphaDown",
  },
  {
    name: "Sort Z-A",
    icon: "BsSortAlphaDownAlt",
  },
  {
    name: "Nearest by deadline",
    icon: "IoTimeOutline",
  },
  {
    name: "Furthest by deadline",
    icon: "IoTimerOutline",
  },
];

// create react components
export const getIconComponent = (iconName: string) => {
  const iconMap = {
    BsSortAlphaDown,
    BsSortAlphaDownAlt,
    IoTimeOutline,
    IoTimerOutline,
    BiCategoryAlt,
    BsAppIndicator,
    TbProgressCheck,
  };
  return iconMap[iconName] || null;
};

// choose data list filter feature
export const listFilter = [
  {
    name: "category",
    icon: "BiCategoryAlt",
  },
  {
    name: "priority",
    icon: "BsAppIndicator",
  },
  {
    name: "completed",
    icon: "TbProgressCheck",
  },
];
