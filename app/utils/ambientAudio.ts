// Sai Abhyankkar "Radhimaa LOOP" Audio Engine
// Robust, high-reliability background audio playback for web and mobile browsers.

class AmbientSoundEngine {
  private audio: HTMLAudioElement | null = null;
  private isRunning: boolean = false;
  private readonly sources: string[] = [
    '/Radhimaa%20LOOP%20%E2%80%93%20Instrumental%20Version%20%20Sai%20Abhyankkar%20-%20Madras%20Tapes.mp3',
    '/Radhimaa LOOP – Instrumental Version  Sai Abhyankkar - Madras Tapes.mp3',
    '/Mouna%20Ragam%20BGM%20-%20Tamil%20BGM.mp3',
  ];

  private initAudio() {
    if (typeof window === 'undefined') return;
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = this.sources[0];
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.65;

      // Handle loading error by falling back to next available source
      let sourceIdx = 0;
      this.audio.onerror = () => {
        sourceIdx++;
        if (sourceIdx < this.sources.length && this.audio) {
          this.audio.src = this.sources[sourceIdx];
          if (this.isRunning) {
            this.audio.play().catch(() => {});
          }
        }
      };
    }
  }

  public start(): boolean {
    if (typeof window === 'undefined') return false;
    this.initAudio();

    if (!this.audio) return false;

    try {
      this.isRunning = true;
      this.audio.volume = 0.65;

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback pending user gesture:', err);
        });
      }

      return true;
    } catch (e) {
      console.warn('Audio start error:', e);
      return false;
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.audio) {
      try {
        this.audio.pause();
      } catch {}
    }
  }

  public triggerPageTurnSound() {
    // Optional gentle page turn click feedback
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const ambientSound = new AmbientSoundEngine();
