"use client";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Last updated:</strong> {new Date().toLocaleDateString()}
      </p>
      <p className="mb-4">
        Moodify ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Account Information:</strong> When you sign up or log in, we collect your email address and authentication details via our authentication provider.
        </li>
        <li>
          <strong>Mood Data:</strong> We collect the mood or emotion you select to personalize your experience.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect information about how you use Moodify, such as pages visited, time spent, and interactions.
        </li>
        <li>
          <strong>Device & Log Data:</strong> We may collect information about your device, browser, IP address, and log data for security and analytics.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and analyze usage.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and personalize Moodify’s features and content based on your mood and preferences.</li>
        <li>To authenticate users and secure your account.</li>
        <li>To analyze usage and improve our services.</li>
        <li>To communicate with you about updates, features, or support.</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. How We Share Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We do <strong>not</strong> sell or rent your personal information to third parties.</li>
        <li>
          We may share information with trusted service providers (such as authentication and analytics providers) who assist us in operating Moodify, subject to confidentiality agreements.
        </li>
        <li>
          We may disclose information if required by law, regulation, or legal process, or to protect the rights, property, or safety of Moodify, our users, or others.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Choices</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          You can update or delete your account information at any time by contacting us or using account settings.
        </li>
        <li>
          You may disable cookies in your browser, but some features of Moodify may not function properly.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Children's Privacy</h2>
      <p className="mb-4">
        Moodify is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us to have it removed.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of Moodify after changes are posted constitutes your acceptance of the new policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or your data, please contact us at{" "}
        <a href="mailto:privacy@moodify.com" className="text-blue-600 underline">privacy@moodify.com</a>.
      </p>
    </div>
  );
}