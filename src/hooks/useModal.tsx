import { useContext } from "react";

import { ModalControllerContext } from "@/contexts/ModalsContext";

export function useModal() {
    const context = useContext(ModalControllerContext);

    return context;
}