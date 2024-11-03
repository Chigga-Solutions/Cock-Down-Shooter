
export const AudioConfiguration = {
  volume: 0.3,
}

export const ShotSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/shot2.mp3');
  audio.volume = AudioConfiguration.volume;
  return audio
}

export const ReloadSound = (): HTMLAudioElement => {
  const audio = new Audio('sounds/reload1.mp3');
  audio.volume = AudioConfiguration.volume;
  return audio
}