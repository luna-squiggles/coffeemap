import { CoffeeShop } from './types';

// Function to safely parse CSV while considering quoted values
export const parseCSV = (content: string): CoffeeShop[] => {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    const shop: Record<string, any> = { id: index.toString() };

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

// Helper function to parse a CSV line considering quoted values
const parseCSVLine = (line: string): string[] => {
  const regex = /(?:\"([^\"]*)\")|([^,]+)/g;
  const values: string[] = [];
  let match;
  
  while ((match = regex.exec(line)) !== null) {
    values.push(match[1] !== undefined ? match[1] : match[2]);
  }

  return values;
};
