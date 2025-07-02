import React from 'react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className, sticky = true }) => {
  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl shadow-lg backdrop-blur-sm px-6 py-4 z-10",
      sticky && "sticky top-20",
      className
    )}>
      <div className="flex items-center justify-between gap-4">
        {children}
      </div>
    </div>
  );
};

interface ToolbarSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ToolbarSection: React.FC<ToolbarSectionProps> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {children}
    </div>
  );
};

interface ToolbarTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ToolbarTitle: React.FC<ToolbarTitleProps> = ({ children, className }) => {
  return (
    <h2 className={cn("text-lg font-semibold text-slate-800", className)}>
      {children}
    </h2>
  );
};

interface ToolbarDividerProps {
  className?: string;
}

const ToolbarDivider: React.FC<ToolbarDividerProps> = ({ className }) => {
  return (
    <div className={cn("w-px h-6 bg-slate-200", className)} />
  );
};

export { Toolbar, ToolbarSection, ToolbarTitle, ToolbarDivider };