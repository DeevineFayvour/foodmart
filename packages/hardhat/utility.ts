// Define the tokens function
export function tokens(price: string): bigint {
    const numericPrice: number = parseFloat(price);
    // Assuming price is in a specific format (e.g., Wei or Ether)
    // Convert the price to a token format or add a symbol
    const formattedPrice: bigint = BigInt(numericPrice * 1e18); // Add a token symbol, like ETH
    return formattedPrice;
  }