import { Progress } from './Progress';
import { ScorePanel } from './ScorePanel';
import { Bonuses } from './Bonuses';
import { GameStatusModal } from './GameStatusModal';

export class UI {
  constructor(rootContainer) {
    this.progress = new Progress(rootContainer);
    this.score = new ScorePanel(rootContainer);
    this.bonuses = new Bonuses(rootContainer);
    this.gameFailedModal = new GameStatusModal(rootContainer, {
      titleText: 'Вы проиграли!',
    });
    this.gameWinModal = new GameStatusModal(rootContainer, {
      titleText: 'Вы выиграли!',
    });
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

  updateBusterBombaCount(value) {
    this.bonuses.updateBusterBombaCount(value);
  }

  showGameFailed() {
    this.gameFailedModal.show();
  }

  hideGameFailed() {
    this.gameFailedModal.hide();
  }

  showGameWin() {
    this.gameWinModal.show();
  }

  hideGameWin() {
    this.gameWinModal.hide();
  }

  onClickFailedRetryGame(callback) {
    this.gameFailedModal.onClickButton(callback);
  }

  onClickWinRetryGame(callback) {
    this.gameWinModal.onClickButton(callback);
  }
}
