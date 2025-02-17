import { createTheme, defineVars } from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

/**
 * @tokens colors
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const base = defineVars({
  transparent: { default: 'transparent', [DARK]: 'transparent' },
  current: { default: 'currentColor', [DARK]: 'currentColor' },
  black: {
    default: '#000000',
    [DARK]: '#ffffff',
  },
  white: {
    default: '#ffffff',
    [DARK]: '#000000',
  },
})

export const surface = defineVars({
  page: {
    default: '#ffffff',
    [DARK]: '#2c3032',
  },
  pageFaded: {
    default: '#f9f9f9',
    [DARK]: '#3c3f41',
  },
  foreground: {
    default: '#0d1619',
    [DARK]: '#ffffff',
  },
})

export const foreground = defineVars({
  neutral: { default: '#0d1619', [DARK]: '#f5f5f5' },
  neutralFaded: { default: '#757676', [DARK]: '#bfbfbf' },
  accent: { default: '#6950f3', [DARK]: '#8880ff' },
  accentHover: { default: '#5c4ace', [DARK]: '#b0b1fd' },
  accentActive: { default: '#403591', [DARK]: '#D1D4FF' },
  positive: { default: '#1F8900', [DARK]: '#45b020' },
  warning: { default: '#b7570b', [DARK]: '#f19101' },
  danger: { default: '#d4163a', [DARK]: '#ff4360' },
  dangerHover: { default: '#bb1232', [DARK]: '#fe9a9a' },
  dangerActive: { default: '#831324', [DARK]: '#ffd4d3' },
  disabled: { default: '#acacac', [DARK]: '#757676' },
  ghost: { default: '#bfbfbf', [DARK]: '#606263' },
  onLoud: { default: '#ffffff', [DARK]: '#ffffff' },
  onAccent: { default: '#ffffff', [DARK]: '#ffffff' },
  onPrimary: { default: '#ffffff', [DARK]: '#0d1619' },
  info: { default: '#2D76EC', [DARK]: '#5791F0' },
  transparent: {
    default: 'rgba(255, 255, 255, 0.1)',
    [DARK]: 'rgba(13, 22, 25, 0.1)',
  },
})

export const background = defineVars({
  neutral: { default: '#d3d3d3', [DARK]: '#3a4144' },
  neutralHover: { default: '#bfbfbf', [DARK]: '#454b4e' },
  neutralActive: { default: '#acacac', [DARK]: '#505658' },
  neutralFaded: { default: '#f2f2f2', [DARK]: '#33393c' },
  neutralFadedHover: { default: '#e5e5e5', [DARK]: '#3a4144' },
  neutralFadedActive: { default: '#d3d3d3', [DARK]: '#454b4e' },
  positive: { default: '#1F8900', [DARK]: '#1F8900' },
  positiveFaded: { default: '#edfbe9', [DARK]: '#182914' },
  positiveFadedHover: { default: '#d2f6c9', [DARK]: '#18390e' },
  positiveFadedActive: { default: '#b1eea1', [DARK]: '#215412' },
  danger: { default: '#d4163a', [DARK]: '#d4163a' },
  dangerHover: { default: '#bb1232', [DARK]: '#bb1232' },
  dangerActive: { default: '#831324', [DARK]: '#831324' },
  dangerFaded: { default: '#FEECEB', [DARK]: '#421015' },
  dangerFadedHover: { default: '#FEE3E2', [DARK]: '#5a1019' },
  dangerFadedActive: { default: '#ffd4d3', [DARK]: '#831324' },
  disabled: { default: '#f2f2f2', [DARK]: '#3a4144' },
  page: { default: '#ffffff', [DARK]: '#0d1619' },
  pageFaded: { default: '#f9f9f9', [DARK]: '#191f21' },
  base: { default: '#ffffff', [DARK]: '#22282a' },
  baseHover: { default: '#f5f5f5', [DARK]: '#33393c' },
  baseActive: { default: '#f2f2f2', [DARK]: '#3a4144' },
  elevated: { default: '#ffffff', [DARK]: '#2c3032' },
  elevatedHover: { default: '#f5f5f5', [DARK]: '#33393c' },
  elevatedActive: { default: '#f2f2f2', [DARK]: '#3a4144' },
  primary: { default: '#0d1619', [DARK]: '#ffffff' },
  primaryHover: { default: '#2c3032', [DARK]: '#f2f2f2' },
  primaryActive: { default: '#454b4e', [DARK]: '#d3d3d3' },
  warning: { default: '#ffc00a', [DARK]: '#b7570b' },
  warningHover: { default: '#f19101', [DARK]: '#9e4900' },
  warningActive: { default: '#b7570b', [DARK]: '#713200' },
  warningFaded: { default: '#fff7db', [DARK]: '#371c0c' },
  warningFadedHover: { default: '#ffefb2', [DARK]: '#4d2305' },
  warningFadedActive: { default: '#ffeab0', [DARK]: '#713200' },
  accent: { default: '#6950f3', [DARK]: '#6950f3' },
  accentHover: { default: '#5c4ace', [DARK]: '#5c4ace' },
  accentActive: { default: '#403591', [DARK]: '#403591' },
  accentFaded: { default: '#f0f0ff', [DARK]: '#201e45' },
  accentFadedHover: { default: '#DBDDFF', [DARK]: '#2b2660' },
  accentFadedActive: { default: '#D1D4FF', [DARK]: '#403591' },
  info: { default: '#2D76EC', [DARK]: '#2D76EC' },
  infoFaded: { default: '#EAF1FD', [DARK]: '#133263' },
  overlay: {
    default: 'rgba(13, 22, 25, 0.25)',
    [DARK]: 'rgba(13, 22, 25, 0.64)',
  },
  overlayOnImage: {
    default: 'rgba(13, 22, 25, 0.4)',
    [DARK]: 'rgba(13, 22, 25, 0.4)',
  },
  transparent: {
    default: 'rgba(13, 22, 25, 0.1)',
    [DARK]: 'rgba(13, 22, 25, 0.1)',
  },
  transparentHover: {
    default: 'rgba(13, 22, 25, 0.15)',
    [DARK]: 'rgba(245, 245, 245, 0.15)',
  },
  transparentActive: {
    default: 'rgba(13, 22, 25, 0.2)',
    [DARK]: 'rgba(245, 245, 245, 0.2)',
  },
  onLoud: {
    default: 'rgba(255, 255, 255, 0.1)',
    [DARK]: 'rgba(255, 255, 255, 0.1)',
  },
  onLoudHover: {
    default: 'rgba(255, 255, 255, 0.15)',
    [DARK]: 'rgba(255, 255, 255, 0.15)',
  },
  onLoudActive: {
    default: 'rgba(255, 255, 255, 0.2)',
    [DARK]: 'rgba(255, 255, 255, 0.2)',
  },
  'shade-100': {
    default: 'rgba(13, 22, 25, 0.02)',
    [DARK]: 'rgba(255, 255, 255, 0.02)',
  },
  'shade-200': {
    default: 'rgba(13, 22, 25, 0.05)',
    [DARK]: 'rgba(255, 255, 255, 0.05)',
  },
  'shade-300': {
    default: 'rgba(13, 22, 25, 0.1)',
    [DARK]: 'rgba(255, 255, 255, 0.1)',
  },
  'shade-400': {
    default: 'rgba(13, 22, 25, 0.17)',
    [DARK]: 'rgba(255, 255, 255, 0.17)',
  },
  'shade-500': {
    default: 'rgba(13, 22, 25, 0.25)',
    [DARK]: 'rgba(255, 255, 255, 0.25)',
  },
  'shade-600': {
    default: 'rgba(13, 22, 25, 0.33)',
    [DARK]: 'rgba(255, 255, 255, 0.33)',
  },
})

export const border = defineVars({
  neutral: { default: '#d3d3d3', [DARK]: '#3a4144' },
  neutralHover: { default: '#bfbfbf', [DARK]: '#606263' },
  neutralActive: { default: '#acacac', [DARK]: '#757676' },
  neutralFaded: { default: '#e5e5e5', [DARK]: '#33393c' },
  neutralFadedHover: { default: '#d3d3d3', [DARK]: '#606263' },
  neutralFadedActive: { default: '#bfbfbf', [DARK]: '#757676' },
  positive: { default: '#1F8900', [DARK]: '#1F8900' },
  positiveFaded: { default: '#d2f6c9', [DARK]: '#18390e' },
  positiveFadedHover: { default: '#b1eea1', [DARK]: '#215412' },
  positiveFadedActive: { default: '#7ed368', [DARK]: '#2c7016' },
  danger: { default: '#d4163a', [DARK]: '#ff4360' },
  dangerHover: { default: '#bb1232', [DARK]: '#fe9a9a' },
  dangerActive: { default: '#831324', [DARK]: '#ffd4d3' },
  dangerFaded: { default: '#FEE3E2', [DARK]: '#5a1019' },
  dangerFadedHover: { default: '#ffd4d3', [DARK]: '#831324' },
  dangerFadedActive: { default: '#fe9a9a', [DARK]: '#bb1232' },
  disabled: { default: '#d3d3d3', [DARK]: '#3a4144' },
  warning: { default: '#ffc00a', [DARK]: '#b7570b' },
  warningHover: { default: '#f19101', [DARK]: '#9e4900' },
  warningActive: { default: '#b7570b', [DARK]: '#713200' },
  warningFaded: { default: '#ffefb2', [DARK]: '#4d2305' },
  warningFadedHover: { default: '#ffeab0', [DARK]: '#713200' },
  warningFadedActive: { default: '#ffc00a', [DARK]: '#9e4900' },
  accent: { default: '#6950f3', [DARK]: '#6950f3' },
  accentHover: { default: '#5c4ace', [DARK]: '#8880ff' },
  accentActive: { default: '#403591', [DARK]: '#b0b1fd' },
  accentFaded: { default: '#DBDDFF', [DARK]: '#2b2660' },
  accentFadedHover: { default: '#D1D4FF', [DARK]: '#403591' },
  accentFadedActive: { default: '#b0b1fd', [DARK]: '#5c4ace' },
  primary: { default: '#0d1619', [DARK]: '#ffffff' },
  info: { default: '#2D76EC', [DARK]: '#2D76EC' },
  infoFaded: { default: '#cce0ff', [DARK]: '#194182' },
  transparent: {
    default: 'rgba(255, 255, 255, 0.1)',
    [DARK]: 'rgba(13, 22, 25, 0.1)',
  },
})
