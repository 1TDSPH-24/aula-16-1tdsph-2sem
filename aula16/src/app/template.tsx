"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {

    console.log("Template Carregado!");

    return (
        <motion.div initial={{ y: 16, opacity: 1 }} 
        transition={{ ease: "easeInOut", duration: 0.75 }}>
            {children}
        </motion.div>
    )
}