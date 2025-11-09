import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We collect information you provide directly to us, such as when you create an account, complete your profile, or communicate with other users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name and email address</li>
              <li>Profile information and portfolio</li>
              <li>Payment and billing information</li>
              <li>Messages and communications with other users</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">2. How We Use Information</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We use the information we collect to provide, maintain, and improve our services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing contests and projects</li>
              <li>Facilitating communication between users</li>
              <li>Processing payments</li>
              <li>Sending notifications and updates</li>
              <li>Preventing fraud and ensuring security</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">3. Information Sharing</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We do not sell or share your personal information with third parties except as necessary to provide our services. We may share information with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payment processors for transaction processing</li>
              <li>Service providers who assist us in operating the platform</li>
              <li>Law enforcement if required by legal process</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">5. Your Rights</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              You have the right to access, correct, or delete your personal information. You can manage your preferences through your account settings. To exercise these rights, contact us at privacy@77sdesign.com.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">6. Cookies</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We use cookies and similar technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">7. Changes to Policy</h2>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We may update this privacy policy periodically. We will notify you of significant changes via email or through the platform.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}. For questions about our privacy practices, please contact privacy@77sdesign.com
        </p>
      </div>
    </div>
  );
}
