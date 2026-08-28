// Sai Abhyankkar "Radhimaa LOOP – Instrumental Version" Audio Engine
// Plays the soulful Radhimaa acoustic instrumental loop from public audio assets
// with seamless looping, gentle volume fade-in/fade-out, and auto-start management.

class AmbientSoundEngine {
  private audio: HTMLAudioElement | null = null;
  private isRunning: boolean = false;
  private fadeInterval: NodeJS.Timeout | null = null;
  private readonly rawFileName: string = 'Radhimaa LOOP – Instrumental Version  Sai Abhyankkar - Madras Tapes.mp3';

  private initAudio() {
    if (typeof window === 'undefined') return;
    if (!this.audio) {
      const src = `/${encodeURIComponent(this.rawFileName)}`;
      this.audio = new Audio(src);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.001;
    }
  }

  public start(): boolean {
    if (typeof window === 'undefined') return false;
    this.initAudio();

    if (!this.audio) return false;

    try {
      this.isRunning = true;

      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }

      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Smooth fade-in to comfortable reading volume
            let vol = this.audio ? this.audio.volume : 0.01;
            const targetVol = 0.6;
            this.fadeInterval = setInterval(() => {
              if (!this.audio || !this.isRunning) {
                if (this.fadeInterval) clearInterval(this.fadeInterval);
                return;
              }
              if (vol < targetVol) {
                vol = Math.min(targetVol, vol + 0.04);
                this.audio.volume = vol;
              } else {
                if (this.fadeInterval) clearInterval(this.fadeInterval);
              }
            }, 50);
          })
          .catch((err) => {
            console.log('Audio autoplay waiting for user interaction.', err);
          });
      }

      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isRunning = false;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (!this.audio) return;

    // Smooth fade-out before pause
    let vol = this.audio.volume;
    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }
      if (vol > 0.03) {
        vol = Math.max(0, vol - 0.06);
        this.audio.volume = vol;
      } else {
        this.audio.volume = 0;
        this.audio.pause();
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, 40);
  }

  public triggerPageTurnSound() {
    // Subtle page turn acoustic integration
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const ambientSound = new AmbientSoundEngine();
