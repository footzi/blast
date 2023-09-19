import { Game } from './Game';

new Game({
  maxMixBonusCount: 5,
  maxBusterBombaBonusCount: 3,
  busterBombaBonusRadius: 2,
}).init();

// import { Application, Container, Graphics, Sprite } from 'pixi.js';
// import { BACKGROUND_COLOR } from './constants';
//
// const app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
// document.body.appendChild(app.view);
// globalThis.__PIXI_APP__ = app;
//
// const container = new Graphics();
// container.beginFill('gray').drawRect(0, 0, 100, 100).setTransform(0, 0);
// app.stage.addChild(container);
//
// const bunny = Sprite.from('https://pixijs.com/assets/bunny.png');
// bunny.width = 100;
// bunny.height = 100;
// // container.beginFill('gray').drawRect(0, 0, 100, 100).setTransform(0, 0);
// bunny.addChild(container);
//
// const block = new Graphics();
// block.beginFill('blue').drawRect(0, 0, 80, 20);
// app.stage.addChild(block);

//
// const newWidth = 300; // Новая ширина
// sprite.width = newWidth;
// sprite.height = (newWidth / sprite.width) * sprite.height;
