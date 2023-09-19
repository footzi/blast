import { Progress } from './Progress';
import { ScorePanel } from './ScorePanel';
import { Bonuses } from './Bonuses';

export class UI {
  constructor(rootContainer) {
    this.progress = new Progress(rootContainer);
    this.score = new ScorePanel(rootContainer);
    this.bonuses = new Bonuses(rootContainer);
  }

  paint() {
    this.progress.paint();
    this.score.paint();
    this.bonuses.paint();
  }

  updateProgress(value) {
    this.progress.updateProgress(value);
  }

  updateSteps(value) {
    this.score.updateSteps(value);
  }

  updateScore(value) {
    this.score.updateScore(value);
  }

  onMixBonusClick(callback) {
    this.bonuses.onMixClick(callback);
  }

  onBombaBonusClick(callback) {
    this.bonuses.onBombClick(callback);
  }

  updateMixCount(value) {
    this.bonuses.updateMixCount(value);
  }
}
