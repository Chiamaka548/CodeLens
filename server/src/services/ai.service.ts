// server/src/services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIInsight, InsightType, Severity } from '../types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface CodeAnalysisResult {
  insights: Omit<AIInsight, 'id' | 'review_id' | 'created_at'>[];
  summary: string;
}

export class AIService {
  /**
   * Analyze code for security vulnerabilities, performance issues, and best practices
   */
  async analyzeCode(code: string, language: string): Promise<CodeAnalysisResult> {
    try {
      const prompt = this.buildAnalysisPrompt(code, language);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the AI response into structured insights
      const insights = this.parseAIResponse(text);
      
      // Generate a summary
      const summary = this.generateSummary(insights);
      
      return { insights, summary };
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Failed to analyze code with AI');
    }
  }

  /**
   * Get suggestions for a specific line of code
   */
  async getLineSuggestion(
    code: string,
    language: string,
    lineNumber: number
  ): Promise<string> {
    try {
      const lines = code.split('\n');
      const targetLine = lines[lineNumber - 1];
      const context = this.getLineContext(lines, lineNumber);

      const prompt = `
You are a code review expert. Analyze this specific line of ${language} code and provide a concise suggestion for improvement.

Context (surrounding lines):
${context}

Target line (line ${lineNumber}):
${targetLine}

Provide a brief, actionable suggestion (2-3 sentences max) focusing on:
- Code quality
- Best practices
- Potential issues
- Performance considerations

If the line is fine, say so briefly.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Line Suggestion Error:', error);
      return 'Unable to generate suggestion at this time.';
    }
  }

  /**
   * Explain a block of code
   */
  async explainCode(code: string, language: string): Promise<string> {
    try {
      const prompt = `
You are a code documentation expert. Explain what this ${language} code does in clear, simple terms.

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
1. A brief overview (1-2 sentences)
2. Key functionality (bullet points)
3. Any notable patterns or techniques used

Keep it concise and beginner-friendly.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Code Explanation Error:', error);
      return 'Unable to explain code at this time.';
    }
  }

  /**
   * Build the analysis prompt for Gemini
   */
  private buildAnalysisPrompt(code: string, language: string): string {
    return `
You are an expert code reviewer specializing in security, performance, and best practices. Analyze the following ${language} code and identify issues.

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "issues": [
    {
      "type": "security|performance|best-practice|bug|style|maintainability",
      "severity": "critical|high|medium|low|info",
      "line": <line_number or null>,
      "message": "Brief description of the issue",
      "suggestion": "How to fix it"
    }
  ]
}

Focus on:
1. **Security**: OWASP Top 10, injection vulnerabilities, authentication issues
2. **Performance**: Inefficient algorithms, memory leaks, unnecessary operations
3. **Best Practices**: Language-specific conventions, design patterns
4. **Bugs**: Logic errors, edge cases, type issues
5. **Maintainability**: Code clarity, complexity, documentation

Only report genuine issues. If the code is good, return an empty issues array.
Provide line numbers when possible (1-indexed).
`;
  }

  /**
   * Parse AI response into structured insights
   */
  private parseAIResponse(
    text: string
  ): Omit<AIInsight, 'id' | 'review_id' | 'created_at'>[] {
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      
      const parsed = JSON.parse(cleanText);
      
      if (!parsed.issues || !Array.isArray(parsed.issues)) {
        return [];
      }

      return parsed.issues.map((issue: any) => ({
        insight_type: issue.type as InsightType,
        severity: issue.severity as Severity,
        line_number: issue.line || null,
        message: issue.message || 'No description provided',
        suggestion: issue.suggestion || null,
      }));
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.error('Raw response:', text);
      
      // Fallback: try to extract insights from plain text
      return this.fallbackParsing(text);
    }
  }

  /**
   * Fallback parsing if JSON parsing fails
   */
  private fallbackParsing(
    text: string
  ): Omit<AIInsight, 'id' | 'review_id' | 'created_at'>[] {
    // Simple heuristic-based parsing as fallback
    const insights: Omit<AIInsight, 'id' | 'review_id' | 'created_at'>[] = [];
    
    // Look for common issue keywords
    const lines = text.split('\n');
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      if (
        lowerLine.includes('security') ||
        lowerLine.includes('vulnerability') ||
        lowerLine.includes('injection')
      ) {
        insights.push({
          insight_type: 'security',
          severity: 'high',
          line_number: null,
          message: line.trim(),
          suggestion: 'Review security best practices for this code.',
        });
      } else if (
        lowerLine.includes('performance') ||
        lowerLine.includes('slow') ||
        lowerLine.includes('optimization')
      ) {
        insights.push({
          insight_type: 'performance',
          severity: 'medium',
          line_number: null,
          message: line.trim(),
          suggestion: 'Consider optimizing this code section.',
        });
      }
    }
    
    return insights;
  }

  /**
   * Generate a summary from insights
   */
  private generateSummary(
    insights: Omit<AIInsight, 'id' | 'review_id' | 'created_at'>[]
  ): string {
    if (insights.length === 0) {
      return 'No issues found. Code looks good! ✅';
    }

    const criticalCount = insights.filter((i) => i.severity === 'critical').length;
    const highCount = insights.filter((i) => i.severity === 'high').length;
    const mediumCount = insights.filter((i) => i.severity === 'medium').length;

    const parts: string[] = [];

    if (criticalCount > 0) {
      parts.push(`${criticalCount} critical issue${criticalCount > 1 ? 's' : ''}`);
    }
    if (highCount > 0) {
      parts.push(`${highCount} high-priority issue${highCount > 1 ? 's' : ''}`);
    }
    if (mediumCount > 0) {
      parts.push(`${mediumCount} medium issue${mediumCount > 1 ? 's' : ''}`);
    }

    const summary = `Found ${insights.length} issue${insights.length > 1 ? 's' : ''}: ${parts.join(', ')}`;

    return summary;
  }

  /**
   * Get context around a specific line
   */
  private getLineContext(lines: string[], lineNumber: number): string {
    const contextSize = 3;
    const start = Math.max(0, lineNumber - contextSize - 1);
    const end = Math.min(lines.length, lineNumber + contextSize);
    
    return lines
      .slice(start, end)
      .map((line, idx) => {
        const actualLineNum = start + idx + 1;
        const marker = actualLineNum === lineNumber ? '→' : ' ';
        return `${marker} ${actualLineNum}: ${line}`;
      })
      .join('\n');
  }
}

export const aiService = new AIService();