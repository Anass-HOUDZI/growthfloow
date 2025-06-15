
import { ToolModule } from '../../types/core';

class ToolRegistry {
  private tools: Map<string, ToolModule> = new Map();
  private categories: Map<string, ToolModule[]> = new Map();

  register(tool: ToolModule): void {
    this.tools.set(tool.id, tool);
    
    if (!this.categories.has(tool.category)) {
      this.categories.set(tool.category, []);
    }
    this.categories.get(tool.category)?.push(tool);
  }

  getTool(id: string): ToolModule | undefined {
    return this.tools.get(id);
  }

  getToolsByCategory(category: string): ToolModule[] {
    return this.categories.get(category) || [];
  }

  getAllTools(): ToolModule[] {
    return Array.from(this.tools.values());
  }

  search(query: string): ToolModule[] {
    const searchTerm = query.toLowerCase();
    return this.getAllTools().filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.config.description.toLowerCase().includes(searchTerm) ||
      tool.config.features.some(feature => 
        feature.toLowerCase().includes(searchTerm)
      )
    );
  }

  getDependencies(toolId: string): ToolModule[] {
    const tool = this.getTool(toolId);
    if (!tool?.dependencies) return [];
    
    return tool.dependencies
      .map(depId => this.getTool(depId))
      .filter(Boolean) as ToolModule[];
  }
}

export const toolRegistry = new ToolRegistry();
