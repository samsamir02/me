import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { HelpCircle, MessageSquare, FileText } from 'lucide-react';

const faqs = [
  {
    category: 'Getting Started',
    items: [
      { q: 'How do I create an account?', a: 'Click "Get Started" and choose your role as a designer or client. Fill in your details and verify your email.' },
      { q: 'What\'s the difference between a contest and a project?', a: 'Contests allow multiple designers to submit ideas. Projects are direct hires with specific designers.' },
    ],
  },
  {
    category: 'For Designers',
    items: [
      { q: 'How do I submit to a contest?', a: 'Browse contests, click the one you like, and submit your design. You can make revisions based on feedback.' },
      { q: 'When do I get paid?', a: 'You get paid within 7 days of winning or project completion, depending on payment method.' },
    ],
  },
  {
    category: 'For Clients',
    items: [
      { q: 'How long do contests take?', a: 'Contests run for 7 days by default: 4 days for round 1 and 3 days for final round.' },
      { q: 'Can I extend a contest?', a: 'Yes, you can extend a contest for a fee. Contact support for extension options.' },
    ],
  },
];

export function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions and get support
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <HelpCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">FAQ</h3>
            <p className="text-sm text-gray-600 mt-2">Find answers to frequently asked questions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Contact Support</h3>
            <p className="text-sm text-gray-600 mt-2">Get in touch with our support team</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-600 mt-2">Read detailed guides and tutorials</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {faqs.map((faqSection) => (
          <div key={faqSection.category}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{faqSection.category}</h2>
            <div className="space-y-4">
              {faqSection.items.map((item, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">{item.q}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card className="mt-12 bg-gradient-to-r from-red-50 to-teal-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help. Contact us anytime at support@77sdesign.com
          </p>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Contact Support
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
