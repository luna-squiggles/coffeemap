
import React from 'react';

interface HeaderProps {
  onFileUpload: (file: File) => void;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        onFileUpload(file);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        onFileUpload(file);
      }
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <header className="pt-12 pb-8 px-6 md:px-10">
      <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-6">
        Coffee<br />Shops
      </h1>
      
      <div 
        className={`csv-drop-zone p-4 mt-6 mb-8 ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p className="mb-2">Drag & drop your CSV file here or</p>
          <button 
            onClick={handleButtonClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90"
          >
            Browse Files
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv" 
            className="hidden" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
