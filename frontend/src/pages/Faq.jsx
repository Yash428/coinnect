import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
const faqData = [
  {
    category: "Expense Management",
    questions: [
      { 
        question: "How does the expense management tool work?", 
        answer: "Our AI-powered tool allows you to upload receipts (images or PDFs), automatically categorizing expenses and providing budget recommendations."
      },
      { 
        question: "Can I track multiple financial accounts?", 
        answer: "Yes! You can sync multiple accounts and categorize expenses from different sources in one dashboard."
      }
    ]
  },
  {
    category: "Financial Advisor Chatbot",
    questions: [
      { 
        question: "What kind of financial advice does the chatbot provide?", 
        answer: "The chatbot gives personalized advice on budgeting, savings, investments, and debt management based on your financial profile."
      },
      { 
        question: "Is the chatbot a real financial advisor?", 
        answer: "No, the chatbot uses AI to provide recommendations based on financial principles, but it does not replace professional financial advisors."
      }
    ]
  },
  {
    category: "Community & Discussions",
    questions: [
      { 
        question: "How can I join a financial discussion community?", 
        answer: "You can browse existing communities or create your own using our coin-based incentive system."
      },
      { 
        question: "How do I earn coins for participation?", 
        answer: "Users earn coins by engaging in discussions, upvoting/downvoting, and contributing valuable insights."
      }
    ]
  },
  {
    category: "Financial News Recommender",
    questions: [
      { 
        question: "How is financial news personalized?", 
        answer: "Our AI curates financial news based on your interests, market trends, and investment preferences."
      },
      { 
        question: "Can I get real-time financial updates?", 
        answer: "Yes! Premium users receive real-time alerts on market movements and curated news summaries."
      }
    ]
  },
  {
    category: "Subscription & Coins",
    questions: [
      { 
        question: "What benefits do premium subscribers get?", 
        answer: "Premium members enjoy unlimited financial advice, personalized analytics, priority community features, and exclusive financial news."
      },
      { 
        question: "Can I purchase coins for premium features?", 
        answer: "Yes, you can buy coins to unlock exclusive discussions, create communities, and access premium financial content."
      }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData
    .flatMap((category) =>
      category.questions.map((item, index) => ({
        ...item,
        category: category.category,
        index: `${category.category}-${index}`
      }))
    )
    .filter(faq =>
      (selectedCategory === "All" || faq.category === selectedCategory) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
        <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary">Coinnect</h1>
        <div className="flex items-center space-x-4">
            <Link to={'/'} variant="ghost">Home</Link>
            {/* <Link to={'about'} variant="ghost">About</Link> */}
            <Link to={'/pricing'} variant="ghost">Pricing</Link>
            <Link to={'/faq'} variant="ghost">FAQs</Link>
            <Link to={'/get'} variant="ghost">Get In Touch</Link>
            <button
                className="rounded-full p-2"
                onClick={() => setDarkMode(!darkMode)}
            >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
        </div>
      </nav>
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Frequently Asked Questions</h2>
      
      {/* Search Box */}
      <input 
        type="text" 
        placeholder="Search questions..." 
        className="w-full p-3 border rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button onClick={() => setSelectedCategory("All")} className={`px-4 py-2 border rounded ${selectedCategory === "All" ? "bg-green-600 text-white" : "bg-gray-200"}`}>All</button>
        {faqData.map((cat) => (
          <button key={cat.category} onClick={() => setSelectedCategory(cat.category)} className={`px-4 py-2 border rounded ${selectedCategory === cat.category ? "bg-green-600 text-white" : "bg-gray-200"}`}>
            {cat.category}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((faq) => (
          <div key={faq.index} className="border-b p-4 cursor-pointer">
            <div className="flex justify-between items-center" onClick={() => toggleQuestion(faq.index)}>
              <span className="font-medium">{faq.question}</span>
              {openIndex === faq.index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === faq.index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default FAQ;
