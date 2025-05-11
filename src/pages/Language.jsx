"use client"

import { useTranslation } from "react-i18next"
import { useContext, useEffect } from "react"
import { Check, Globe } from "lucide-react"
import { motion } from "framer-motion"

import { TransContext } from "../context/TransContext"
import { changeLanguage } from "../i18n"

const Language = () => {
  const { t, i18n } = useTranslation()
  const language = i18n?.language
  const { state, dispatch } = useContext(TransContext)

  useEffect(() => {
    // Ensure i18n and document language settings are synced
    changeLanguage(state.language)
  }, [state.language])

  const languages = [
    {
      code: "ar",
      name: t("language.arabic"),
      nativeName: "العربية",
      flag: "AR",
      // Use placeholder image for missing images
      img: "data:image/webp;base64,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"
    },
    {
      code: "en",
      name: t("language.english"),
      nativeName: "English",
      flag: "EN",
      // Use placeholder image instead of external URL
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/2560px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
    },
    {
      code: "fr",
      name: t("language.french"),
      nativeName: "Français",
      flag: "FR",
      // Use placeholder image instead of data URL
      img: "data:image/webp;base64,UklGRvYEAABXRUJQVlA4IOoEAADQKACdASq5AHcAPoUioVClKCUlFYEAEIljbTwwDNyScsGGuWA86ltNuBjx9+DLpKq4+4D25llq1ZXxfrv9TORqiwUHi8keLFr5sm3baJoiMTOkcLn9rnLhKLNeBMWeYADLHlBUUAzrcGx56axy6H4OsjOl1EhTdd91mZLnObXYUXIQGmzBX+oeAA9GrU+ry6+EfnyL43WWPPCqlHE/8FUMFsxsubNol7RR2aXqMAryeEs/xOOgbBCBrRm7Bg0BdTA64dED8iJQcvrzDm8fPfC41R2Amef2XrabB945cZdudfpmH1pWsv4C2p45gYNnnmgYRHVtRWb8GSTIucOfRxYRwf1iWwDVwmEObmIHkXn9uwJOB1pc6C5vTJFHikY9q8N8ydbnd2BcjPrVPR2Wh1xkFM8erNm5+OzN1ygkQXLW4sXuR7O9FHRofurm3tTyhAD+6gH8a9joJ1+L+85wFZ/bopTD9++AL5+rscL9cXzpGkgodg7fON2iWan6oGqtmf89Nl7d/0lak3iriJEEYrjU7TnofeS3nOx4kFMFmig8L8lrEd54Vu88t1fttuJE2/VrJZarr97Hkw8MlvQkN0YHYkvOCLa6yQy2gsFmWVZY3HHeM2Jh1Q+3Ehg+pdrfpqz86bGseDxut7DtcLT6EU/e3Kyp/3AiD2Ezcp0CJxgXE6kgGXryiG1+yaOb5vaAL0/xEpEfMFiHYyUKm9TYbK85OtJrPrfaQnzvnbClRF42NXF6eK4bjQRpWHgiWbYRhUXKEAfctdtKUpSlKo7bxvpMc4HWBTymxK8O642JyT38Xxa1sLcGzh1p8HaIPZqq+SSX+F9Kyxec+wgix2oylUCTC8msYIRtRAAhtRPzXJjAUpwfiGV9ZwY8x6qRNRvvaUFXXAMC48j1jtEw/tPEolZrHGADw2nCfmzVT9vwk2xH8hoiXapjtDMFum0xyJBgud4LWYI96XEe/EydIQINg9xivjp4Wgic/2ht5rD1cyAI9GyL1O3ldysm2wZPi/zS6bBgkYBEtWspbX0B/NAnJHcbpIHs74UcjjZTbuXfWIWCxUl3C6eNCRpzceFZmDhaMioUZ05P13DFL/DjRfZW/iNnd6J6Xs1fajzlOPCv94nP18GtmtCUFmotsM3di2zS3FdHfvYXFTh+G/eNj8aLrwps3lEOTmvBkkyr9Hi41yRSyobF1Aao2N5E4fDgPMeUUXiMEaG/4umfGrFTCdzUMdwRAtgqmaCnWRYw3yr7CQtrw8GAclLuvF4qIxc9I3Dcv9KnFgBJHaew8rXwXcoHFr36xmOBEWfJ7JVbAsKRIR5ae8455ImUgcRQP9nH4hI7u0RDUVmVZChUkl2PRgEZOt7+ySHQaBAaOebwmw+iyHpQIbsqu74nn0B+GUPGPT0P3N2pTvKKLrofYoX2ZtkQG96RhIlAvJ/QYooJoIl/esnkAX29osb8BepQ4Y7RNZsND7FUnmoGb1/FjBZ/2We/jALjjTPjZnk1YOZedPigDc2RYQLB70rq+X7XOoCe5ilZTBojZpMaV7cdOQJOcr7atc3CPjQOEb/dPNUKWJpFANs/i/6+FJBF2ItNewGvrxt/H6Jpo7OcbP/Ufo+3vUjxCL9m0CFmmuu6mny0dO8Q3lqDnjZHyt3LhWBSoUXBmeBXBT54W2PA1bCllRgA"
    },
    {
      code: "es",
      name: t("language.spanish"),
      nativeName: "Español",
      flag: "ES",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAACQCAMAAACyNz7gAAAB4FBMVEXGCx7/xAD/xQDFAB7LKR35vQj/xwD/ygCqjgWrBxqkewiqJRiuFRnNzc2ZWA2qFxnCswDYqwbgqwDdogejHBelBQmgfHmbYgu8pwC2trbfsjbbuGi2ogCoShT/zgDKx8DFrnStrq/DxcfM0Nmip7GZAACxmASchQDjswCfABiVEhXIugCvNxWZUQ65XRCsAACHdgCiklbasU2CAAAAXdKZMxG+oQBmc3h+f1mtkk70viPntCOQhi+WkEmymSj7xR7DoTyzmECPhV/IqFSoj0DGnhiXhBiUhkSghS6RiVTrqwbkngCyr4belQ3EahGhljmTZhTTfhC/VBSZblCPVhanXUe0RhOVcwucNj1/Hg+xiAOkUVetZg6cNiGnOjidRD2tc3eYSC6TQg+gICu5ewyPkhpTej++rD26qkt4iS09cUBtWwdmQQtkTABXJgZbBgt9ABJ0Og5YTA2ANQ2XVzGXbjTEvKinpZSRkHi3lKS+cYN6UweQQWLzbKzaY4zEi53AepmcjYu7XofEToXJsrpyVjsjQOA7Ta46VIdiV1pPWqDddqR7cimtbzxLa8Q2QZBANcOPD0U+YH0AV5uVbn65jmdhNWJULm9xemZVbZjDkj4/PHsAk3F3iKVain1WcGeNjJYWAAAIdUlEQVR4nO2bi1faWBrAJbskhAQQjbwKVDLyCBtDZAqtj4IPgpUOVCmFGpnWYmZ3du3s2K2tdbvuiDpTd3TG3Tqd0Xbt/Kt7b6SjPWd65kDpxnju70jiIfdw8jvfzXe/m5t0dCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCISO+d15peP355UO43mlAzuvdBjOK8hMfyAz/dEuMwxv0w+1jbbFzIi165faRJvMcHsocsbU2mUWSRrPWH9shxmG4/7LVwbBrg0/1jbe0wxUMYb00PDQ0MjVFNil07Cuac+ZvS/vY3YcI89oJjM2On45kxkcGxsdNhjBgbMg17oZhg974hPx0YwUiUTs2bDJDnZSZmIiHo+fhWuuZTPMEB8Nh02pcQnEjiCyV+0EjuNYdtJkMqUGh7RXa90sfk0yEn7jVMRvMOauj3wiX88ZcULKpP14xDQwrHmHbNUMHxoIEX7M2DUl5Qs8Gb3xyTRHlme6U5lh4IuJE2mt1Vo282Tsxplimb+ZoUiSJq9dLdE0Sfomb/FlodsfzmgetJbN4jdkoESSVD9DAienqwZ3jBN+R5ZDY/o1GxqsABWa7PdaEz28GeDsocoVbxQKJrJxzevI1jPIaMXKMaRPtppDt2+FzLNhea7mKjllnuSYatajeXJs3cxoN5nkTxPm/hp15y7NmxnyJsdba+ZPE8mwN6J5yFoxa5RPmF+Y9s3fI6vhmtME+qK5YnL2m3wxx4LTmifeaqoJTZvhRCR9XD1hfrsT+FSc4XDFVKmAbThsFSsVqxI5FsNxo1G7KrlZMyKSNyvADf6P4ZFQJZX67I+f/alz2il/7v3zX7w3wmLy+KgBS0ckU6OpBjRpRuT5Ss3nLDYKQzxndaVC2WxWBGTD2Wwo5LUaGse6lH5rqb+qVaHVpBneXVsUxfvVCA5nZWBeZhK/+OuXXy4tcSTdwwSDtaeiBOtH0F/xrocP7t9/UNOJGUbIf7t/f7ELiBm7IbJ5uvTgwcPZ2dm795aXlx+9HPOogIoZlxa/eLooaTWlaTZmdlcoFEomIzjezVMQdcszjIO9eIrHXTgeSTaafpgz/y2aNvO6AKoZo9Yg0agN7Ogeh+WYlSdwexGaqU1dOjHDMDVZSDi44hgoRopigjw2cwPY1b8/GmdXWWBmMMqwqayT3GjAUwMDk5P2hhlTK9We1koJ1SywseV2/GPtnytfratmmDQA2kq6MetlLwYCnoYZWRITpdIio5rVN9ZZ98bapuWrVYtqdoG96O6L68fsI4v7jRmZgMOYGH7KqNdZYGNzc21tM7CqXmcGwwXWwurVrCaqQ3TDzO3e2dzcXLWssjo2I3C1N0YrqtpDm2o2v76zvra2ZdnaUnMjriszjABmgcCo0eiHZj1ffyOKz7Z96nXGOn5wW1bXdthVYAbv+0wEWGimi5EaT+ce3Q2WYzzPRRPALPgvaPatrzGesZa+nc21TdgbEwmO4mPF4F1nTqMFqKbM8JwgFIpCsUBVKZKL0rRtelcUR3YTdJSb22Itlq1V0B9BArG4g+UqL8RmBIVOzGhzX7UpMyJBCsXg8tzN6kyRWYrStoeiuHtFFJ/OMrFg7K7bvb6xs7qxswXMPmaqhe8ct+4Vi0K5oEl/bMrM7yP5m5bjDILlGZoB2eP7b66Ii8GFvWd7C3cC9bqbrW+6QdbvNhxnkMCyj585+zHDu5bU7B5wdhsIUDfaStPT3/776+nEf54/u7S9H5yH19oPG426Mf8Cms31JLrOvhmGFWLz0GwhGiFgbuQ4Lhi0ccEfR658P3nlpwU3vMQCqhnR9fH8sVlem+zYZG405EDWZwN3uBzRHeWiHPwDn1e7B892p/aCIM0f4+7y53vm4Hj2MqfRbZ4WxjPWEaS5bsLudUZN4WjFm5i17e1vH2zv7wV/gbf7FbIn6gB1I/FhTvw3ac4MI4wv5m2xGJ/HwBzUaQuZSLOXqvE/XXoeOrz0I18tKkIVbHjKThAFKhZbmH+JaaTWpFm+yMRiwTmJAGbeN2bW6sLe/sj+XiwhC1JVURQXMMMx/OVcLBZjhG4djNREniRjwfm6WhGfMvNSC6/2Xy1Q/TQtgYFBEWzADM5iArdjPSRz/eznRiLPlV9YGrX+KbPOUhREJ1EtJClJUCQ+WYZmsNa3BL6jbDoww3NL+V9mMSfXmbXTFw31c7IAoiUICtjxb8zYPo+gh/HMgBWEd5j9wUoqFF8VRpyFMqVQJ2ZxRtHFeBbJvdOMUmRZUv47pcigP54yu66P8Qwn3h0zmaKLBXO1wL8dM32MZ+qc+qNfN6NlhZeEoiAXyicZRD9zagORWVl58kT6tZhViwWFkgVB5kHM4I3/+Apoq9niZ7PVlSEMSeLw6bjTZp03SapTIEHWJylXlazhGIZJsKle7qSCUQwSgiFJWk/Mgp8HbvNSoUwKNl6QBE72gylPSG1q18Xdb8wgpbwubygFbxKnS6ditvLYQdOKVJCrskSRNQKGLBVyubwprRZjmpufpcef1y9vg8/hKFAzLr0x66/3Lvc6Yj3lcrLg48kECCkx+Lx+tH14uX44pU12bC5m6V5wsn1924dHwAyomcxcJcSXbgTY3lu9FwO3OZrkOKYKV3CJgUPYFGwGdFARY+mDwyPgdnQEYwaX2O3Ktal6Hxt4/fPBz69fs32OuWUl4ofHiPHDo8ND2HRcBzHDsMzAxODB+MTEeGOJBSeG4hd6V9x9kMDj3gueocbTBMTY+ETm4ElmYmpQBzGDUcLxNFyGxk6+AaEcGvZ4PMND6dNPgMB17DR2uun/l/Y8+62uxmv+PNLboLdH9Acy0x/n2EzTt0w/JOf4rWOtX+j+YJzjt/sRCAQCgUAgEAgEAoFAIBAIBAKBQCAQCARCx/wPvpny0Bd0868AAAAASUVORK5CYII="
    },
  ]

  const handleLanguageChange = (code) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: code })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-10 pt-14">
            <Globe className="text-orange-600 mr-2" size={28} />
            <h1 className="text-2xl font-bold text-teal-50">{t("language.title")}</h1>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              variants={itemVariants}
              onClick={() => handleLanguageChange(lang.code)}
              className={`relative p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md h-32 
                ${language === lang.code
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 shadow-md"
                  : "bg-white border border-gray-100 hover:border-gray-200"}`}
            >
              <div className="absolute right-0 top-0 bottom-0 left-24 rounded-r-xl bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${lang.img})` }}
              />
              <div className="absolute inset-0 bg-teal-950 bg-opacity-10" />
              <div className="bg-teal-900 absolute top-0 left-0 bottom-0 w-24 p-1 flex flex-col items-center justify-center rounded-l-xl">
                <span className="text-4xl mb-3 text-orange-500">{lang.flag}</span>
                <span className="text-sm text-teal-50 mt-1">{lang.nativeName}</span>
              </div>

              {language === lang.code && (
                <div className="absolute top-3 right-3 bg-blue-500 w-10 h-10 text-teal-50 p-1 rounded-full flex items-center justify-center">
                  <Check size={20} />
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Language