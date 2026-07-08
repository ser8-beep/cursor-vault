/**
 * Tailwind CSS theme extension
 * Usage (tailwind.config.ts):
 *   import { portfolioTheme } from './design-tokens/tailwind/theme';
 *   export default { theme: { extend: portfolioTheme } };
 *
 * Or Tailwind v4 (@theme in CSS):
 *   @import '../design-tokens/css/tokens.css';
 */
export const portfolioTheme = {
  colors: {
    ...{
    "color.background.default": 'var(--color-background-default)',
    "color.background.subtle": 'var(--color-background-subtle)',
    "color.background.muted": 'var(--color-background-muted)',
    "color.background.emphasis": 'var(--color-background-emphasis)',
    "color.background.inverse": 'var(--color-background-inverse)',
    "color.text.primary": 'var(--color-text-primary)',
    "color.text.secondary": 'var(--color-text-secondary)',
    "color.text.tertiary": 'var(--color-text-tertiary)',
    "color.text.disabled": 'var(--color-text-disabled)',
    "color.text.inverse": 'var(--color-text-inverse)',
    "color.text.link": 'var(--color-text-link)',
    "color.border.default": 'var(--color-border-default)',
    "color.border.subtle": 'var(--color-border-subtle)',
    "color.border.strong": 'var(--color-border-strong)',
    "color.icon.default": 'var(--color-icon-default)',
    "color.icon.muted": 'var(--color-icon-muted)',
    "color.action.primary": 'var(--color-action-primary)',
    "color.action.primary.hover": 'var(--color-action-primary-hover)',
    "color.action.secondary": 'var(--color-action-secondary)',
    "color.text.on.primary": 'var(--color-text-on-primary)',
    "color.status.success.bg": 'var(--color-status-success-bg)',
    "color.status.success.text": 'var(--color-status-success-text)',
    "color.status.warning.bg": 'var(--color-status-warning-bg)',
    "color.status.warning.text": 'var(--color-status-warning-text)',
    "color.status.error.bg": 'var(--color-status-error-bg)',
    "color.status.error.text": 'var(--color-status-error-text)',
    "color.status.info.bg": 'var(--color-status-info-bg)',
    "color.status.info.text": 'var(--color-status-info-text)'
},
    ...{
    "button.primary.background": 'var(--button-primary-background)',
    "button.primary.foreground": 'var(--button-primary-foreground)',
    "button.primary.border": 'var(--button-primary-border)',
    "button.secondary.background": 'var(--button-secondary-background)',
    "button.secondary.foreground": 'var(--button-secondary-foreground)',
    "button.secondary.border": 'var(--button-secondary-border)',
    "input.background": 'var(--input-background)',
    "input.border": 'var(--input-border)',
    "input.text": 'var(--input-text)',
    "input.placeholder": 'var(--input-placeholder)',
    "card.background": 'var(--card-background)',
    "card.border": 'var(--card-border)',
    "nav.background": 'var(--nav-background)',
    "nav.text": 'var(--nav-text)',
    "badge.success.background": 'var(--badge-success-background)',
    "badge.success.text": 'var(--badge-success-text)',
    "tooltip.background": 'var(--tooltip-background)',
    "tooltip.text": 'var(--tooltip-text)',
    "card.background.default": 'var(--card-background-default)',
    "card.background.hover": 'var(--card-background-hover)',
    "nav.background.default": 'var(--nav-background-default)',
    "nav.background.splash": 'var(--nav-background-splash)',
    "footer.background": 'var(--footer-background)',
    "footer.text": 'var(--footer-text)'
},
    background: 'var(--color-background-default)',
    foreground: 'var(--color-text-primary)',
    primary: {
      DEFAULT: 'var(--color-action-primary)',
      foreground: 'var(--color-text-on-primary)',
    },
    secondary: {
      DEFAULT: 'var(--color-action-secondary)',
      foreground: 'var(--color-text-primary)',
    },
    muted: {
      DEFAULT: 'var(--color-background-muted)',
      foreground: 'var(--color-text-secondary)',
    },
    accent: {
      DEFAULT: 'var(--color-background-emphasis)',
      foreground: 'var(--color-text-inverse)',
    },
    destructive: {
      DEFAULT: 'var(--color-status-error-text)',
      foreground: 'var(--color-status-error-bg)',
    },
    border: 'var(--color-border-default)',
    input: 'var(--input-border)',
    ring: 'var(--theme-interactive-focus-ring)',
    card: {
      DEFAULT: 'var(--card-background)',
      foreground: 'var(--color-text-primary)',
    },
    popover: {
      DEFAULT: 'var(--tooltip-background)',
      foreground: 'var(--tooltip-text)',
    },
  },
  spacing: {
    "0": 'var(--space-0)',
    "1": 'var(--space-1)',
    "2": 'var(--space-2)',
    "3": 'var(--space-3)',
    "4": 'var(--space-4)',
    "5": 'var(--space-5)',
    "6": 'var(--space-6)',
    "8": 'var(--space-8)',
    "10": 'var(--space-10)',
    "12": 'var(--space-12)',
    "16": 'var(--space-16)',
    "20": 'var(--space-20)',
    "24": 'var(--space-24)'
},
  borderRadius: {
    "none": 'var(--radius-none)',
    "xs": 'var(--radius-xs)',
    "sm": 'var(--radius-sm)',
    "md": 'var(--radius-md)',
    "lg": 'var(--radius-lg)',
    "xl": 'var(--radius-xl)',
    "2xl": 'var(--radius-2xl)',
    "full": 'var(--radius-full)'
},
  fontSize: {
    'display-xl': ['var(--font-size-display-xl)', { lineHeight: 'var(--line-height-normal)' }],
    'display-l': ['var(--font-size-display-l)', { lineHeight: 'var(--line-height-normal)' }],
    'display-m': ['var(--font-size-display-m)', { lineHeight: 'var(--line-height-normal)' }],
    'heading-xl': ['var(--font-size-heading-xl)', { lineHeight: 'var(--line-height-normal)' }],
    'heading-l': ['var(--font-size-heading-l)', { lineHeight: 'var(--line-height-normal)' }],
    'heading-m': ['var(--font-size-heading-m)', { lineHeight: 'var(--line-height-normal)' }],
    'heading-s': ['var(--font-size-heading-s)', { lineHeight: 'var(--line-height-normal)' }],
    'title': ['var(--font-size-title)', { lineHeight: 'var(--line-height-normal)' }],
    'body-xl': ['var(--font-size-body-xl)', { lineHeight: 'var(--line-height-normal)' }],
    'body-l': ['var(--font-size-body-l)', { lineHeight: 'var(--line-height-normal)' }],
    'body-m': ['var(--font-size-body-m)', { lineHeight: 'var(--line-height-normal)' }],
    'body-s': ['var(--font-size-body-s)', { lineHeight: 'var(--line-height-normal)' }],
    'label-l': ['var(--font-size-label-l)', { lineHeight: 'var(--line-height-normal)' }],
    'label-m': ['var(--font-size-label-m)', { lineHeight: 'var(--line-height-normal)' }],
    'label-s': ['var(--font-size-label-s)', { lineHeight: 'var(--line-height-normal)' }],
    'caption': ['var(--font-size-caption)', { lineHeight: 'var(--line-height-normal)' }],
    'overline': ['var(--font-size-overline)', { lineHeight: 'var(--line-height-normal)' }],
    'button': ['var(--font-size-button)', { lineHeight: 'var(--line-height-normal)' }],
    'code': ['var(--font-size-code)', { lineHeight: 'var(--line-height-normal)' }],
  },
} as const;

export type PortfolioTheme = typeof portfolioTheme;
