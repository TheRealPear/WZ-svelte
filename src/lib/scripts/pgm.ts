// Written by Jorgeberrex on 2024-09-16

// Mars levels
// https://github.com/Warzone/mars/blob/master/src/main/kotlin/network/warzone/mars/player/models/PlayerProfile.kt
const XP_CONFIGS = {
  linear: {
    type: "linear" as const,
    step: 5000,
  },
  power: {
    type: "power" as const,
    linearFactor: 0.0056,
    growthFactor: 0.715,
  },
};

const XP_CONFIG = XP_CONFIGS.power; // Set only the last part to switch formulas

export function calculateLevel(exp: number): number {
  if (XP_CONFIG.type === "linear") {
    return Math.floor((exp + XP_CONFIG.step) / XP_CONFIG.step);
  } else if (XP_CONFIG.type === "power") {
    return Math.floor(XP_CONFIG.linearFactor * Math.pow(exp, XP_CONFIG.growthFactor)) + 1;
  }
}

function getExpForLevel(level: number): number {
  if (XP_CONFIG.type === "linear") {
    return level * XP_CONFIG.step;
  } else if (XP_CONFIG.type === "power") {
    return Math.pow(level / XP_CONFIG.linearFactor, 1 / XP_CONFIG.growthFactor);
  }
}

export function formatXPProgress(exp: number): string {
  const level = calculateLevel(exp);

  let prevLevelXP: number;
  let nextLevelXP: number;

  if (XP_CONFIG.type === "linear") {
    prevLevelXP = getExpForLevel(level);
    nextLevelXP = getExpForLevel(level + 1);
  } else if (XP_CONFIG.type === "power") {
    prevLevelXP = getExpForLevel(level - 1);
    nextLevelXP = getExpForLevel(level);
  }

  const current = Math.floor(exp - prevLevelXP);
  const needed = Math.floor(nextLevelXP - prevLevelXP);

  return `${current}/${needed}`;
}

// Gamemodes
export const displayGamemode = {
  ARCADE: { long: "Arcade", short: "Arcade" },
  ATTACK_DEFEND: { long: "Attack/Defend", short: "A/D" },
  BEDWARS: { long: "Bed Wars", short: "BW" },
  BLITZ: { long: "Blitz", short: "Blitz" },
  BLITZ_RAGE: { long: "Blitz: Rage", short: "Blitz: Rage" },
  BRIDGE: { long: "Bridge", short: "Bridge" },
  CAPTURE_THE_FLAG: { long: "Capture the Flag", short: "CTF" },
  CAPTURE_THE_WOOL: { long: "Capture the Wool", short: "CTW" },
  CONTROL_THE_POINT: { long: "Control the Point", short: "CTP" },
  DEATHMATCH: { long: "Deathmatch", short: "TDM" },
  DESTROY_THE_CORE: { long: "Destroy the Core", short: "DTC" },
  DESTROY_THE_MONUMENT: { long: "Destroy the Monument", short: "DTM" },
  FIVE_CONTROL_POINT: { long: "5 Control Points", short: "5CP" },
  FLAG_FOOTBALL: { long: "Flag Football", short: "FFB" },
  FREE_FOR_ALL: { long: "Free For All", short: "FFA" },
  INFECTION: { long: "Infection", short: "Infection" },
  KING_OF_THE_FLAG: { long: "King of the Flag", short: "KoTF" },
  KING_OF_THE_HILL: { long: "King of the Hill", short: "KoTH" },
  MIXED: { long: "Mixed", short: "Mixed" },
  PAYLOAD: { long: "Payload", short: "PD" },
  RACE_FOR_WOOL: { long: "Race for Wool", short: "RFW" },
  RAGE: { long: "Rage", short: "Rage" },
  SCOREBOX: { long: "Scorebox", short: "Scorebox" },
  SKYWARS: { long: "Skywars", short: "SW" },
  SURVIVAL_GAMES: { long: "Survival Games", short: "SG" }
};

// Match times
export function getElapsedMatchTime(match: { startedAt?: number; endedAt?: number }): number {
	const { startedAt, endedAt } = match;
	let timeElapsed;
	if (!endedAt) {
		if (startedAt) {
			timeElapsed = Date.now() - startedAt;
		} else {
			timeElapsed = 0;
		}
	} else {
		if (startedAt) {
			timeElapsed = endedAt - startedAt;
		} else {
			// No start time?
			timeElapsed = 0;
		}
	}
	return timeElapsed;
}

export function formatMatchTime(ms: number) {
	let seconds = Math.floor((ms / 1000) % 60);
	let minutes = Math.floor((ms / (1000 * 60)) % 60);
	let hours = Math.floor(ms / (1000 * 60 * 60));

	seconds = seconds < 10 ? '0' + seconds : seconds;

	if (hours > 0) {
		minutes = minutes < 10 ? '0' + minutes : minutes;
	}

	if (hours > 0) {
		return `${hours}:${minutes}:${seconds}`;
	} else {
		return `${minutes}:${seconds}`;
	}
}

// Colors
export function getStatusColor(match: { loadedAt?: number; startedAt?: number; endedAt?: number }): string {
	const { loadedAt, startedAt, endedAt } = match;
	if (loadedAt && !startedAt && !endedAt) {
		return ''; // Loaded
	} else if (loadedAt && startedAt && !endedAt) {
		return ''; // In progress
	} else if (loadedAt && startedAt && endedAt) {
		return ''; // Ended
	} else {
		return '';
	}
}

export function minecraftColorToHex(minecraftColor: string) {
  const colorMap: Record<string, string> = {
    'BLACK': '#000000',
    'DARK_BLUE': '#0000AA',
    'DARK_GREEN': '#00AA00',
    'DARK_AQUA': '#00AAAA',
    'DARK_RED': '#AA0000',
    'DARK_PURPLE': '#AA00AA',
    'GOLD': '#FFAA00',
    'GRAY': '#AAAAAA',
    'DARK_GRAY': '#555555',
    'BLUE': '#5555FF',
    'GREEN': '#55FF55',
    'AQUA': '#55FFFF',
    'RED': '#FF5555',
    'LIGHT_PURPLE': '#FF55FF',
    'YELLOW': '#FFFF55',
    'WHITE': '#FFFFFF'
  };

  const upperCaseColor = minecraftColor.toUpperCase();

  return colorMap[upperCaseColor] || "#FFFFFF";
}
