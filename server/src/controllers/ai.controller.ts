// server/src/controllers/ai.controller.ts
import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export class AIController {
  /**
   * Analyze code and store insights
   * POST /api/ai/analyze
   */
  async analyzeCode(req: Request, res: Response) {
    try {
      const { code, language, reviewId } = req.body;

      if (!code || !language || !reviewId) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: code, language, reviewId',
        });
      }

      // Get AI analysis
      const { insights, summary } = await aiService.analyzeCode(code, language);

      // Store insights in database
      const insightsToInsert = insights.map((insight) => ({
        ...insight,
        review_id: reviewId,
      }));

      const { data, error } = await supabase
        .from('ai_insights')
        .insert(insightsToInsert)
        .select();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to store insights',
        });
      }

      res.json({
        success: true,
        data: {
          insights: data,
          summary,
          count: insights.length,
        },
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to analyze code',
      });
    }
  }

  /**
   * Get insights for a specific review
   * GET /api/ai/insights/:reviewId
   */
  async getInsights(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;

      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('review_id', reviewId)
        .order('severity', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch insights',
        });
      }

      res.json({
        success: true,
        data: data || [],
      });
    } catch (error: any) {
      console.error('Fetch insights error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch insights',
      });
    }
  }

  /**
   * Get suggestion for a specific line
   * POST /api/ai/suggest-line
   */
  async suggestLine(req: Request, res: Response) {
    try {
      const { code, language, lineNumber } = req.body;

      if (!code || !language || lineNumber === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: code, language, lineNumber',
        });
      }

      const suggestion = await aiService.getLineSuggestion(
        code,
        language,
        lineNumber
      );

      res.json({
        success: true,
        data: { suggestion, lineNumber },
      });
    } catch (error: any) {
      console.error('Line suggestion error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to get suggestion',
      });
    }
  }

  /**
   * Explain code
   * POST /api/ai/explain
   */
  async explainCode(req: Request, res: Response) {
    try {
      const { code, language } = req.body;

      if (!code || !language) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: code, language',
        });
      }

      const explanation = await aiService.explainCode(code, language);

      res.json({
        success: true,
        data: { explanation },
      });
    } catch (error: any) {
      console.error('Explain code error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to explain code',
      });
    }
  }
}