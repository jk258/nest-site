/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		colors: {
			baseColor: 'var(--baseColor)',
			primaryColor: 'var(--primaryColor',
			primaryColorHover: 'var(--primaryColorHover)',
			textColor3: 'var(--textColor3)',
			borderColor: 'var(--borderColor)',
		},
		boxShadow: {
			boxShadow1: '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
			boxShadow2: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
			boxShadow3: '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
		},
		fontSize: {
			fontSize: '14px',
			fontSizeMini: '12px',
			fontSizeTiny: '12px',
			fontSizeSmall: '14px',
			fontSizeMedium: '16px',
			fontSizeLarge: '20px',
		},
		fontFamily: {
			fontFamily:
				'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			fontFamilyMono: 'v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace',
		},
		extend: {},
	},
	plugins: [],
}
