// https://github.com/sindresorhus/is-unicode-supported/blob/506f27260df3636555714bf10ed40ab9e6a6c96e/index.js
import { platform, env } from 'process'

/** Does the current Terminal support Unicode? */
export function isUnicodeSupported() {
	if (platform !== 'win32') {
		return env.TERM !== 'linux' // Linux console (kernel)
	}
	return (
		Boolean(env.WT_SESSION) || // Windows Terminal
		Boolean(env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
		env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
		env.TERM_PROGRAM === 'Terminus-Sublime' ||
		env.TERM_PROGRAM === 'vscode' ||
		env.TERM === 'xterm-256color' ||
		env.TERM === 'alacritty' ||
		env.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
	)
}

// https://github.com/bevry/figures/blob/b10ba989a9dd359faf0f197e4081b144d2e72931/index.js
import * as unicodeSymbols from 'unicode-symbols'
import * as nonUnicodeSymbols from 'non-unicode-symbols'

/** Unicode Symbols */
export const mainSymbols = unicodeSymbols

/** Non-Unicode Symbols */
export const fallbackSymbols = nonUnicodeSymbols

/** Unicode or Non-Unicode Symbols based on Terminal Support */
const figures = isUnicodeSupported() ? mainSymbols : fallbackSymbols
export default figures
