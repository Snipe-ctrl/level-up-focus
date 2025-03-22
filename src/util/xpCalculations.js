/**
* Calculates total XP needed to reach a specific level
* @param {number} level - The target level
* @returns {number} - Total XP required
*/
export function getTotalXPForNextLevel(level) {
    const baseXP = 100;
    const exponent = 1.5;
    let totalXP = 0;
  
    for (let i = 1; i <= level; i++) {
      totalXP += Math.floor(baseXP * Math.pow(i, exponent));
    }
  
    return totalXP;
}

/**
 * @param {number} currentXp - User's current XP
 * @param {number} currentLevel - User's current level
 * @return {string} - CSS percentage string
*/
export function calculateXpBarPercentage(currentXp, currentLevel) {
    if (currentXp === undefined || currentLevel === undefined) {
      return "0%";
    }
    
    const nextLevelXp = getTotalXPForNextLevel(currentLevel);
    const xpIntoLevel = ((nextLevelXp - currentXp) / nextLevelXp) * 100;
    const percentage = 100 - xpIntoLevel;
    
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
}

/**
 * @param {number} currentXp - User's current XP after adding new XP
 * @param {number} currentLevel - User's current level
 * @returns {object} - Contains shouldLevelUp flag and new level if applicable
 */
export function checkLevelUp(currentXp, currentLevel) {
    const xpForNextLevel = getTotalXPForNextLevel(currentLevel);
    
    if (currentXp >= xpForNextLevel) {
      return {
        shouldLevelUp: true,
        newLevel: currentLevel + 1
      };
    }
    
    return {
      shouldLevelUp: false,
      newLevel: currentLevel
    };
}