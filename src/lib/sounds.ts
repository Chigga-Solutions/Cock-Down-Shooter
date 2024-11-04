'use client';

export const AudioConfiguration = {
  volume: -1,
}

function getVolume() {
  if (AudioConfiguration.volume === -1)
    AudioConfiguration.volume = parseFloat(localStorage.getItem('volume') || '30') / 100 || 0.3;
  return AudioConfiguration.volume;
}

export const ShotSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/shot2.mp3');
  audio.volume = getVolume()
  return audio
}

export const ReloadSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/reload1.mp3');
  audio.volume = getVolume()
  return audio
}