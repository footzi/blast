import { Container, Graphics, Sprite, Text, TextStyle } from 'pixi.js';
import { gsap } from 'gsap';
import { getRatioSize } from '../utils';

export class GameStatusModal {
  static MODAL_WIDTH = 400;
  static MODAL_HEIGHT = 200;

  static BUTTON_WIDTH = 230;
  static BUTTON_MARGIN_TOP = 80;

  constructor(rootContainer, options) {
    this.rootContainer = rootContainer;
    this.options = options;

    this.container = new Container();
    this.overlay = new Graphics();

    this.modalContainer = new Container();
    this.background = Sprite.from('./assets/ui/field.png');

    this.buttonContainer = new Container();
    this.buttonBackground = Sprite.from('./assets/ui/button-background.png');
  }

  show() {
    this.paintContainer();
    this.paintOverlay();
    this.paintBackground();
    this.paintTitle();
    this.paintButton();
  }

  hide() {
    this.container.removeChildren();
  }

  paintContainer() {
    this.container.name = 'gameStatusModal';

    this.container.width = window.innerWidth;
    this.container.height = window.innerHeight;

    this.rootContainer.addChild(this.container);
  }

  paintOverlay() {
    this.overlay.beginFill('black', 0.4);
    this.overlay.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.overlay.name = 'overlay';

    this.container.addChild(this.overlay);
  }

  paintBackground() {
    this.modalContainer.name = 'gameStatusModalContainer';
    this.background.name = 'background';

    const x = window.innerWidth / 2 - GameStatusModal.MODAL_WIDTH / 2;
    const y = window.innerHeight / 2 - GameStatusModal.MODAL_HEIGHT / 2;
    this.modalContainer.setTransform(x, 0);

    this.background.width = GameStatusModal.MODAL_WIDTH;
    this.background.height = GameStatusModal.MODAL_HEIGHT;

    this.modalContainer.addChild(this.background);
    this.container.addChild(this.modalContainer);

    gsap.to(this.modalContainer, {
      y,
      duration: 1,
      ease: 'bounce.out',
    });
  }

  paintTitle() {
    const name = new Text(
      this.options.titleText,
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 26,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    name.anchor.set(0.5, 0);
    name.x = this.modalContainer.width / 2;
    name.y = 15;

    this.modalContainer.addChild(name);
  }

  paintButton() {
    this.buttonContainer.name = 'buttonContainer';
    this.buttonContainer.cursor = 'pointer';
    this.buttonContainer.eventMode = 'static';
    this.buttonBackground.name = 'buttonBackground';

    const size = getRatioSize(GameStatusModal.BUTTON_WIDTH, {
      width: this.buttonBackground.width,
      height: this.buttonBackground.height,
    });

    const x = this.modalContainer.width / 2 - size.width / 2;
    this.buttonContainer.setTransform(x, GameStatusModal.BUTTON_MARGIN_TOP);

    this.buttonBackground.width = size.width;
    this.buttonBackground.height = size.height;

    const text = new Text(
      'Попробовать еще',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    text.anchor.set(0.5, 0.5);
    text.x = this.buttonBackground.width / 2;
    text.y = this.buttonBackground.height / 2 - 2;

    this.buttonContainer.addChild(this.buttonBackground);
    this.buttonContainer.addChild(text);
    this.modalContainer.addChild(this.buttonContainer);
  }

  onClickButton(callback) {
    this.buttonContainer.on('pointerdown', () => callback(this));
  }
}
