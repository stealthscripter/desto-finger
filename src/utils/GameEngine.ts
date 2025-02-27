// fingerGame.ts
const variables = ["desto", "finger", "caw", "cawter", "oli"];

class GameScores {
  playerScore: number = 0;
  computerScore: number = 0;
  winnerFinger: string | null = null; // Add this property to store the winnerFinger

  calculateFinger(playerFinger: number, computerFinger: number): number {
    return (playerFinger + computerFinger) % 5 === 0
      ? 5
      : (playerFinger + computerFinger) % 5;
  }

  calculateWinner(
    totalFinger: number,
    userPick: string[],
    computerPick: string[]
  ): string {
    const winnerFinger = variables[totalFinger - 1];
    this.winnerFinger = winnerFinger; // Store the winnerFinger in the class state

    if (userPick.includes(winnerFinger)) {
      this.playerScore += 1;
      return `You won`;
    } else if (computerPick.includes(winnerFinger)) {
      this.computerScore += 1;
      return `Computer won`;
    } else {
      return `Draw`;
    }
  }

  getScores(): { playerScore: number; computerScore: number; winnerFinger: string | null } {
    return {
      playerScore: this.playerScore,
      computerScore: this.computerScore,
      winnerFinger: this.winnerFinger, // Include winnerFinger in the returned object
    };
  }
}

// Export the class so it can be used in other files
export default new GameScores();