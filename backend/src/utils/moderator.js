
export const FINANCE_KEYWORDS = [
    "finance",
    "financial",
    "money",
    "currency",
    "payment",
    "fund",
    "wealth",
    "fiscal",
    "monetary",
    "bank",
    "banking",
    "deposit",
    "withdraw",
    "transaction",
    "credit",
    "debit",
    "loan",
    "interest",
    "mortgage",
    "overdraft",
    "savings",
    "checking",
    "ATM",
    "branch",
    "wire transfer",
    "cheque",
    "routing number",
    "invest",
    "investment",
    "investor",
    "portfolio",
    "diversify",
    "diversification",
    "return",
    "risk",
    "capital gain",
    "bonds",
    "mutual fund",
    "ETF",
    "hedge fund",
    "index fund",
    "venture capital",
    "angel investor",
    "stock",
    "share",
    "equity",
    "dividend",
    "nasdaq",
    "nyse",
    "dow",
    "s&p",
    "bull",
    "bear",
    "market",
    "ipo",
    "blue chip",
    "penny stocks",
    "market cap",
    "day trading",
    "short selling",
    "margin trading",
    "technical analysis",
    "fundamental analysis",
    "stock split",
    "earnings report",
    "crypto",
    "cryptocurrency",
    "bitcoin",
    "btc",
    "ethereum",
    "eth",
    "token",
    "blockchain",
    "coin",
    "wallet",
    "mining",
    "nft",
    "stablecoin",
    "decentralized finance",
    "defi",
    "altcoin",
    "smart contract",
    "proof of stake",
    "proof of work",
    "gas fee",
    "cold storage",
    "hot wallet",
    "economy",
    "economic",
    "gdp",
    "inflation",
    "deflation",
    "recession",
    "fiscal",
    "monetary",
    "stimulus",
    "quantitative easing",
    "interest rate",
    "central bank",
    "federal reserve",
    "CPI",
    "unemployment rate",
    "trade",
    "trading",
    "trader",
    "buy",
    "sell",
    "option",
    "futures",
    "forex",
    "exchange",
    "derivatives",
    "arbitrage",
    "commodities",
    "leverage",
    "spread",
    "stop loss",
    "take profit",
    "budget",
    "budgeting",
    "saving",
    "income",
    "expense",
    "debt",
    "mortgage",
    "retirement",
    "401k",
    "ira",
    "pension",
    "savings plan",
    "emergency fund",
    "credit score",
    "credit report",
    "loan repayment",
    "debt consolidation",
    "insurance",
    "premium",
    "deductible",
    "policyholder",
    "asset",
    "liability",
    "capital",
    "revenue",
    "profit",
    "loss",
    "cash flow",
    "balance sheet",
    "income statement",
    "tax",
    "taxation",
    "audit",
    "accounting",
    "bookkeeping",
    "EBITDA",
    "financial statements",
    "corporate finance",
    "working capital",
    "shareholder",
    "divestment",
    "exchange rate",
    "foreign currency",
    "IMF",
    "World Bank",
    "SWIFT",
    "remittance",
    "sovereign debt",
    "foreign reserves",
    "devaluation",
    "currency peg",
    "trade deficit",
    "trade surplus",
    "fraud",
    "money laundering",
    "Ponzi scheme",
    "insider trading",
    "regulation",
    "compliance",
    "SEC",
    "FINRA",
    "IRS",
    "FATF",
    "AML",
    "KYC",
    "sanctions",
    "whistleblower",
    "forensic accounting",
];

export const isFinanceRelated = (text) => {
if (!text || typeof text !== "string") {
    return false;
}
    
const lowerText = text.toLowerCase();

// Check for finance keywords with word boundaries
for (const keyword of FINANCE_KEYWORDS) {
    // Fix: Properly escape the regex pattern and handle multi-word keywords
    const pattern = keyword.includes(" ") 
    ? keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special regex characters
    : `\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`;
    
    const regex = new RegExp(pattern, "i");
    if (regex.test(lowerText)) {
    return true;
    }
}

    // Check for currency mentions (e.g., $50, 100 dollars)
    const currencyRegex = /\$\d+(\.\d+)?|\d+(\.\d+)?\s?(dollars|usd|euro|eur|gbp|jpy|cny|rupee|inr|₹|€|£|¥)/i;
    if (currencyRegex.test(lowerText)) {
      return true;
    }
    
    // Check for percentage patterns in financial context
    const percentageRegex = /\d+(\.\d+)?%\s?(interest|return|gain|loss|yield|growth|increase|decrease)/i;
    if (percentageRegex.test(lowerText)) {
      return true;
    }
    
    // Check for common financial numbers/metrics
    const financialMetricsRegex = /\b(p\/e ratio|eps|ebitda|roi|roe|roa|cagr|yield|apr|apy)\b\s*[:=]?\s*\d+(\.\d+)?/i;
    if (financialMetricsRegex.test(lowerText)) {
      return true;
    }
    
    return false;
  };
  
  export const filterFinancePosts = (posts) => {
    return posts.filter((post) => !post.text || isFinanceRelated(post.text));
  };
  
  export default {
    isFinanceRelated,
    filterFinancePosts,
  };