import { makeSimilarAdvertisements } from './generationcard.js';
import { makePopup } from './card.js';

const adv = makeSimilarAdvertisements();
const mapCanvas = document.querySelector('#map-canvas');

const element = makePopup(adv[0]);
mapCanvas.appendChild(element);

import './util.js';
