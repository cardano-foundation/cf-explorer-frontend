export const returnBooleanForHeadless = (value: string) => {
  switch (value) {
    case "false": {
      return false;
    }
    case "true":
    default: {
      return true;
    }
  }
};
