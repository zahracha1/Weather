import { FlexProps } from "@chakra-ui/layout";

export const FlexStyle: FlexProps = {
    alignItems: "start",
    padding: 6,
    flexDirection: "column",
    transition: "ease-in-out .2s",
    borderRadius: "3xl",
    marginRight: ".1rem"
  };


export const FlexContainerStyle: FlexProps = {
  borderRadius: "1.5rem",
  width: "100%",
  height: "100%",
  minH: '107vh'
};

export const flexContainerStyle1: FlexProps = {
  display: "flex",
  width: "100%",
  height: "13%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.25rem"
};


export const flexContainerStyle2: FlexProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "1rem"
};