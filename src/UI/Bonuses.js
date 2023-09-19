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
    this.paintContainer();
    this.paintBackground();
    this.paintName();
    this.paintValue();
  }

  paintContainer() {
    this.container.name = 'bonusContainer';
    this.container.setTransform(this.options.x, this.options.y);
    this.container.cursor = 'pointer';
    this.container.eventMode = 'static';

    this.rootContainer.addChild(this.container);
  }

  paintBackground() {
    this.background.name = 'bonus';

    const size = getRatioSize(Bonus.WIDTH, {
      width: this.background.width,
      height: this.background.height,
    });

    this.background.width = size.width;
    this.background.height = size.height;

    this.container.addChild(this.background);
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
    name.y = 15;

    this.container.addChild(name);
  }

  paintValue() {
    this.value = new Text(
      '5',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    this.value.x = 40;
    this.value.y = 60;

    this.container.addChild(this.value);
  }

  onClick(callback) {
    this.container.on('pointerdown', () => callback(this));
  }

  updateValue(value) {
    this.value.text = value;
  }
}

export class Bonuses {
  static MARGIN_TOP = 460;
  static MARGIN_LEFT = 550;
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
    text.x = Bonuses.WIDTH / 2;

    this.container.addChild(text);
    this.rootContainer.addChild(this.container);
  }

  onMixClick(callback) {
    this.mixBonus.onClick(callback);
  }

  onBombClick(callback) {
    this.bombaBonus.onClick(callback);
  }

  updateMixCount(value) {
    this.mixBonus.updateValue(value);
  }
}
