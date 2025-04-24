"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Moodify! By using our website and services, you agree to the following terms and conditions.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using Moodify, you agree to be bound by these Terms of Service and our Privacy Policy.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Use of Service</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You must be at least 13 years old to use Moodify.</li>
        <li>Do not use Moodify for any unlawful or harmful activities.</li>
        <li>You are responsible for your account and any activity under it.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        All content, features, and functionality on Moodify are the exclusive property of Moodify and its licensors.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to Moodify at any time, for any reason, without notice.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Disclaimer</h2>
      <p className="mb-4">
        Moodify is provided "as is" and "as available" without warranties of any kind. Use at your own risk.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. Continued use of Moodify means you accept the new terms.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact</h2>
      <p>
        For questions about these terms, contact us at{" "}
        <a href="mailto:support@moodify.com" className="text-blue-600 underline">support@moodify.com</a>.
      </p>
    </div>
  );
}