import { Star as StarIcon } from "@phosphor-icons/react";

import { theme } from "@/styles/stitches.config";

interface Props {
    color?: string | false;
    size?: number;
}

export function Star({ color, size }: Props) {
    const { colors } = theme;

    if (!color) {
        return <StarIcon
            size={size ?? 16}
            weight="regular"
            color={colors.purple100.value}
        />
    }

    return (
        <StarIcon
            size={size ?? 16}
            weight="fill"
            color={color}
        />
    )
}