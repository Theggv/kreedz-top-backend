// https://gist.github.com/bcahue/4eae86ae1d10364bb66d
const steamid64ident = 76561197960265728n;

/**
 * Converts SteamID to CommunityID
 * @param steamId
 * @returns
 */
export const convertSteamIdToCommId = (steamId: string): string => {
  const parts = steamId.split(':');
  let commId: bigint = BigInt(parts[2]) * 2n;

  if (parts[1] === '1') commId += 1n;

  commId += steamid64ident;

  return commId.toString();
};

export const isSteamUser = (steamId: string): boolean => {
  return steamId.startsWith('STEAM_0');
};
