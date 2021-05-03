import '../css/main.css'
import '../img/milly.jpg'

import { partition } from 'lodash'

const component = words => {
   const element = document.createElement('div')

  // Lodash, now imported by this script
   element.innerHTML = words.join(' ')

   let abc = _.partition([1, 2, 3, 4], n => n % 2)

   return element
}

document.body.appendChild(component(['Hello', 'webpack']))

const $items = [...document.querySelectorAll('.js-item')]
$items.forEach($item => {
  console.log($item)
})