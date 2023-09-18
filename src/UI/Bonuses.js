import { Container, Sprite, Text, TextStyle } from 'pixi.js';
import { getRatioSize } from '../utils';

export class Bonus {
  static WIDTH = 100;

  constructor(rootContainer, options) {
    this.rootContainer = rootContainer;
    this.options = options;

    this.container = new Container();
    this.background = Sprite.from('./assets/ui/bonus-background.png');
  }

  paint() {
    this.paintBackground();
    this.paintName();
    this.paintValue();
  }

  paintBackground() {
    this.background.setTransform(this.options.x, this.options.y);
    this.background.name = 'bonus';

    const size = getRatioSize(Bonus.WIDTH, {
      width: this.background.width,
      height: this.background.height,
    });

    this.background.width = size.width;
    this.background.height = size.height;

    this.container.addChild(this.background);
    this.rootContainer.addChild(this.container);
  }

  paintName() {
    const name = new Text(
      this.options.name,
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    name.anchor.set(0.5, 0);
    name.x = this.container.width / 2;
    name.y = 65;

    this.container.addChild(name);
  }

  paintValue() {
    const value = new Text(
      '5',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    value.x = 36;
    value.y = 104;

    this.container.addChild(value);
  }

  changeValue() {}
}

export class Bonuses {
  static MARGIN_TOP = 460;
  static MARGIN_LEFT = 500;
  static WIDTH = 200;

  static MIX_BONUS_MARGIN_TOP = 45;
  static MIX_BONUS_MARGIN_LEFT = 0;

  static BOMBA_BONUS_MARGIN_TOP = 45;
  static BOMBA_BONUS_MARGIN_LEFT = 100;

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.container = new Container();

    this.mixBonus = new Bonus(this.container, {
      x: Bonuses.MIX_BONUS_MARGIN_LEFT,
      y: Bonuses.MIX_BONUS_MARGIN_TOP,
      name: 'Mix',
    });

    this.bombaBonus = new Bonus(this.container, {
      x: Bonuses.BOMBA_BONUS_MARGIN_LEFT,
      y: Bonuses.BOMBA_BONUS_MARGIN_TOP,
      name: 'Bomb',
    });
  }

  paint() {
    this.paintBonuses();

    this.mixBonus.paint();
    this.bombaBonus.paint();
  }

  paintBonuses() {
    this.container.setTransform(Bonuses.MARGIN_LEFT, Bonuses.MARGIN_TOP);
    this.container.width = Bonuses.WIDTH;
    this.container.name = 'bonuses';

    const text = new Text(
      'Бонусы',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    text.anchor.set(0.5, 0);
    text.x = this.container.width / 2;

    this.container.addChild(text);
    this.rootContainer.addChild(this.container);
  }
}
