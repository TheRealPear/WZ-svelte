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
export const gamemodes = {
  "ARCADE": "Arcade",
  "ATTACK_DEFEND": "Attack/Defend",
  "BEDWARS": "Bed Wars",
  "BLITZ": "Blitz",
  "BLITZ_RAGE": "Blitz: Rage",
  "BRIDGE": "Bridge",
  "CAPTURE_THE_FLAG": "Capture the Flag",
  "CAPTURE_THE_WOOL": "Capture the Wool",
  "CONTROL_THE_POINT": "Control the Point",
  "DEATHMATCH": "Deathmatch",
  "DESTROY_THE_CORE": "Destroy the Core",
  "DESTROY_THE_MONUMENT": "Destroy the Monument",
  "FIVE_CONTROL_POINT": "5 Control Points",
  "FLAG_FOOTBALL": "Flag Football",
  "FREE_FOR_ALL": "Free For All",
  "INFECTION": "Infection",
  "KING_OF_THE_FLAG": "King of the Flag",
  "KING_OF_THE_HILL": "King of the Hill",
  "MIXED": "Mixed",
  "PAYLOAD": "Payload",
  "RACE_FOR_WOOL": "Race for Wool",
  "RAGE": "Rage",
  "SCOREBOX": "Scorebox",
  "SKYWARS": "Skywars",
  "SURVIVAL_GAMES": "Survival Games"
};

export const gamemodes_short = {
  "ARCADE": "Arcade",
  "ATTACK_DEFEND": "A/D",
  "BEDWARS": "BW",
  "BLITZ": "Blitz",
  "BLITZ_RAGE": "Blitz: Rage",
  "BRIDGE": "Bridge",
  "CAPTURE_THE_FLAG": "CTF",
  "CAPTURE_THE_WOOL": "DTW",
  "CONTROL_THE_POINT": "CTP",
  "DEATHMATCH": "TDM",
  "DESTROY_THE_CORE": "DTC",
  "DESTROY_THE_MONUMENT": "DTM",
  "FIVE_CONTROL_POINT": "5CP",
  "FLAG_FOOTBALL": "FFB",
  "FREE_FOR_ALL": "FFA",
  "INFECTION": "Infection",
  "KING_OF_THE_FLAG": "KoTF",
  "KING_OF_THE_HILL": "KoTH",
  "MIXED": "Mixed",
  "PAYLOAD": "Payload",
  "RACE_FOR_WOOL": "RFW",
  "RAGE": "Rage",
  "SCOREBOX": "Scorebox",
  "SKYWARS": "SW",
  "SURVIVAL_GAMES": "SG"
};

// Match times
export function getElapsedMatchTime(match) {
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
export function getStatusColor(match) {
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
