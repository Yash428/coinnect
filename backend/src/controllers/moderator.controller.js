import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import natural from "natural"
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

const stemmer  = natural.PorterStemmer

const financeKeywords = [
    "money", "investment", "stock", "stocks", "share", "equity", "bank", "budget", "crypto", 
    "loan", "finance", "trading", "economy", "mutual fund", "insurance", "saving", "wealth", 
    "forex", "credit", "debt", "capital", "retirement", "tax", "funding", "dividend", 
    "market", "business", "interest rate", "inflation", "hedge fund", "bond", "financial planning",
    "asset", "liability", "mortgage", "portfolio", "fiscal", "income", "expense", "revenue",
    "profit", "loss", "derivative", "foreclosure", "commodity", "risk", "return", "valuation",
    "venture capital", "angel investor", "pension", "annuity", "cash flow", "balance sheet",
    "credit score", "cryptocurrency", "bitcoin", "ethereum", "liquidity", "net worth", "broker",
    "exchange", "NASDAQ", "NYSE", "Dow Jones", "S&P 500", "GDP", "recession", "bull market",
    "bear market", "leveraged buyout", "private equity", "public offering", "IPO", "ETF",
    "mutual funds", "futures", "options", "real estate", "REIT", "sovereign fund", "central bank",
    "monetary policy", "federal reserve", "interest", "devaluation", "currency", "inflation rate",
    "debt ceiling", "bankruptcy", "audit", "taxation", "estate planning", "hedging", "overdraft",
    "payment gateway", "exchange rate", "subprime mortgage", "credit union", "fintech", "robo-advisor",
    "financial statement", "depreciation", "401k", "IRA", "liability insurance", "term insurance",
    "stock split", "reverse stock split", "bond yield", "credit risk", "systematic risk",
    "unsystematic risk", "yield curve", "call option", "put option", "short selling", 
    "market capitalization", "earnings report", "gross domestic product", "fiscal policy",
    "monetary stimulus", "liquid assets", "non-liquid assets", "secured loan", "unsecured loan",
    "personal finance", "corporate finance", "leveraged trading", "foreign exchange", "day trading",
    "swing trading", "algorithmic trading", "quantitative trading", "debt-to-equity ratio",
    "price-to-earnings ratio", "price-to-book ratio", "macroeconomics", "microeconomics",
    "interest coverage ratio", "dividend yield", "profit margin", "operating margin", 
    "return on equity", "return on investment", "return on assets", "compound interest",
    "simple interest", "fixed income", "variable interest", "government bonds", "municipal bonds",
    "junk bonds", "investment grade bonds", "asset-backed securities", "mortgage-backed securities",
    "credit default swap", "financial derivatives", "money market", "venture debt", "angel funding",
    "private lending", "loan amortization", "loan default", "credit card debt", "credit utilization",
    "FICO score", "stockholder", "shareholder equity", "stock dilution", "blue-chip stocks",
    "penny stocks", "cyclical stocks", "growth stocks", "value stocks", "index funds",
    "hedging strategy", "exchange-traded derivatives", "sovereign debt", "crowdfunding",
    "peer-to-peer lending", "commercial real estate", "residential real estate", "home equity loan",
    "adjustable-rate mortgage", "fixed-rate mortgage", "escrow account", "foreclosure auction",
    "debt refinancing", "capital appreciation", "tangible assets", "intangible assets",
    "financial leverage", "cost of capital", "weighted average cost of capital", "cash reserves",
    "liquidity ratio", "solvency ratio", "debt ratio", "asset turnover ratio", "inventory turnover",
    "accounts receivable", "accounts payable", "profit and loss statement", "gross profit",
    "net profit", "working capital", "operating cash flow", "free cash flow", "margin trading",
    "financial independence", "passive income", "active income", "emergency fund", "trust fund",
    "fiduciary duty", "asset allocation", "diversification", "tax-efficient investing",
    "inflation hedge", "deflation risk", "default risk", "portfolio diversification", "stop-loss order",
    "limit order", "market order", "debt consolidation", "collateralized debt", "secured bonds",
    "junk status", "credit downgrade", "economic downturn", "economic expansion", "yield spread",
    "credit crunch", "inflation-indexed bonds", "secured lending", "direct investment", "index trading",
    "high-frequency trading", "trader sentiment", "financial cycle", "supply and demand shock",
    "global financial crisis", "economic recession", "currency appreciation", "currency depreciation",
    "sovereign wealth fund", "stimulus package", "bailout fund", "quantitative easing",
    "trade balance", "federal funds rate", "monetary tightening", "interest rate hike",
    "stagflation", "economic bubble", "liquidity crunch", "bearish trend", "bullish trend",
    "derivatives trading", "short-term capital gains", "long-term capital gains",
    "capital gains tax", "stock buyback", "hostile takeover", "mergers and acquisitions",
    "special purpose acquisition company", "financial technology", "regulatory compliance",
    "anti-money laundering", "know your customer", "black swan event", "sovereign credit rating",
    "corporate credit rating", "national debt", "budget deficit", "budget surplus", "current account deficit",
    "current account surplus", "foreign direct investment", "trade deficit", "trade surplus",
    "gold standard", "fiat currency", "cryptocurrency exchange", "decentralized finance",
    "initial coin offering", "stablecoin", "utility token", "security token", "tokenomics",
    "smart contracts", "blockchain finance", "distributed ledger", "digital banking",
    "neobanks", "financial inclusion", "impact investing", "socially responsible investing",
    "environmental, social, and governance (ESG)", "green bonds", "carbon credits",
    "ethical investing", "venture philanthropy", "financial education", "behavioral finance",
    "automated investing", "robo-advisors", "insurance premium", "actuarial science",
    "underwriting", "policyholder", "payout ratio", "annuitization", "credit counseling",
    "financial literacy", "risk tolerance", "insurance deductible", "policy endorsement",
    "fiduciary responsibility", "trustee", "estate executor", "inheritance tax", "gift tax",
    "wealth transfer", "family office", "private wealth management", "institutional investors",
    "sovereign credit risk", "consumer confidence index", "housing affordability index",
    "deleveraging", "shadow banking", "margin requirements", "bank run", "capital flight",
    "sovereign default", "contingent liabilities", "derivative exposure", "net interest margin",
    "systemic risk", "liquidity risk", "operational risk", "regulatory risk", "currency risk",
    "inflation expectations", "financial contagion", "repo market", "overnight lending rate",
    "swap agreements", "notional value", "money laundering", "forex reserves", "capital control"
  ].map(word => stemmer.stem(word)); // Apply NLP Stemming


const moderate = asyncHandler(async (req, res) => {
    const { posts } = req.body;

    if (!posts || !Array.isArray(posts)) {
        throw new ApiError(400, "Invalid request. 'posts' must be an array.");
    }

    let results = [];

    for (const post of posts) {
        const { postId, userId, content } = post;

        if (!postId || !userId || !content) {
            results.push({ postId, status: "error", message: "Missing required fields" });
            continue;
        }

        // Convert post content to lowercase and stem each word
        const postWords = content.toLowerCase().split(/\s+/).map(word => stemmer.stem(word));

        // Check if post is finance-related
        const isFinanceRelated = postWords.some(word => financeKeywords.includes(word));

        if (!isFinanceRelated) {
            // Deduct 10 coins from the user
            const user = await User.findById(userId);
            if (!user) {
            results.push({ postId, status: "error", message: "User not found" });
            continue;
            }

            if (user.coins < 10) {
            results.push({ postId, status: "error", message: "Insufficient coins" });
            continue;
            }

            user.coins -= 10;
            await user.save();

            // Delete the post
            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost) {
            results.push({ postId, status: "error", message: "Post not found" });
            continue;
            }

            results.push({
            postId,
            status: "deleted",
            message: "Post deleted: Not finance-related. 10 coins deducted.",
            newBalance: user.coins
            });
        } else {
            results.push({ postId, status: "approved", message: "Post is finance-related." });
        }
        }

    return res.status(200).json(new ApiResponse(200, { results }, "Successfully moderated"));
})

export { moderate };