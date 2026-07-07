import type { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<"button"> {
    variant?: "primary" | "secondary" | "ghost-destructive"
}

type VariantStyles = "primary" | "secondary" | "ghost-destructive"

export default function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
    return (
        <button
            type={type}
            {...props}
            className={`${getVariantStyles(variant)} rounded px-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-not-allowed disabled:opacity-30 ${className}`.trim()}>
        </button>
    )
}

function getVariantStyles(variant: VariantStyles) {
    switch (variant) {
        case "primary":
            return "bg-violet-600 hover:bg-violet-500"
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400"
        case "ghost-destructive":
            return "hover:bg-red-800 text-red-800 hover:text-red-200"
        default:
            throw new Error(`Unknown variant: ${variant satisfies never}`)
    }
}
