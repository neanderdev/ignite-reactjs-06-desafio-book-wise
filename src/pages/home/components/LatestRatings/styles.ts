import { styled } from "@/styles/stitches.config";

export const LatestContainer = styled("section", {
  width: "608px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",

  paddingBottom: "90px",
});

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  strong: {
    fontWeight: 400,
    fontSize: "$sm",
  },

  a: {
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    fontSize: "$sm",
    color: "$purple100",
  },
});
