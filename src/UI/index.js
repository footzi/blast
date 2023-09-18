import { Progress } from './Progress';
import { ScorePanel } from './ScorePanel';

export class UI {
  constructor(rootContainer) {
    this.progress = new Progress(rootContainer);
    this.score = new ScorePanel(rootContainer);
  }

  paint() {
    this.progress.paint();
    this.score.paint();
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
}
