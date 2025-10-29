import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Assistant. I can help you with health-related questions, provide yoga recommendations, suggest dietary advice, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Health queries
    if (message.includes('headache') || message.includes('head pain')) {
      return "For headaches, I recommend:\n\n1. Stay hydrated - drink plenty of water\n2. Practice relaxation techniques\n3. Try these yoga poses: Child's Pose, Seated Forward Bend\n4. Avoid triggers like bright lights and loud noises\n5. Foods to eat: ginger tea, almonds, watermelon\n\nIf headaches persist, please consult a doctor.";
    }

    if (message.includes('back pain')) {
      return "For back pain relief:\n\n1. Practice good posture\n2. Strengthen your core with exercises\n3. Yoga poses: Cat-Cow, Child's Pose, Bridge Pose\n4. Apply heat or ice packs\n5. Avoid sitting for long periods\n\nConsider seeing a physical therapist if pain continues.";
    }

    if (message.includes('stress') || message.includes('anxiety')) {
      return "To manage stress and anxiety:\n\n1. Practice deep breathing exercises\n2. Try meditation for 10-15 minutes daily\n3. Yoga: Corpse Pose (Shavasana), Legs-Up-The-Wall\n4. Regular exercise helps reduce stress hormones\n5. Foods: dark chocolate, green tea, omega-3 rich foods\n\nConsider speaking with a mental health professional for persistent anxiety.";
    }

    if (message.includes('sleep') || message.includes('insomnia')) {
      return "For better sleep:\n\n1. Maintain a consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Avoid screens 1 hour before bed\n4. Try yoga: Legs-Up-The-Wall, Child's Pose before bed\n5. Foods to help: chamomile tea, almonds, bananas\n6. Keep your bedroom cool and dark";
    }

    if (message.includes('energy') || message.includes('tired') || message.includes('fatigue')) {
      return "To boost your energy:\n\n1. Stay hydrated throughout the day\n2. Eat balanced meals with protein and complex carbs\n3. Exercise regularly - even a 15-minute walk helps\n4. Power foods: nuts, quinoa, leafy greens, eggs\n5. Yoga: Sun Salutations, Warrior Poses\n6. Ensure you're getting 7-9 hours of sleep";
    }

    // Yoga queries
    if (message.includes('yoga')) {
      return "Great! Yoga has many benefits. What are you looking to improve?\n\n• Back pain relief\n• Stress reduction\n• Flexibility\n• Energy boost\n• Better sleep\n\nOr would you like a general yoga routine for beginners?";
    }

    // Diet queries
    if (message.includes('diet') || message.includes('food') || message.includes('eat')) {
      return "I can help with dietary advice! What would you like to know about?\n\n• Foods for specific health concerns\n• Nutrition for energy\n• Weight management\n• Foods to boost immunity\n• Meal planning tips\n\nPlease tell me more about your dietary goals.";
    }

    if (message.includes('vitamin d')) {
      return "Vitamin D is essential for bone health and immunity.\n\nRich sources:\n• Fatty fish (salmon, mackerel)\n• Egg yolks\n• Fortified milk and cereals\n• Mushrooms\n• Sunlight exposure (15-20 minutes daily)\n\nConsider supplements if you're deficient (consult your doctor first).";
    }

    if (message.includes('protein')) {
      return "Good protein sources include:\n\nAnimal sources:\n• Chicken breast\n• Fish (salmon, tuna)\n• Eggs\n• Greek yogurt\n\nPlant sources:\n• Lentils and beans\n• Quinoa\n• Tofu and tempeh\n• Nuts and seeds\n\nAim for 0.8g per kg of body weight daily.";
    }

    if (message.includes('immunity') || message.includes('immune')) {
      return "To boost immunity:\n\n1. Eat vitamin C rich foods: citrus fruits, bell peppers\n2. Include zinc: nuts, seeds, legumes\n3. Probiotics: yogurt, kefir, fermented foods\n4. Stay hydrated\n5. Get adequate sleep (7-9 hours)\n6. Exercise regularly\n7. Manage stress\n8. Vitamin D from sunlight";
    }

    // Exercise queries
    if (message.includes('exercise') || message.includes('workout')) {
      return "Exercise recommendations:\n\n1. Cardio: 150 minutes moderate activity per week\n2. Strength training: 2-3 times per week\n3. Flexibility: Daily stretching or yoga\n\nBeginners can start with:\n• 30-minute walks\n• Bodyweight exercises\n• Beginner yoga flows\n\nAlways warm up before and cool down after exercising!";
    }

    // Weight queries
    if (message.includes('weight loss') || message.includes('lose weight')) {
      return "Healthy weight loss tips:\n\n1. Create a moderate calorie deficit (500 cal/day)\n2. Eat protein with every meal\n3. Include fiber-rich foods\n4. Stay hydrated\n5. Exercise regularly (cardio + strength)\n6. Get adequate sleep\n7. Manage stress\n\nAim for 0.5-1 kg loss per week for sustainable results.";
    }

    // Default responses
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening'];
    if (greetings.some(g => message.includes(g))) {
      return "Hello! I'm here to help with your health questions. You can ask me about:\n\n• Symptoms and remedies\n• Yoga and exercise\n• Nutrition and diet\n• Lifestyle tips\n• Stress management\n\nWhat would you like to know?";
    }

    if (message.includes('thank')) {
      return "You're welcome! Remember, this information is for educational purposes only. Always consult healthcare professionals for medical advice. Is there anything else I can help you with?";
    }

    return "I can help you with health-related questions! Try asking me about:\n\n• Specific symptoms (headache, back pain, etc.)\n• Yoga poses for different concerns\n• Dietary advice and nutrition\n• Exercise recommendations\n• Stress management\n• Sleep improvement\n\nWhat would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "How to relieve headache?",
    "Yoga for back pain",
    "Foods rich in Vitamin D",
    "Tips to boost immunity"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>AI Health Assistant</span>
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">Chat with Health AI</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Ask questions about symptoms, yoga, nutrition, and wellness
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'bot'
                      ? 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'bot'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'bot' ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="px-3 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your health question..."
                  className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
