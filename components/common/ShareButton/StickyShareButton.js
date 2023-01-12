import React from 'react'
import { StickyShareButtons } from 'sharethis-reactjs'
import styles from '../Blog/blog.module.css'

const StickyShareButton = (props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${props.size === 'small' ? styles.shareThisDisabled : null}`}
    >
      <StickyShareButtons
        config={{
          alignment: 'left', // alignment of buttons (left, center, right)
          color: 'social', // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 16, // font size for the buttons
          labels: 'null', // button labels (cta, counts, null)
          language: 'en', // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            // 'whatsapp',
            'linkedin',
            // 'messenger',
            'facebook',
            'twitter',
            'reddit',
            'email'
          ],
          padding: 12, // padding within buttons (INTEGER)
          radius: 4, // the corner radius on each button (INTEGER)
          show_total: false,
          show_mobile: true,
          show_toggle: false,
          size: 48, // the size of each button (INTEGER)
          top: 200,

          // OPTIONAL PARAMETERS //TODO: need to customize to corresponding blog
          url: props.url, // (defaults to current url)
          image: props.image, // (defaults to og:image or twitter:image)
          description: props.description, // (defaults to og:description or twitter:description)
          title: props.title, // (defaults to og:title or twitter:title)
          // message: 'custom email text', // (only for email sharing)
          subject: props.title, // (only for email sharing)
          username: 'Broadbandmoney' // (only for twitter sharing)
        }}
      />
    </div>
  )
}

export default StickyShareButton
