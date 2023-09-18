import { Progress } from './Progress';

export class UI {
  constructor(rootContainer) {
    // this.rootContainer = rootContainer;
    this.progress = new Progress(rootContainer);
  }

  paint() {
    this.progress.paint();
  }

  updateProgress(value) {
    this.progress.updateProgress(value);
  }
}
