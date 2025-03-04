
import React, { useState, useEffect } from 'react';
import CoffeeMap from '@/components/CoffeeMap';
import { parseCSV } from '@/lib/csvParser';
import { CoffeeShop } from '@/lib/types';

const Index = () => {
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load sample data initially
  useEffect(() => {
    const loadSampleData = async () => {
      try {
        const response = await fetch('/data.csv');
        const csvContent = await response.text();
        const shops = parseCSV(csvContent);
        setShops(shops);
        console.log("Loaded shops:", shops); // Debug log
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSampleData();
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="container max-w-5xl mx-auto px-4 pb-32">
        <header className="pt-12 pb-8 px-6 md:px-10">
          <h1 className="text-[39px] md:text-[39px] font-playfair font-semibold tracking-tight mb-6 text-[#373F47] leading-[43px]">
            Luna's Favourite<br />Coffee Shops in London
          </h1>
          <p className="font-mono text-[16px] text-[#373F47]">Hi, I'm Luna, and this is a map of where I like to study ☕️.</p>
        </header>
        
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-lg text-[#373F47] font-mono">Loading map data...</div>
          </div>
        ) : (
          <div className="pb-12">
            <CoffeeMap shops={shops} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
