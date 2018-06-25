import { Defer } from 'utils';

import css from './intro.scss';

import game_sound from 'assets/sounds/game.mp3';

export default class Intro {

  template = null;
  game_sound = new Audio(game_sound);
  deffered = new Defer();


  /*
  * build intro html
  */
  buildIntro() {
    const pony = `${css.intro__pony}`;
    let html = '<section class="screen">';
    html += `<div class="${css.intro}">`;
    html += `<div class="${css.intro__ponies}">`;
    html += `<div class="${pony} ${css['intro__pony--1']}"></div>`;
    html += `<div class="${pony} ${css['intro__pony--2']}"></div>`;
    html += `<div class="${pony} ${css['intro__pony--3']}"></div>`;
    html += '</div>';
    html += '</div>';
    html += '</section>';
    this.template = html;
  }

  /*
  * show / hide intro html
  * resolve promise when intro has finished playing
  */
  playIntro() {
    document.getElementById('content').innerHTML += this.template;
    this.intro_screen = document.getElementsByClassName(css.intro)[0].parentNode;

    setTimeout(() => {
      this.game_sound.volume = 0.01;
      this.intro_screen.classList.add('hide');

      setTimeout(() => {
        this.stopMusic();
        this.destroyScreen();
        this.deffered.resolve();
      }, 3000);
    }, 22000);
  }

  bindEvents() {
    this.game_sound.addEventListener('canplay', this.playMusic());
  }

  playMusic = () => {
    this.game_sound.volume = 0.05;
    this.game_sound.play();
  }

  stopMusic = () => {
    this.game_sound.pause();
  }

  /*
  * reject promise eg. if there are multiple instances
  */
  reject() {
    this.deffered.reject();
  }

  /*
  * destroy intro screen
  */
  destroyScreen() {
    this.intro_screen.remove();
  }

  /*
  * start intro
  */
  async play() {
    this.buildIntro();
    this.bindEvents();
    this.playIntro();
    return this.deffered.promise;
  }
}
