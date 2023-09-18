import { Container, Sprite, Text, TextStyle } from 'pixi.js';
import { gsap } from 'gsap';
import { getRatioSize } from '../utils';

export class Progress {
  static BACKGROUND_WIDTH = 440;
  static BACKGROUND_MARGIN_LEFT = 200;
  static BACKGROUND_MARGIN_TOP = -20;
  static BAR_WIDTH = 400;
  static BAR_MARGIN_TOP = 40;
  static BAR_MARGIN_RIGHT = (Progress.BACKGROUND_WIDTH - Progress.BAR_WIDTH) / 2;

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.container = new Container();
    this.background = Sprite.from('./assets/ui/progress-bar.png');

    this.barContainer = new Container();
    this.barBackground = Sprite.from('./assets/ui/bar-background.png');
    this.bar = Sprite.from('./assets/ui/bar.png');
  }

  paint() {
    this.paintContainer();
    this.paintBackground();
    this.paintText();
    this.paintBar();

    this.rootContainer.addChild(this.container);
  }

  paintContainer() {
    this.container.setTransform(Progress.BACKGROUND_MARGIN_LEFT);
    this.container.name = 'progress';
  }

  paintBackground() {
    this.background.name = 'background';
    this.background.setTransform(0, Progress.BACKGROUND_MARGIN_TOP);

    const size = getRatioSize(Progress.BACKGROUND_WIDTH, {
      width: this.background.width,
      height: this.background.height,
    });

    this.background.width = size.width;
    this.background.height = size.height;

    this.container.addChild(this.background);
  }

  paintText() {
    this.text = new Text(
      'Прогресс',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    this.text.anchor.set(0.5, 0);
    this.text.x = this.container.width / 2;
    this.container.addChild(this.text);
  }

  paintBar() {
    this.barContainer.name = 'bar';
    this.barContainer.setTransform(Progress.BAR_MARGIN_RIGHT, Progress.BAR_MARGIN_TOP);

    const size = getRatioSize(Progress.BAR_WIDTH, {
      width: this.barBackground.width,
      height: this.barBackground.height,
    });
    this.barBackground.width = size.width;
    this.barBackground.height = size.height;

    this.bar.width = 0;
    this.bar.height = size.height;

    this.barContainer.addChild(this.barBackground);
    this.barContainer.addChild(this.bar);

    this.container.addChild(this.barContainer);
  }

  updateProgress(value) {
    const newWidth = Progress.BAR_WIDTH * value;

    gsap.to(this.bar, {
      width: newWidth,
      duration: 0.3,
    });
  }
}
