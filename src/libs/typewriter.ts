import LibTypewriter from 'typewriter-effect/dist/core'

export class Typewriter {
  static startEffect(cssSelector: string, words: string[]) {
    new LibTypewriter(cssSelector, {
      strings: words,
      autoStart: true,
      loop: true
    });
  } 
}