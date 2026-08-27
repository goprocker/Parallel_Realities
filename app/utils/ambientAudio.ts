// Cinematic Lofi Ambient Soundscape Engine (Web Audio API)
// Creates evolving warm chords, gentle filter swells, and soothing music-box notes.

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private chordInterval: NodeJS.Timeout | null = null;
  private chimeInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private currentChordIndex: number = 0;
  private activeOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Warm chord progressions in Hz (Dmaj9 -> Bm9 -> Gmaj9 -> A7sus4)
  private readonly chords: number[][] = [
    [146.83, 220.0, 277.18, 369.99, 440.0], // Dmaj9: D3, A3, C#4, F#4, A4
    [123.47, 185.0, 220.0, 293.66, 369.99],  // Bm9: B2, F#3, A3, D4, F#4
    [98.0, 196.0, 246.94, 293.66, 369.99],   // Gmaj9: G2, G3, B3, D4, F#4
    [110.0, 220.0, 293.66, 329.63, 440.0],   // A7sus: A2, A3, D4, E4, A4
  ];

  // Pentatonic scale for soft piano/chime droplets
  private readonly chimeNotes: number[] = [440.0, 554.37, 659.25, 739.99, 880.0, 1108.73];

  public start(): boolean {
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const ctx = this.ctx;

      // Master output gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2.0);
      this.masterGain.connect(ctx.destination);

      // Warm stereo echo delay network
      this.delayNode = ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.42, ctx.currentTime);

      this.delayGain = ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.32, ctx.currentTime);

      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(800, ctx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayGain);
      this.delayGain.connect(this.delayNode);
      this.delayGain.connect(this.masterGain);

      this.isRunning = true;

      // Start initial chord
      this.playChord(this.chords[0]);

      // Cycle chords smoothly every 7 seconds
      this.chordInterval = setInterval(() => {
        if (!this.isRunning) return;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.currentChordIndex]);
      }, 7000);

      // Play soothing music-box / piano droplets periodically
      this.scheduleNextChime();

      return true;
    } catch {
      return false;
    }
  }

  private playChord(freqs: number[]) {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Gently fade out existing oscillators
    const oldOscs = [...this.activeOscillators];
    this.activeOscillators = [];
    oldOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 3.0);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        }, 3200);
      } catch {}
    });

    // Create warm chord pad
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(320, now);
    padFilter.frequency.linearRampToValueAtTime(520, now + 3.5);
    padFilter.frequency.linearRampToValueAtTime(340, now + 7.0);
    padFilter.connect(this.masterGain);

    freqs.forEach((freq, idx) => {
      // Primary sine oscillator
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detuned secondary oscillator for lush stereo chorus
      const detuneOsc = ctx.createOscillator();
      detuneOsc.type = 'sine';
      detuneOsc.frequency.setValueAtTime(freq, now);
      detuneOsc.detune.setValueAtTime(idx % 2 === 0 ? 3.5 : -3.5, now);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(idx === 0 ? 0.05 : 0.035, now + 2.5);

      osc.connect(oscGain);
      detuneOsc.connect(oscGain);
      oscGain.connect(padFilter);

      osc.start(now);
      detuneOsc.start(now);

      this.activeOscillators.push({ osc, gain: oscGain });
      this.activeOscillators.push({ osc: detuneOsc, gain: oscGain });
    });
  }

  private scheduleNextChime() {
    if (!this.isRunning) return;
    const delayMs = 2800 + Math.random() * 2600;

    this.chimeInterval = setTimeout(() => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      this.playChimeNote();
      this.scheduleNextChime();
    }, delayMs);
  }

  private playChimeNote() {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noteFreq = this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    const chimeGain = ctx.createGain();
    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.linearRampToValueAtTime(0.022, now + 0.04);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);
    chimeGain.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 2.4);
  }

  public stop() {
    this.isRunning = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.chimeInterval) {
      clearTimeout(this.chimeInterval);
      this.chimeInterval = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        this.activeOscillators.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.activeOscillators = [];
      }, 850);
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
