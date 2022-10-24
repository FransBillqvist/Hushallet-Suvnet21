const avatarArray: string[] = ['🦊', '🐳', '🐷', '🐥', '🐸', '🐬', '🐙', '🦄'];

export function filterAvatarList(listOfAvatarsInUse: string[]) {
  const result = avatarArray.filter((avatar) => !listOfAvatarsInUse.includes(avatar));
  return result;
}
