import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              By accessing and using the 77S Design platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">2. User Responsibilities</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              Users agree to use 77S Design in a lawful manner and not to infringe on the rights of others. Specifically, users agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Upload or share content that infringes intellectual property rights</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Attempt to gain unauthorized access to the system</li>
              <li>Engage in any fraudulent or deceptive practices</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">3. Intellectual Property Rights</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              All designs submitted through 77S Design are the intellectual property of the designers until the winning design is selected and paid for. Upon payment, the client receives ownership rights to the winning design.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">4. Payment Terms</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              Payment is held in escrow until the contest or project is completed to the client's satisfaction. Platform fees are deducted from the prize amount or project cost. All payments are non-refundable unless a dispute is resolved in favor of the user.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              77S Design is provided "as is" and "as available" without warranty of any kind. We are not liable for any damages arising from the use of the platform, including direct, indirect, incidental, or consequential damages.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">6. Dispute Resolution</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              Any disputes between users will be handled through our dispute resolution process. Users agree to submit to binding arbitration rather than court proceedings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">7. Changes to Terms</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              77S Design reserves the right to modify these terms at any time. Users will be notified of significant changes via email or through the platform.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}. For questions about these terms, please contact legal@77sdesign.com
        </p>
      </div>
    </div>
  );
}
