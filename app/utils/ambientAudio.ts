// Cinematic Felt Piano & Analog Ambient Soundscape Engine (Web Audio API)
// Designed specifically for intimate, contemplative reading:
// - Lush, continuous analog pads with warm tape saturation
// - Gentle felt-piano style chord progressions (Erik Satie / Brian Eno inspired)
// - Organic soft acoustic note droplets
// - Seamless auto-evolution that flows infinitely in the background

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private tapeFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private chordInterval: NodeJS.Timeout | null = null;
  private dropletInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private currentChordIndex: number = 0;
  private activeOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Mellow, contemplative 7th and 9th chord voicings (Hz)
  // Fmaj9 -> Am9 -> Dm9 -> Cmaj7/G -> Bbmaj7#11
  private readonly chords: number[][] = [
    [87.31, 174.61, 220.0, 261.63, 329.63, 392.0],   // Fmaj9: F2, F3, A3, C4, E4, G4
    [110.0, 164.81, 220.0, 261.63, 329.63, 440.0],   // Am9: A2, E3, A3, C4, E4, A4
    [73.42, 146.83, 220.0, 261.63, 349.23, 440.0],   // Dm9: D2, D3, A3, C4, F4, A4
    [98.0, 196.0, 246.94, 261.63, 329.63, 392.0],    // Cmaj7/G: G2, G3, B3, C4, E4, G4
    [116.54, 174.61, 233.08, 293.66, 329.63, 369.99], // Bbmaj7#11: Bb2, F3, Bb3, D4, E4, F#4
  ];

  // Soft piano note frequencies for gentle droplets (F pentatonic / Lydian)
  private readonly pianoNotes: number[] = [
    261.63, // C4
    329.63, // E4
    349.23, // F4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    659.25, // E5
    698.46, // F5
    783.99, // G5
  ];

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

      // Master output gain with smooth exponential fade-in
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3.0);
      this.masterGain.connect(ctx.destination);

      // Analog warm tape lowpass filter
      this.tapeFilter = ctx.createBiquadFilter();
      this.tapeFilter.type = 'lowpass';
      this.tapeFilter.frequency.setValueAtTime(650, ctx.currentTime);
      this.tapeFilter.Q.setValueAtTime(0.7, ctx.currentTime);
      this.tapeFilter.connect(this.masterGain);

      // Warm stereo echo delay network
      this.delayNode = ctx.createDelay(1.5);
      this.delayNode.delayTime.setValueAtTime(0.55, ctx.currentTime);

      this.delayGain = ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.38, ctx.currentTime);

      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(500, ctx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayGain);
      this.delayGain.connect(this.delayNode);
      this.delayGain.connect(this.tapeFilter);

      this.isRunning = true;

      // Start initial chord
      this.playChord(this.chords[0]);

      // Cycle chords smoothly every 8.5 seconds
      this.chordInterval = setInterval(() => {
        if (!this.isRunning) return;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.currentChordIndex]);
      }, 8500);

      // Play soothing piano droplets
      this.scheduleNextDroplet();

      return true;
    } catch {
      return false;
    }
  }

  private playChord(freqs: number[]) {
    if (!this.ctx || !this.tapeFilter || !this.isRunning) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Gently fade out previous chord oscillators
    const oldOscs = [...this.activeOscillators];
    this.activeOscillators = [];
    oldOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 3.8);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        }, 4000);
      } catch {}
    });

    // Subtly animate tape filter frequency to create organic breathing swells
    this.tapeFilter.frequency.linearRampToValueAtTime(500, now);
    this.tapeFilter.frequency.linearRampToValueAtTime(720, now + 4.2);
    this.tapeFilter.frequency.linearRampToValueAtTime(560, now + 8.5);

    freqs.forEach((freq, idx) => {
      // Warm fundamental oscillator (triangle/sine blend)
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detuned secondary oscillator for lush stereo chorus
      const detuneOsc = ctx.createOscillator();
      detuneOsc.type = 'sine';
      detuneOsc.frequency.setValueAtTime(freq, now);
      detuneOsc.detune.setValueAtTime(idx % 2 === 0 ? 4.0 : -4.0, now);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(idx === 0 ? 0.045 : 0.03, now + 3.0);

      osc.connect(oscGain);
      detuneOsc.connect(oscGain);
      oscGain.connect(this.tapeFilter!);

      osc.start(now);
      detuneOsc.start(now);

      this.activeOscillators.push({ osc, gain: oscGain });
      this.activeOscillators.push({ osc: detuneOsc, gain: oscGain });
    });
  }

  private scheduleNextDroplet() {
    if (!this.isRunning) return;
    const delayMs = 2400 + Math.random() * 3200;

    this.dropletInterval = setTimeout(() => {
      if (!this.isRunning || !this.ctx || !this.tapeFilter) return;
      this.playPianoDroplet();
      this.scheduleNextDroplet();
    }, delayMs);
  }

  private playPianoDroplet() {
    if (!this.ctx || !this.tapeFilter || !this.delayNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noteFreq = this.pianoNotes[Math.floor(Math.random() * this.pianoNotes.length)];

    // Fundamental tone
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    // Subtle overtone harmonic
    const harmonicOsc = ctx.createOscillator();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(noteFreq * 2, now);

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.024, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.0001, now);
    harmonicGain.gain.linearRampToValueAtTime(0.008, now + 0.03);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(noteGain);
    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(noteGain);

    noteGain.connect(this.tapeFilter);
    noteGain.connect(this.delayNode);

    osc.start(now);
    harmonicOsc.start(now);
    osc.stop(now + 2.8);
    harmonicOsc.stop(now + 2.8);
  }

  public triggerPageTurnSound() {
    if (!this.ctx || !this.tapeFilter || !this.isRunning) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Subtle soft bell harmonic on page turn
    const noteFreq = this.pianoNotes[Math.floor(Math.random() * 4) + 3];
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.016, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(gain);
    gain.connect(this.tapeFilter);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 1.8);
  }

  public stop() {
    this.isRunning = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.dropletInterval) {
      clearTimeout(this.dropletInterval);
      this.dropletInterval = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        this.activeOscillators.forEach(({ osc }) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.activeOscillators = [];
      }, 1300);
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
