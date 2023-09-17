import { Graphics, Text } from 'pixi.js';

const textStyle = {
  fontFamily: 'Arial', // Шрифт
  fontSize: 36, // Размер шрифта
  fill: 0xff0000, // Цвет текста (красный)
  fontWeight: 'bold', // Жирный шрифт
  align: 'center',
};

export class UI {
  constructor(block) {
    this.block = block;
    this.mixingButton = new Graphics();
    this.busterBomba = new Graphics();
    this.restartButton = new Graphics();

    this.score = null;
    this.step = null;
  }

  paint() {
    this.paintMixingButton();
    this.paintBusterBombaButton();
    this.paintScore();
    this.paintStep();
    this.paintProgress();
  }

  paintMixingButton() {
    this.mixingButton.eventMode = 'static';

    this.mixingButton.beginFill('red');
    this.mixingButton.drawRect(0, 0, 80, 20);

    this.mixingButton.position.x = 500;
    this.mixingButton.position.y = 100;

    this.block.addChild(this.mixingButton);
  }

  onMixingButtonClick(callback) {
    this.mixingButton.on('pointerdown', () => callback(this));
  }

  paintBusterBombaButton() {
    this.busterBomba.eventMode = 'static';

    this.busterBomba.beginFill('black');
    this.busterBomba.drawRect(0, 0, 80, 20);

    this.busterBomba.position.x = 500;
    this.busterBomba.position.y = 150;

    this.block.addChild(this.busterBomba);
  }

  onBusterBombaClick(callback) {
    this.busterBomba.on('pointerdown', () => callback(this));
  }

  paintScore() {
    this.score = new Text('0', textStyle);
    this.score.x = 600;
    this.score.y = 300;

    this.block.addChild(this.score);
  }

  paintStep() {
    this.step = new Text('0', {
      ...textStyle,
      fill: 'blue',
    });
    this.step.x = 700;
    this.step.y = 300;

    this.block.addChild(this.step);
  }

  updateScore(score) {
    this.score.text = score;
  }

  updateStep(step) {
    this.step.text = step;
  }

  showGameFailed() {
    this.restartButton.eventMode = 'static';
    const block = new Graphics();

    block.beginFill('white');
    block.drawRect(0, 0, 100, 100);

    block.position.x = 500;
    block.position.y = 150;

    const text = new Text('Игра закончилась');
    block.addChild(text);

    this.restartButton.beginFill('black');
    this.restartButton.drawRect(0, 0, 80, 20);

    this.restartButton.position.x = 30;
    this.restartButton.position.y = 30;

    const buttonText = new Text('Попробовать еще', {
      ...textStyle,
      fontSize: 10,
    });
    this.restartButton.addChild(buttonText);
    this.block.addChild(this.restartButton);
    block.addChild(this.restartButton);

    this.block.addChild(block);
  }

  showGameWin() {
    alert('YOU WIN');
  }

  onRestartButtonClick(callback) {
    this.restartButton.on('pointerdown', () => callback(this));
  }

  paintProgress() {
    this.progress = new Text('0%', {
      ...textStyle,
      fill: 'green',
    });
    this.progress.x = 800;
    this.progress.y = 300;

    this.block.addChild(this.progress);
  }

  updateProgress(value) {
    this.progress.text = `${value}%`;
  }
}
