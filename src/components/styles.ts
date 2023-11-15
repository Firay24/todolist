export const currentTheme = () => {
  try {
    return JSON.parse(localStorage.currentTheme);
  } catch (error) {
    localStorage.currentTheme = true;
    return true;
  }
};

export const primaryColor = () => {
  return "#42AA58";
};

export const secondaryColor = () => {
  return "#7A7574";
};

export const primaryTextColor = () => {
  if (currentTheme()) {
    return "#FFFFFF";
  } else {
    return "#2D3748";
  }
};

export const backgroundColor = () => {
  if (currentTheme()) {
    return "#1B2627";
  } else {
    return "#F2F2F2";
  }
};

export const backgroundContainer = () => {
  if (currentTheme()) {
    return "#202C2D";
  } else {
    return "#FFFFFF";
  }
};
export const backgroundContainer2 = () => {
  if (currentTheme()) {
    return "rgba(37, 53, 54, 1)";
  } else {
    return "gray.200";
  }
};

export const backgroundContainer3 = () => {
  if (currentTheme()) {
    return "rgba(37, 53, 54, 1)";
  } else {
    return "#E8EAEC";
  }
};

export const backgroundContainer4 = () => {
  if (currentTheme()) {
    return "rgba(37, 53, 54, 1)";
  } else {
    return "gray.50";
  }
};

export const backgroundColorHover = () => {
  if (currentTheme()) {
    return "#192324";
  } else {
    return "gray.200";
  }
};

export const backgroundColorHover2 = () => {
  if (currentTheme()) {
    return "#192324";
  } else {
    return "gray.300";
  }
};

export const backgroundColorButton = () => {
  if (currentTheme()) {
    return "#192324";
  } else {
    return "blackAlpha.900";
  }
};

export const borderColor = () => {
  if (currentTheme()) {
    return "rgba(37, 53, 54, 1)";
  } else {
    return "gray.200";
  }
};

export const borderColor2 = () => {
  if (currentTheme()) {
    return "#202C2D";
  } else {
    return "gray.200";
  }
};

export const generateScrollbarStyle = () => {
  return {
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: backgroundContainer3(),
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: backgroundColorHover(),
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: backgroundContainer(),
    },
  };
};
