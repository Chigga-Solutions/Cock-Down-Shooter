'use client';
export const AudioConfiguration = {
  volume: parseFloat(localStorage.getItem('volume') || '0.3') || 0.3,
}

export const ShotSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/shot2.mp3');
  audio.volume = AudioConfiguration.volume / 100;
  console.log(audio.volume);
  return audio
}

export const ReloadSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/reload1.mp3');
  audio.volume = AudioConfiguration.volume / 100;
  return audio
}