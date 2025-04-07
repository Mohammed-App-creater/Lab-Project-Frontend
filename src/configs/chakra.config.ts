'use client'
import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineSemanticTokens,
	defineTokens,
} from "@chakra-ui/react";


export const tokens = defineTokens({
	fonts: {
		heading: { value: "var(--font-lex) sans-serif" },
		body: { value: "var(--font-pop) sans-serif" },
	},
	colors: {
		primary: {
			DEFAULT: { value: "#003087" },
			50: { value: "#E9F8FF" },
			100: { value: "#CEEEFF" },
			200: { value: "#A7E3FF" },
			300: { value: "#6BD6FF" },
			400: { value: "#26BAFF" },
			500: { value: "#0091FF" },
			600: { value: "#0067FF" },
			700: { value: "#004CFF" },
			800: { value: "#0040E6" },
			900: { value: "#003DB3" },
		},
		secondary: {
			DEFAULT: { value: "#F79F79" },
			50: { value: "#ffece1" },
			100: { value: "#fdcab5" },
			200: { value: "#f8a987" },
			300: { value: "#f48658" },
			400: { value: "#f16528" },
			500: { value: "#d84b11" },
			600: { value: "#a73b0c" },
			700: { value: "#782907" },
			800: { value: "#491802" },
			900: { value: "#1d0500" },
		},
	},
});

export const semanticTokens = defineSemanticTokens({
	colors: {
		primary: {
			solid: { value: "{colors.primary}" },
			contrast: { value: "{colors.white}" },
			fg: { value: "{colors.primary}" },
			muted: { value: "{colors.primary.300}" },
			subtle: { value: "{colors.primary.200}" },
			emphasized: { value: "{colors.primary.100}" },
			focusRing: { value: "{colors.primary.500}" },
		},
		secondary: {
			solid: { value: "{colors.secondary.300}" },
			contrast: { value: "{colors.secondary.900}" },
			fg: { value: "{colors.secondary.400}" },
			muted: { value: "{colors.secondary.100}" },
			subtle: { value: "{colors.secondary.50}" },
			emphasized: { value: "{colors.secondary.50" },
			focusRing: { value: "{colors.secondary.700}" },
		},

		text: {
			fg: {
				value: "{colors.gray.950}",
			},
		},
	},
	radii: {
		l1: { value: "0.625rem" },
		l2: { value: "1.25rem" },
	},
});

export const themeConfig = defineConfig({
	theme: {
		tokens,
		semanticTokens,
	},
});

const themeSystem = createSystem(defaultConfig, themeConfig);

export default themeSystem;