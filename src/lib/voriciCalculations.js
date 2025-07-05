// Vorici Calculator Core Logic
// Based on Path of Exile socket coloring mechanics

export class VoriciCalculator {
  constructor() {
    // Vorici crafting recipes with costs
    this.voriciRecipes = {
      '1R': { cost: 4, description: 'At least 1 Red Socket' },
      '1G': { cost: 4, description: 'At least 1 Green Socket' },
      '1B': { cost: 4, description: 'At least 1 Blue Socket' },
      '2R': { cost: 25, description: 'At least 2 Red Sockets' },
      '2G': { cost: 25, description: 'At least 2 Green Sockets' },
      '2B': { cost: 25, description: 'At least 2 Blue Sockets' },
      '3R': { cost: 120, description: 'At least 3 Red Sockets' },
      '3G': { cost: 120, description: 'At least 3 Green Sockets' },
      '3B': { cost: 120, description: 'At least 3 Blue Sockets' },
      '1R1G': { cost: 15, description: 'At least 1 Red and 1 Green Socket' },
      '1R1B': { cost: 15, description: 'At least 1 Red and 1 Blue Socket' },
      '1G1B': { cost: 15, description: 'At least 1 Green and 1 Blue Socket' },
      '2R1G': { cost: 100, description: 'At least 2 Red and 1 Green Socket' },
      '2R1B': { cost: 100, description: 'At least 2 Red and 1 Blue Socket' },
      '2G1R': { cost: 100, description: 'At least 2 Green and 1 Red Socket' },
      '2G1B': { cost: 100, description: 'At least 2 Green and 1 Blue Socket' },
      '2B1R': { cost: 100, description: 'At least 2 Blue and 1 Red Socket' },
      '2B1G': { cost: 100, description: 'At least 2 Blue and 1 Green Socket' },
      '1R2G': { cost: 100, description: 'At least 1 Red and 2 Green Sockets' },
      '1R2B': { cost: 100, description: 'At least 1 Red and 2 Blue Sockets' },
      '1G2B': { cost: 100, description: 'At least 1 Green and 2 Blue Sockets' },
      '2R1G1B': { cost: 100, description: 'At least 2 Red, 1 Green and 1 Blue Socket' },
      '1R2G1B': { cost: 100, description: 'At least 1 Red, 2 Green and 1 Blue Socket' },
      '1R1G2B': { cost: 100, description: 'At least 1 Red, 1 Green and 2 Blue Socket' }
    };
  }

  // Calculate socket color probability based on attribute requirements
  calculateSocketProbability(str, dex, int) {
    const totalReq = str + dex + int;
    
    if (totalReq === 0) {
      // No requirements - equal probability
      return { red: 1/3, green: 1/3, blue: 1/3 };
    }

    // Calculate probabilities based on attribute requirements
    const redProb = str / totalReq;
    const greenProb = dex / totalReq;
    const blueProb = int / totalReq;

    return { red: redProb, green: greenProb, blue: blueProb };
  }

  // Calculate probability for specific color combination
  calculateCombinationProbability(sockets, str, dex, int, desiredColors) {
    const probs = this.calculateSocketProbability(str, dex, int);
    const { red: redCount, green: greenCount, blue: blueCount } = desiredColors;
    
    if (redCount + greenCount + blueCount !== sockets) {
      throw new Error('Desired colors must match socket count');
    }

    // Use multinomial probability
    const factorial = (n) => {
      if (n <= 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    };
    
    const multinomialCoeff = factorial(sockets) / 
      (factorial(redCount) * factorial(greenCount) * factorial(blueCount));
    
    const probability = multinomialCoeff * 
      Math.pow(probs.red, redCount) * 
      Math.pow(probs.green, greenCount) * 
      Math.pow(probs.blue, blueCount);

    return Math.min(1, Math.max(0, probability)); // Clamp between 0 and 1
  }

  // Calculate chromatic orb statistics
  calculateChromaticStats(probability) {
    if (probability <= 0) {
      return {
        averageAttempts: Infinity,
        averageCost: Infinity,
        successChance: 0,
        standardDeviation: Infinity
      };
    }

    const averageAttempts = 1 / probability;
    const averageCost = averageAttempts; // 1 chromatic per attempt
    const successChance = probability * 100; // Convert to percentage
    const standardDeviation = Math.sqrt((1 - probability) / (probability * probability));

    return {
      averageAttempts: Math.round(averageAttempts * 100) / 100,
      averageCost: Math.round(averageCost * 100) / 100,
      successChance: Math.round(successChance * 100) / 100, // Round to 2 decimal places
      standardDeviation: Math.round(standardDeviation * 100) / 100
    };
  }

  // Check if Vorici recipe applies to desired colors
  checkVoriciRecipe(recipe, desiredColors) {
    const { red, green, blue } = desiredColors;
    
    switch (recipe) {
      case '1R': return red >= 1;
      case '1G': return green >= 1;
      case '1B': return blue >= 1;
      case '2R': return red >= 2;
      case '2G': return green >= 2;
      case '2B': return blue >= 2;
      case '3R': return red >= 3;
      case '3G': return green >= 3;
      case '3B': return blue >= 3;
      case '1R1G': return red >= 1 && green >= 1;
      case '1R1B': return red >= 1 && blue >= 1;
      case '1G1B': return green >= 1 && blue >= 1;
      case '2R1G': return red >= 2 && green >= 1;
      case '2R1B': return red >= 2 && blue >= 1;
      case '2G1R': return green >= 2 && red >= 1;
      case '2G1B': return green >= 2 && blue >= 1;
      case '2B1R': return blue >= 2 && red >= 1;
      case '2B1G': return blue >= 2 && green >= 1;
      case '1R2G': return red >= 1 && green >= 2;
      case '1R2B': return red >= 1 && blue >= 2;
      case '1G2B': return green >= 1 && blue >= 2;
      default: return false;
    }
  }

  // Calculate all possible crafting methods
  calculateAllMethods(sockets, str, dex, int, desiredColors) {
    const results = [];

    // Raw chromatic orb method
    const probability = this.calculateCombinationProbability(sockets, str, dex, int, desiredColors);
    const chromaticStats = this.calculateChromaticStats(probability);
    
    results.push({
      method: 'Chromatic Orb',
      type: 'chromatic',
      cost: chromaticStats.averageCost,
      successChance: chromaticStats.successChance,
      averageAttempts: chromaticStats.averageAttempts,
      standardDeviation: chromaticStats.standardDeviation,
      description: 'Raw chromatic orb rolling'
    });

    // Check applicable Vorici recipes
    for (const [recipe, data] of Object.entries(this.voriciRecipes)) {
      if (this.checkVoriciRecipe(recipe, desiredColors)) {
        // For Vorici recipes, calculate remaining probability after guarantee
        const remainingColors = this.calculateRemainingColors(recipe, desiredColors, sockets);
        
        if (remainingColors.remaining > 0) {
          const remainingProb = this.calculateCombinationProbability(
            remainingColors.remaining,
            str, dex, int,
            remainingColors.colors
          );
          const remainingStats = this.calculateChromaticStats(remainingProb);
          
          results.push({
            method: `Vorici ${recipe}`,
            type: 'vorici',
            cost: data.cost + remainingStats.averageCost,
            successChance: remainingStats.successChance,
            averageAttempts: 1 + remainingStats.averageAttempts,
            standardDeviation: remainingStats.standardDeviation,
            description: data.description,
            guaranteedCost: data.cost,
            remainingCost: remainingStats.averageCost
          });
        } else {
          // Recipe guarantees exact colors needed
          results.push({
            method: `Vorici ${recipe}`,
            type: 'vorici',
            cost: data.cost,
            successChance: 100,
            averageAttempts: 1,
            standardDeviation: 0,
            description: data.description,
            guaranteedCost: data.cost,
            remainingCost: 0
          });
        }
      }
    }

    // Sort by cost (most efficient first)
    return results.sort((a, b) => a.cost - b.cost);
  }

  // Calculate remaining colors after Vorici recipe
  calculateRemainingColors(recipe, desiredColors, totalSockets) {
    const { red, green, blue } = desiredColors;
    let guaranteedRed = 0, guaranteedGreen = 0, guaranteedBlue = 0;

    // Parse recipe to determine guaranteed colors
    switch (recipe) {
      case '1R': guaranteedRed = 1; break;
      case '1G': guaranteedGreen = 1; break;
      case '1B': guaranteedBlue = 1; break;
      case '2R': guaranteedRed = 2; break;
      case '2G': guaranteedGreen = 2; break;
      case '2B': guaranteedBlue = 2; break;
      case '3R': guaranteedRed = 3; break;
      case '3G': guaranteedGreen = 3; break;
      case '3B': guaranteedBlue = 3; break;
      case '1R1G': guaranteedRed = 1; guaranteedGreen = 1; break;
      case '1R1B': guaranteedRed = 1; guaranteedBlue = 1; break;
      case '1G1B': guaranteedGreen = 1; guaranteedBlue = 1; break;
      case '2R1G': guaranteedRed = 2; guaranteedGreen = 1; break;
      case '2R1B': guaranteedRed = 2; guaranteedBlue = 1; break;
      case '2G1R': guaranteedGreen = 2; guaranteedRed = 1; break;
      case '2G1B': guaranteedGreen = 2; guaranteedBlue = 1; break;
      case '2B1R': guaranteedBlue = 2; guaranteedRed = 1; break;
      case '2B1G': guaranteedBlue = 2; guaranteedGreen = 1; break;
      case '1R2G': guaranteedRed = 1; guaranteedGreen = 2; break;
      case '1R2B': guaranteedRed = 1; guaranteedBlue = 2; break;
      case '1G2B': guaranteedGreen = 1; guaranteedBlue = 2; break;
    }

    const remainingRed = Math.max(0, red - guaranteedRed);
    const remainingGreen = Math.max(0, green - guaranteedGreen);
    const remainingBlue = Math.max(0, blue - guaranteedBlue);
    const guaranteedTotal = guaranteedRed + guaranteedGreen + guaranteedBlue;
    const remainingTotal = totalSockets - guaranteedTotal;

    return {
      remaining: remainingTotal,
      colors: {
        red: remainingRed,
        green: remainingGreen,
        blue: remainingBlue
      }
    };
  }

  // Get recommendation for best method
  getRecommendation(results) {
    if (results.length === 0) return null;

    const bestCost = results[0];
    const bestChance = results.reduce((best, current) => 
      current.successChance > best.successChance ? current : best
    );

    return {
      mostCostEffective: bestCost,
      highestSuccessRate: bestChance,
      recommendation: bestCost.cost <= bestChance.cost * 1.5 ? bestCost : bestChance
    };
  }
}

export default VoriciCalculator;

