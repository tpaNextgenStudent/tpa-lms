import React, { useEffect } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  // theme: 'default',
});

interface MermaidProps {
  chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{chart}</div>;
};
