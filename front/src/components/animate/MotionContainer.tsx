import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { varWrapEnter } from "./variants";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
  [x: string]: any;
}

export default function MotionContainer({ open, children, ...other }: Props) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
