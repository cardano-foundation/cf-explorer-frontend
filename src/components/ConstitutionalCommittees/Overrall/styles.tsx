import { Grid, styled } from "@mui/material";
interface CardItemProps {
  length: number;
  wide?: number;
  itemonrow: number;
}

export const CardItem = styled(Grid)<CardItemProps>(({ theme, length, wide, itemonrow }) => ({
  width: "max-content",
  padding: length > 6 ? "20px 25px" : "0px 15px",
  borderLeft: `1px solid ${theme.palette.primary[200]}`,
  borderBottom: `1px solid ${theme.palette.primary[200]}`,
  ":first-of-type": {
    borderLeft: "none"
  },

  ...(length > 6
    ? {
        borderBottomWidth: 1,

        [theme.breakpoints.up("lg")]: {
          [`:nth-of-type(${itemonrow}n+1)`]: {
            borderLeftWidth: 0,
            paddingLeft: 0
          },
          [`:nth-last-of-type(-n + ${itemonrow - 1})`]: {
            borderBottom: "none !important",
            [`:nth-of-type(${itemonrow}n + 1)`]: {
              "&~div": {
                borderBottomWidth: 0,
                paddingTop: 20,
                paddingBottom: 0
              }
            }
          },
          [`:nth-of-type(5)`]: {
            borderLeftWidth: 0,
            paddingLeft: 0,
            borderBottom: "none !important"
          }
        }
      }
    : {
        borderBottomWidth: 0,
        [theme.breakpoints.down("lg")]: {
          padding: "20px 25px"
        },
        [theme.breakpoints.down("sm")]: {
          padding: "20px 15px",
          ":nth-of-type(even)": {
            paddingRight: "0 !important"
          }
        }
      }),
  [theme.breakpoints.between("md", "lg")]: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    [`:nth-of-type(${length === 4 ? 4 : 3}n + 1)`]: {
      borderLeftWidth: 0,
      paddingLeft: 0
    },

    [`:nth-last-of-type(-n + ${length === 4 ? 4 : 3})`]: {
      [`:nth-of-type(${length === 4 ? 4 : 3}n + 1)`]: {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
          paddingTop: 20,
          paddingBottom: 0
        }
      }
    }
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    [`:nth-of-type(2n + ${wide ? 2 : 1})`]: {
      borderLeftWidth: 0,
      paddingLeft: 0
    },
    ":nth-last-of-type(-n + 2)": {
      [`:nth-of-type(2n + ${wide ? 2 : 1})`]: {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
          paddingTop: 20,
          paddingBottom: 0
        }
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    ":nth-of-type(even)": {
      paddingRight: wide ? 15 : "0 !important",
      paddingLeft: 15
    },
    ":nth-of-type(odd)": {
      paddingLeft: wide ? 15 : "0 !important",
      paddingRight: 10
    }
  }
}));
