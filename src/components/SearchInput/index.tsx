import { MagnifyingGlass } from "@phosphor-icons/react";
import { ComponentProps } from "react";

import { theme } from "@/styles/stitches.config";

import { Input, SearchContainer } from "./styles";

type Props = ComponentProps<typeof Input> & {}

export function SearchInput({ ...rest }: Props) {
    const { colors } = theme

    return (
        <SearchContainer>
            <Input {...rest} />

            <MagnifyingGlass size={20} color={colors.gray500.value} />
        </SearchContainer>
    )
}