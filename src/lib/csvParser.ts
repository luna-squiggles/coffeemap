
import { CoffeeShop } from './types';

// Parse CSV content into an array of CoffeeShop objects
export const parseCSV = (content: string): CoffeeShop[] => {
  // Split into lines and get headers
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',');
  
  // Process each data line
  return lines.slice(1).map((line, index) => {
    const values = line.split(',');
    const shop: Record<string, any> = {
      id: index.toString() // Add a unique ID for each shop
    };
    
    // Map each column value to its corresponding header
    headers.forEach((header, i) => {
      const value = values[i]?.trim();
      
      // Convert numeric values
      if (['x', 'y', 'quietness', 'vibe'].includes(header)) {
        shop[header] = value ? parseFloat(value) : 0;
      } else {
        shop[header] = value || '';
      }
    });
    
    console.log("Parsed shop:", shop);
    
    return shop as CoffeeShop;
  });
};
