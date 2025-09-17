export const customTheme = {
  defaultTheme: 'light',
  themes: {
    light: {
      colors: {
        primary: '#1867C0',
        secondary: '#5CBBF6',
        background: '#FFFFFF',
        surface: '#E6E6E6',
        error: '#B00020',
        success: '#4CAF50',
        icon: '#FFF',
        'background-header': '#eaeaea',
        'background-page': '#fbfbfb',
        'background-meta': '#808080',
        'background-letter': '#424242',
        'background-letter-2': '#E0E0E0',
        'background-letter-3': '#969595',
        'background-divider': '#969595',
        'background-gradient-start': '#C3F544',
        'background-gradient-middle': '#9CCC65',
        'background-gradient-end': '#74A400',
        'background-skills-button': '#97cf57',
        'skill-chip-outline': '#E0E0E0'
      },
      variables: {
        'hover-opacity': 0.05,
        'pressed-opacity': 0.1,
        'activated-opacity': 0.15,
        'theme-overlay-multiplier': 0.7
      }
    },
    dark: {
      colors: {
        primary: '#90CAF9',
        secondary: '#42A5F5',
        background: '#121212',
        surface: '#1E1E1E',
        error: '#CF6679',
        success: '#81C784',
        icon: '#000',
        'background-header': '#808080',
        'background-page': '#808080',
        'background-meta': '#4b4a4a',
        'background-letter': '#424242',
        'background-letter-2': '#E0E0E0',
        'background-letter-3': '#808080',
        'background-divider': '#fbfbfb',
        'background-gradient-start': '#7CB342',
        'background-gradient-middle': '#689F38',
        'background-gradient-end': '#33691E',
        'background-skills-button': '#97cf57',
        'skill-chip-outline': '#969595',
        'background-institution': '#121212'

      },
      variables: {
        'hover-opacity': 0.15,
        'pressed-opacity': 0.1,
        'activated-opacity': 0.15,
        'theme-overlay-multiplier': 0.7
      }
    }
  }
};
export const defaults = {
  VBtn: {
    style: 'text-transform: none;'
  },
  global: {
    style: {
      fontFamily: 'Segoe UI, sans-serif'
    }
  }
};

// 📱 Брейкпоинты (можно оставить дефолт)
// export const customDisplay = {
//   mobileBreakpoint: 'sm',
//   thresholds: {
//     xs: 0,
//     sm: 600,
//     md: 960,
//     lg: 1280,
//     xl: 1920
//   }
// };
const colors = {
  background: '#FFFFFF',
  error: '#B00020',
  info: '#2196F3',
  on_surface_variant: '#EEEEEE',
  primary: '#1867C0',
  primary_darken_1: '#1F5592',
  secondary: '#5CBBF6',
  secondary_darken_1: '#018786',
  success: '#4CAF50',
  surface: '#FFFFFF',
  surface_bright: '#FFFFFF',
  surface_light: '#EEEEEE',
  surface_variant: '#424242',
  warning: '#FB8C00'
};

// components	Регистрирует компоненты Vuetify (обычно импортируются как * as components)
// directives	Регистрирует директивы Vuetify (например, v-ripple, v-scroll)
// theme	Настройка темы: цвета, светлая/тёмная тема, кастомные палитры
// display	Управление брейкпоинтами и адаптивностью интерфейса
// defaults	Глобальные значения props для компонентов (например, VBtn: { rounded: 'lg' })
// aliases	Создание алиасов для компонентов (например, MyBtn: VBtn)
// icons	Настройка иконок: выбор набора, добавление кастомных
// locale	Локализация: язык, форматирование дат, чисел и т.д.
// ssr	Настройки для серверного рендеринга (если используешь SSR)
