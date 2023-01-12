/**
 * This is the context that wraps the entire project to provide language options.
 * We are using Google's translate script that embeds a selector to change
 * the preferred language, but it is from 2012 so it doesn't look very good.
 *
 * As such, this context hides Google's selector and exposes an API for
 * another component to implement a custom selector.
 */

 import React, { useEffect, useState } from 'react'
 import { getCookie } from '/utils/cookie'

 export const Languages = {
  af: 'Afrikaans (Afrikaans)',
  sq: 'Shqiptar (Albanian)',
  am: 'አማርኛ (Amharic)',
  ar: 'عربى (Arabic)',
  hy: 'Հայերեն (Armenian)',
  as: 'অসমীয়া (Assamese)',
  ay: 'Aymara (Aymara)',
  az: 'AzəRbaycan (Azerbaijani)',
  bm: 'Bamanankan (Bambara)',
  eu: 'Euskal (Basque)',
  be: 'Беларус (Belarusian)',
  bn: 'বাংলা (Bengali)',
  bho: 'भोजपुरी (Bhojpuri)',
  bs: 'Bosanski (Bosnian)',
  bg: 'Български (Bulgarian)',
  ca: 'Català (Catalan)',
  ceb: 'Cebuano (Cebuano)',
  ny: 'Chichewa (Chichewa)',
  'zh-CN': '中文 (Chinese - Simplified)',
  'zh-TW': '中文 (Chinese - Traditional)',
  co: 'Corsu (Corsican)',
  hr: 'Hrvatski (Croatian)',
  cs: 'Čeština (Czech)',
  da: 'Dansk (Danish)',
  dv: 'ދިވެހި (Dhivehi)',
  doi: 'डोगरी (Dogri)',
  nl: 'Nederlands (Dutch)',
  en: 'English (English)',
  eo: 'Esperanto (Esperanto)',
  et: 'Eestlane (Estonian)',
  ee: 'Eʋegbe (Ewe)',
  tl: 'Pilipino (Filipino)',
  fi: 'Suomalainen (Finnish)',
  fr: 'Français (French)',
  fy: 'Frysk (Frisian)',
  gl: 'Galego (Galician)',
  ka: 'ᲥᲐᲠᲗᲣᲚᲘ (Georgian)',
  de: 'Deutsche (German)',
  el: 'Ελληνικά (Greek)',
  gn: 'Guarani (Guarani)',
  gu: 'ગુજરાતી (Gujarati)',
  ht: 'Kreyòl Ayisyen (Haitian Creole)',
  ha: 'Hausa (Hausa)',
  haw: "'Ōlelo Hawai'i (Hawaiian)",
  iw: 'עברית (Hebrew)',
  hi: 'हिन्दी (Hindi)',
  hmn: 'Hmong (Hmong)',
  hu: 'Magyar (Hungarian)',
  is: 'Íslensku (Icelandic)',
  ig: 'Ndi Igbo (Igbo)',
  ilo: 'Ilocano (Ilocano)',
  id: 'Bahasa Indonesia (Indonesian)',
  ga: 'Gaeilge (Irish)',
  it: 'Italiano (Italian)',
  ja: '日本語 (Japanese)',
  jw: 'Basa Jawa (Javanese)',
  kn: 'ಕನ್ನಡ (Kannada)',
  kk: 'Қазақ (Kazakh)',
  km: 'ខ្មែរ (Khmer)',
  rw: 'Ikinyarwanda (Kinyarwanda)',
  gom: 'कोंकणी (Konkani)',
  ko: '한국어 (Korean)',
  kri: 'Krio (Krio)',
  ku: 'Kurdî (Kurdish - Kurmanji)',
  ckb: 'کوردی (Kurdish - Sorani)',
  ky: 'Кыргызча (Kyrgyz)',
  lo: 'ລາວ (Lao)',
  la: 'Latine (Latin)',
  lv: 'Latvietis (Latvian)',
  ln: 'Lingala (Lingala)',
  lt: 'Lietuvis (Lithuanian)',
  lg: 'Oluganda (Luganda)',
  lb: 'Lëtzebuergesch (Luxembourgish)',
  mk: 'Македонски (Macedonian)',
  mai: 'मैथिली (Maithili)',
  mg: 'Malagasy (Malagasy)',
  ms: 'Bahasa Melayu (Malay)',
  ml: 'മലയാളം (Malayalam)',
  mt: 'Malti (Maltese)',
  mi: 'Maori (Maori)',
  mr: 'मराठी (Marathi)',
  'mni-Mtei': 'ꯃꯩꯇꯩꯂꯣꯟ (Meiteilon - Manipuri)',
  lus: 'Mizo tawng (Mizo)',
  mn: 'Монгол (Mongolian)',
  my: 'မြန်မာ (Myanmar - Burmese)',
  ne: 'नेपाली (Nepali)',
  no: 'Norsk (Norwegian)',
  or: 'ଓଡିଆ (Odia - Oriya)',
  om: 'Afaan Oromoo (Oromo)',
  ps: 'پښتو (Pashto)',
  fa: 'فارسی (Persian)',
  pl: 'Polskie (Polish)',
  pt: 'Português (Portuguese)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  qu: 'Runasimi (Quechua)',
  ro: 'Română (Romanian)',
  ru: 'Русский (Russian)',
  sm: 'Sāmoa (Samoan)',
  sa: 'संस्कृत (Sanskrit)',
  gd: 'Gàidhlig (Scots Gaelic)',
  nso: 'Sepedi (Sepedi)',
  sr: 'Српски (Serbian)',
  st: 'Sesotho (Sesotho)',
  sn: 'Shona (Shona)',
  sd: 'سنڌي (Sindhi)',
  si: 'සිංහල (Sinhala)',
  sk: 'Slovenský (Slovak)',
  sl: 'Slovenščina (Slovenian)',
  so: 'Soomaali (Somali)',
  es: 'Español (Spanish)',
  su: 'Urang Sunda (Sundanese)',
  sw: 'Kiswahili (Swahili)',
  sv: 'Svenska (Swedish)',
  tg: 'Точик (Tajik)',
  ta: 'தமிழ் (Tamil)',
  tt: 'Татар (Tatar)',
  te: 'తెలుగు (Telugu)',
  th: 'ไทย (Thai)',
  ti: 'ትግሪኛ (Tigrinya)',
  ts: 'Tsonga (Tsonga)',
  tr: 'Türk (Turkish)',
  tk: 'türkmençe (Turkmen)',
  ak: 'Twi (Twi)',
  uk: 'Українська (Ukrainian)',
  ur: 'اردو (Urdu)',
  ug: 'ئۇيغۇر تىلى (Uyghur)',
  uz: "O'Zbek (Uzbek)",
  vi: 'TiếNg ViệT (Vietnamese)',
  cy: 'Cymraeg (Welsh)',
  xh: 'Isixhosa (Xhosa)',
  yi: 'יידיש (Yiddish)',
  yo: 'Yoruba (Yoruba)',
  zu: 'Isizulu (Zulu)'
}
 
const TranslateContext = React.createContext(undefined)
 
/**
* Custom hook that throws an error when TranslateContext is used outside of an
* TranslateProvider component. Also helps with our type check
*/
export const useTranslateContext = () => {
  const context = React.useContext(TranslateContext)
  if (context === undefined) {
    throw new Error('TranslateContext must be used within the TranslateProvider')
  }
  return context
}

/**
* Sets the context for the translate API
* @prop `children` - node to be rendered once the context is established
*/
const TranslateProvider = props => {
  const [language, setStoredLanguage] = useState('en')

  // The context value
  const value = {
    language,
    setLanguage: (lang) => {
      setLanguage(lang)
      setStoredLanguage(lang)
    }
  }

  // Updates the stored language in the context from Google's cookie
  const firstStoredUpdate = () => {
    const googleCookie = getCookie('googtrans')
    if (googleCookie === undefined) return

    const langs = googleCookie.split('/')
    if (langs.length < 3) return

    setStoredLanguage(langs[2])
  }

  const googleTranslateElementInit = () => {
    const settings = {
      pageLanguage: 'en',
      autoDisplay: false
    }
    new window.google.translate.TranslateElement(settings, 'google_translate_element') // eslint-disable-line no-new
  }

  // Once the page loads, add the google translator
  useEffect(() => {
    const addScript = document.createElement('script')
    const translateScript = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    addScript.setAttribute('src', translateScript)
    document.body.appendChild(addScript)
    window.googleTranslateElementInit = googleTranslateElementInit
    firstStoredUpdate()
  }, [])

  return (
    <TranslateContext.Provider value={value}>
      <div id='google_translate_element' style={{ display: 'none' }} />
      {props.children}
    </TranslateContext.Provider>
  )
}

/**
* Hijacks the Google Translate hidden element to set the language
* @param langauge - which language to set
* @param attempts - how many times to attempt to set the language before giving up
* Defaults to 3 attempts
*/
const setLanguage = (langauge, attempts = 3) => {
  // If we've tried 3 times and it hasn't worked, just give up
  if (attempts <= 0) return

  const selector = getGTranslateSelector()

  // If the DOM doesn't have google translate loaded yet, then wait before attempting again
  if (selector === undefined) {
    setTimeout(() => setLanguage(langauge, attempts - 1), 500)
    return
  }

  selector.value = langauge
  // The google translate selector takes the first event for the setting of the option
  // and the section to actually update the page's langauage
  fireTranslateEvent(selector)
  fireTranslateEvent(selector)
}

/**
* @returns the DOM element for the Google Translate selector
*/
const getGTranslateSelector = () => {
  const translateParent = document.getElementById('google_translate_element')
  if (translateParent === null) return undefined
  if (translateParent.innerHTML.length === 0) return undefined

  const selectors = document.getElementsByTagName('select')
  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].className === 'goog-te-combo') return selectors[i]
  }

  return undefined
}

/**
* Fires a change event through the selector for the translator
* @param selector - the selector from the Google Translate DOM
*/
const fireTranslateEvent = (selector) => {
  try {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true
    })

    selector.dispatchEvent(event)
  } catch (e) {
    console.error('Failed to select language')
    console.error(e)
  }
}

export default TranslateProvider