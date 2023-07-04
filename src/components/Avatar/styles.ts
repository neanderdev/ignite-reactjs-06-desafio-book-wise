import NextImage from "next/image";

import { styled } from "@/styles/stitches.config";

export const Container = styled("div", {
  background: "$gradient-vertical",
  borderRadius: 999,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Image = styled(NextImage, {
  borderRadius: 999,

  borderStyle: "solid",
  borderWidth: "1.5px",
  borderImage: "linear-gradient(to bottom, transparent) 1",
});
