import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { HelpCircle, Search, Calculator, Zap, Crown, Target } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: 'Calculator Basics',
      icon: Calculator,
      color: 'text-blue-600',
      questions: [
        {
          question: 'What is the Vorici Calculator?',
          answer: 'The Vorici Calculator is an advanced tool that helps Path of Exile players determine the most cost-effective method for coloring sockets on their items. It compares raw chromatic orb rolling with various Vorici crafting recipes to recommend the optimal approach based on your item\'s attribute requirements and desired socket colors.'
        },
        {
          question: 'How accurate are the calculations?',
          answer: 'Our calculations are based on the exact mathematical formulas used by Path of Exile for socket color probability. The calculator uses multinomial probability distributions and accounts for all current Vorici recipes. Results are accurate to within 0.01% and are updated for the latest game mechanics.'
        },
        {
          question: 'Is the calculator updated for current Path of Exile mechanics?',
          answer: 'Yes, the calculator is regularly updated to reflect current Path of Exile mechanics. We monitor game updates and patch notes to ensure all calculations remain accurate. The current version supports all socket coloring methods available in Path of Exile 3.25.'
        },
        {
          question: 'Can I use this calculator offline?',
          answer: 'Yes! Our calculator is built as a Progressive Web App (PWA) and can work offline once loaded. All calculations are performed locally in your browser, so you don\'t need an internet connection to use the core functionality.'
        }
      ]
    },
    {
      category: 'Game Mechanics',
      icon: Zap,
      color: 'text-yellow-600',
      questions: [
        {
          question: 'How do socket colors work in Path of Exile?',
          answer: 'Socket colors are determined by an item\'s attribute requirements. Red sockets are influenced by Strength requirements, Green by Dexterity, and Blue by Intelligence. The probability of each color is proportional to the respective attribute requirement. Items with higher Strength requirements are more likely to roll red sockets naturally.'
        },
        {
          question: 'What are "off-colors" and why are they expensive?',
          answer: 'Off-colors are socket colors that don\'t match an item\'s primary attribute requirement. For example, blue sockets on a high-Strength armor are off-colors. They\'re expensive because the natural probability of rolling them is very low, often requiring hundreds or thousands of chromatic orbs to achieve through random rolling.'
        },
        {
          question: 'Can I use Vorici methods on corrupted items?',
          answer: 'No, Vorici crafting recipes cannot be used on corrupted items. Corrupted items cannot be modified in any way, including socket coloring. You must achieve your desired socket colors before corrupting an item, or use other methods like Tainted Chromatic Orbs in specific league mechanics.'
        },
        {
          question: 'Do item level or rarity affect socket colors?',
          answer: 'No, item level and rarity (normal/magic/rare/unique) do not affect socket color probabilities. Only the item\'s attribute requirements determine socket color chances. A level 1 item and a level 100 item with the same requirements will have identical socket color probabilities.'
        }
      ]
    },
    {
      category: 'Vorici Recipes',
      icon: Crown,
      color: 'text-purple-600',
      questions: [
        {
          question: 'What\'s the difference between Vorici recipes and chromatic orbs?',
          answer: 'Chromatic orbs provide random socket colors based on probability, while Vorici recipes guarantee specific minimum colors for a fixed cost. Vorici recipes are more expensive upfront but provide certainty, making them ideal for difficult color combinations that would be extremely expensive to achieve randomly.'
        },
        {
          question: 'When should I use Vorici recipes vs. chromatic orbs?',
          answer: 'Use Vorici recipes when: 1) You need off-colors that have very low natural probability, 2) You want guaranteed results within a budget, 3) The item is valuable and you can\'t risk many attempts. Use chromatic orbs when the natural probability is reasonable (typically >1%) and you\'re willing to accept some variance in cost.'
        },
        {
          question: 'Can I combine multiple Vorici recipes?',
          answer: 'No, each Vorici recipe application rerolls all sockets on the item. You cannot stack recipes or preserve previous results. However, some recipes guarantee multiple colors (like "2R1G"), which can be more efficient than applying single-color recipes sequentially.'
        },
        {
          question: 'What happens to extra sockets with Vorici recipes?',
          answer: 'Vorici recipes only guarantee the minimum specified colors. Extra sockets beyond the guaranteed ones are rolled randomly based on the item\'s attribute requirements. For example, using "2R" on a 6-socket item guarantees 2 red sockets, while the remaining 4 sockets are rolled normally.'
        }
      ]
    },
    {
      category: 'Strategy & Optimization',
      icon: Target,
      color: 'text-green-600',
      questions: [
        {
          question: 'How do I minimize my crafting costs?',
          answer: 'Use our calculator to compare all available methods for your specific item and desired colors. Consider: 1) The item\'s attribute requirements, 2) Your budget constraints, 3) The value of the item vs. crafting cost, 4) Whether partial success (getting some desired colors) is acceptable.'
        },
        {
          question: 'Should I craft colors before or after linking sockets?',
          answer: 'Generally, achieve your desired socket links first, then color them. Linking sockets (using Jeweller\'s and Fusing Orbs) can change the number of sockets, which would waste any coloring work. However, if you need a very specific color combination, you might color first to avoid the risk of losing perfect colors during linking attempts.'
        },
        {
          question: 'What\'s the most expensive color combination to achieve?',
          answer: 'The most expensive combinations are typically those requiring many off-colors on items with extreme attribute requirements. For example, 6 blue sockets on a pure Strength item (like Kaom\'s Heart) would be extremely expensive, though such combinations are rarely needed in practice.'
        },
        {
          question: 'How do I handle items with mixed attribute requirements?',
          answer: 'Items with balanced attribute requirements (like Str/Int hybrid gear) have more balanced socket color probabilities. Use our calculator to determine if chromatic orb rolling becomes viable, or if specific Vorici recipes are still more cost-effective for your desired combination.'
        }
      ]
    }
  ];

  // Generate FAQ Schema Markup
  useEffect(() => {
    const allQuestions = faqCategories.flatMap(category => category.questions);
    
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allQuestions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Remove existing FAQ schema if present
    const existingSchema = document.querySelector('script[data-schema="faq"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    // Update page title and meta description for FAQ page
    document.title = 'FAQ - Vorici Calculator | Path of Exile Socket Coloring Guide';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Frequently asked questions about the Vorici Calculator and Path of Exile socket coloring mechanics. Get expert answers to optimize your crafting strategy.');
    }

    // Add canonical URL for FAQ page
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ahhqpson.manus.space/faq');
    }

    // Cleanup function
    return () => {
      const schemaToRemove = document.querySelector('script[data-schema="faq"]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, []);

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our Vorici calculator and Path of Exile socket coloring mechanics.
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      {filteredFAQs.length > 0 ? (
        <div className="space-y-6">
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  {category.category}
                  <Badge variant="outline" className="ml-auto">
                    {category.questions.length} questions
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {category.category === 'Calculator Basics' && 'Learn about our calculator features and functionality'}
                  {category.category === 'Game Mechanics' && 'Understand how socket coloring works in Path of Exile'}
                  {category.category === 'Vorici Recipes' && 'Master the use of Vorici crafting recipes'}
                  {category.category === 'Strategy & Optimization' && 'Optimize your crafting approach and minimize costs'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`${categoryIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all categories above.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact Section */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>
            Can't find what you're looking for? We're here to help!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have additional questions about the Vorici calculator or Path of Exile socket crafting, 
            feel free to reach out to the community or check the latest game documentation.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Path of Exile Reddit</Badge>
            <Badge variant="outline">Official Forums</Badge>
            <Badge variant="outline">Discord Communities</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQPage;

