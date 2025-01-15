import { theme } from "../theme.css.ts";

export const shadows = {
	// Default
	sm: `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.18), 
  0px 0.9px 1.2px -0.7px hsl(${theme.colors.current.shadow} / 0.27), 
  0px 1.9px 2.5px -1.4px hsl(${theme.colors.current.shadow} / 0.36)
  `,
	md: `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.19), 
  0px 1.9px 2.5px -0.5px hsl(${theme.colors.current.shadow} / 0.26), 
  0px 4.3px 5.5px -0.9px hsl(${theme.colors.current.shadow} / 0.33), 
  0px 9.6px 12.4px -1.4px hsl(${theme.colors.current.shadow} / 0.4)
  `,
	lg: `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.2), 
  0px 4.1px 5.3px -0.2px hsl(${theme.colors.current.shadow} / 0.24), 
  0px 7.7px 9.9px -0.5px hsl(${theme.colors.current.shadow} / 0.29), 
  0px 12.4px 16px -0.7px hsl(${theme.colors.current.shadow} / 0.33), 
  -0.1px 19.5px 25.2px -0.9px hsl(${theme.colors.current.shadow} / 0.37), 
  -0.1px 30.3px 39.1px -1.2px hsl(${theme.colors.current.shadow} / 0.42), 
  -0.2px 46.1px 59.5px -1.4px hsl(${theme.colors.current.shadow} / 0.46)
  `,
	// Inset
	"inset-sm": `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.18) inset, 
  0px 0.9px 1.2px -0.7px hsl(${theme.colors.current.shadow} / 0.27) inset, 
  0px 1.9px 2.5px -1.4px hsl(${theme.colors.current.shadow} / 0.36) inset
  `,
	"inset-md": `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.19) inset, 
  0px 1.9px 2.5px -0.5px hsl(${theme.colors.current.shadow} / 0.26) inset, 
  0px 4.3px 5.5px -0.9px hsl(${theme.colors.current.shadow} / 0.33) inset, 
  0px 9.6px 12.4px -1.4px hsl(${theme.colors.current.shadow} / 0.4) inset
  `,
	"inset-lg": `
  0px 0.5px 0.6px hsl(${theme.colors.current.shadow} / 0.2) inset,  
  0px 4.1px 5.3px -0.2px hsl(${theme.colors.current.shadow} / 0.24) inset, 
  0px 7.7px 9.9px -0.5px hsl(${theme.colors.current.shadow} / 0.29) inset, 
  0px 12.4px 16px -0.7px hsl(${theme.colors.current.shadow} / 0.33) inset, 
  -0.1px 19.5px 25.2px -0.9px hsl(${theme.colors.current.shadow} / 0.37) inset, 
  -0.1px 30.3px 39.1px -1.2px hsl(${theme.colors.current.shadow} / 0.42) inset, 
  -0.2px 46.1px 59.5px -1.4px hsl(${theme.colors.current.shadow} / 0.46) inset
  `,
};
