import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import cn from './cn.js'
import en from './en.js'

// 你的语言资源
const resources = {
  en: {
    translation: en,
    antd: enUS,
  },
  zh: {
    translation: cn,
    antd: zhCN,
  },
};

i18n
  .use(LanguageDetector) // 用于自动检测用户语言
  .use(initReactI18next) // 将i18next传递给react-i18next
  .init({
    resources,
    fallbackLng: 'zh', // 如果检测到的语言不可用，使用中文作为后备
    detection : {
      // 添加映射关系
      customLanguageDetect : (detectedLng) => {
        // 如果是zh为开头的就认为中文
        if(detectedLng.startsWith('zh')){
          return 'zh'
        }
        // 如果是en为开头的认为英文
        if(detectedLng.startsWith('en')){
          return 'en'
        }
        return detectedLng
      },
      order : ['customLanguageDetect']

    },
    interpolation: {
      escapeValue: false, // 不需要对值进行转义
    }
  });
let antdlocale;
switch(i18n.language) {
  case 'zh':
    antdlocale = i18n.getResourceBundle('zh', 'antd');
    break;
  case 'en':
  default:
    antdlocale = i18n.getResourceBundle('en', 'antd');
}

export {
  i18n,
  antdlocale
}
