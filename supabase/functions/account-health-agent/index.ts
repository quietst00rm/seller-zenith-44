import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Mock account data context for the AI agent
    const accountContext = {
      sellerId: "A1B2C3D4E5F6G7",
      accountHealthScore: 978,
      healthStatus: "healthy",
      metrics: {
        odr: "0.27%",
        idr: "4.81%",
        voc: "Good",
        ipi: 672
      },
      activeCases: [
        {
          id: "C001",
          type: "IP Complaint",
          status: "Awaiting Client Docs",
          asin: "B08XYZ1234",
          product: "Wireless Ergonomic Mouse",
          atRiskSales: 175194
        },
        {
          id: "C002", 
          type: "Product Condition Complaint",
          status: "POA Submitted",
          asin: "B09ABC5678",
          product: "Organic Green Tea Bags (100ct)",
          atRiskSales: 121681
        },
        {
          id: "C004",
          type: "IP Complaint", 
          status: "New",
          asin: "B08LMNOPQR",
          product: "Smart LED Light Bulb",
          atRiskSales: 228079
        }
      ],
      recentAlerts: [
        "2 New IP Complaints require immediate attention",
        "1 Listing at Risk of Suspension",
        "3 Cases awaiting your response"
      ],
      performanceMetrics: {
        avgResponseTime: "2.3 hours",
        sliaCompliance: "96%",
        casesResolvedThisWeek: 8,
        asinsMonitored: 1262
      }
    };

    const systemPrompt = `You are an expert Amazon Account Health Agent for Seller Resolve, a professional account management service. You have access to comprehensive account data and provide actionable insights to Amazon sellers.

ACCOUNT CONTEXT:
- Seller ID: ${accountContext.sellerId}
- Account Health Score: ${accountContext.accountHealthScore}/1000 (${accountContext.healthStatus})
- Order Defect Rate: ${accountContext.metrics.odr} (Target: <1%)
- Invoice Defect Rate: ${accountContext.metrics.idr} (Target: <5%) 
- Voice of Customer: ${accountContext.metrics.voc}
- Inventory Performance Index: ${accountContext.metrics.ipi}

ACTIVE ISSUES:
${accountContext.activeCases.map(c => `- Case ${c.id}: ${c.type} for ${c.product} (ASIN: ${c.asin}) - Status: ${c.status} - At Risk Sales: $${c.atRiskSales.toLocaleString()}`).join('\n')}

RECENT ALERTS:
${accountContext.recentAlerts.map(alert => `- ${alert}`).join('\n')}

PERFORMANCE METRICS:
- Average Response Time: ${accountContext.performanceMetrics.avgResponseTime}
- SLA Compliance: ${accountContext.performanceMetrics.sliaCompliance}
- Cases Resolved This Week: ${accountContext.performanceMetrics.casesResolvedThisWeek}
- ASINs Monitored: ${accountContext.performanceMetrics.asinsMonitored}

GUIDELINES:
1. Provide specific, actionable advice based on the account data
2. Reference specific cases, metrics, and ASINs when relevant
3. Maintain a professional, knowledgeable tone
4. Offer concrete next steps and recommendations
5. Identify the most critical issues that need immediate attention
6. Explain Amazon policies and best practices when relevant
7. Be proactive in identifying potential risks and opportunities

Always ground your responses in the actual account data provided above.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with context:', { messageCount: messages.length });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('OpenAI response received successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      accountContext: accountContext
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in account-health-agent function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to process chat request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});