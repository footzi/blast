import { Container, Sprite, Text, TextStyle } from 'pixi.js';
import { getRatioSize } from '../utils';

export class ScorePanel {
  static BACKGROUND_WIDTH = 300;
  static BACKGROUND_MARGIN_LEFT = 500;
  static BACKGROUND_MARGIN_TOP = 160;

  static STEPS_WIDTH = 150;
  static STEPS_MARGIN_TOP = 5;
  static STEPS_MARGIN_RIGHT = (ScorePanel.BACKGROUND_WIDTH - ScorePanel.STEPS_WIDTH) / 2;

  static SCORE_WIDTH = 200;
  static SCORE_MARGIN_TOP = 150;
  static SCORE_MARGIN_RIGHT = (ScorePanel.BACKGROUND_WIDTH - ScorePanel.SCORE_WIDTH) / 2;
  static SCORE_LABEL_TEXT_MARGIN_TOP = 5;
  static SCORE_VALUE_TEXT_MARGIN_TOP = 30;

  constructor(rootContainer) {
    this.rootContainer = rootContainer;
    this.container = new Container();
    this.background = Sprite.from('./assets/ui/score-panel.png');

    this.stepsContainer = new Container();
    this.steps = Sprite.from('./assets/ui/steps-background.png');

    this.scoreContainer = new Container();
    this.score = Sprite.from('./assets/ui/score-background.png');
  }

  paint() {
    this.paintContainer();
    this.paintBackground();
    this.paintSteps();
    this.paintStepsText();
    this.paintScore();
    this.paintScoreText();
  }

  paintContainer() {
    this.container.setTransform(ScorePanel.BACKGROUND_MARGIN_LEFT, ScorePanel.BACKGROUND_MARGIN_TOP);
    this.container.name = 'score';
    this.rootContainer.addChild(this.container);
  }

  paintBackground() {
    this.background.name = 'background';

    const size = getRatioSize(ScorePanel.BACKGROUND_WIDTH, {
      width: this.background.width,
      height: this.background.height,
    });

    this.background.width = size.width;
    this.background.height = size.height;

    this.container.addChild(this.background);
  }

  paintSteps() {
    this.steps.name = 'steps';
    this.stepsContainer.name = 'stepsContainer';
    this.steps.setTransform(ScorePanel.STEPS_MARGIN_RIGHT, ScorePanel.STEPS_MARGIN_TOP);

    const size = getRatioSize(ScorePanel.STEPS_WIDTH, {
      width: this.steps.width,
      height: this.steps.height,
    });

    this.steps.width = size.width;
    this.steps.height = size.height;

    this.stepsContainer.addChild(this.steps);
    this.container.addChild(this.stepsContainer);
  }

  paintStepsText() {
    this.stepsText = new Text(
      '0',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    this.stepsText.anchor.set(0.5, 0.5);
    this.stepsText.x = this.container.width / 2;
    this.stepsText.y = this.stepsContainer.height / 2;
    this.stepsContainer.addChild(this.stepsText);
  }

  updateSteps(value) {
    this.stepsText.text = value;
  }

  paintScore() {
    this.score.name = 'score';
    this.scoreContainer.name = 'scoreContainer';
    this.scoreContainer.setTransform(ScorePanel.SCORE_MARGIN_RIGHT, ScorePanel.SCORE_MARGIN_TOP);

    const size = getRatioSize(ScorePanel.SCORE_WIDTH, {
      width: this.score.width,
      height: this.score.height,
    });

    this.score.width = size.width;
    this.score.height = size.height;

    this.scoreContainer.addChild(this.score);
    this.container.addChild(this.scoreContainer);
  }

  paintScoreText() {
    const label = new Text(
      'Очки:',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    label.anchor.set(0.5, 0);
    label.x = this.scoreContainer.width / 2;
    label.y = ScorePanel.SCORE_LABEL_TEXT_MARGIN_TOP;

    this.scoreText = new Text(
      '0',
      new TextStyle({
        fontFamily: 'ShantellSans',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#FFFFFF',
        align: 'center',
      })
    );

    this.scoreText.anchor.set(0.5, 0);
    this.scoreText.x = this.scoreContainer.width / 2;
    this.scoreText.y = ScorePanel.SCORE_VALUE_TEXT_MARGIN_TOP;

    this.scoreContainer.addChild(label);
    this.scoreContainer.addChild(this.scoreText);
  }

  updateScore(value) {
    this.scoreText.text = value;
  }
}
