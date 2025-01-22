import React from "react";

const Privacy = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Last updated: <strong>January 13, 2025</strong>
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600">
              Welcome to the Book App! We are committed to protecting your
              privacy and ensuring that your personal information is handled
              securely. This Privacy Policy explains how we collect, use, and
              protect your data when you use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              2. Data We Collect
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Account Information:</strong> When you sign up, we
                collect your name, email, and password.
              </li>
              <li>
                <strong>Content:</strong> Any stories, reviews, or images you
                upload to the platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use the
                app, such as page views, clicks, and interactions.
              </li>
              <li>
                <strong>Device Information:</strong> Your IP address, browser
                type, and operating system.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide and personalize your experience on the Book App.</li>
              <li>Enable you to upload, edit, and review stories.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Analyze app performance to improve our services.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-600">
              We do not sell your personal data. However, we may share your
              information with trusted third parties to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Comply with legal obligations.</li>
              <li>Protect our rights and users' safety.</li>
              <li>
                Improve our platform through analytics and third-party tools.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              5. Your Rights
            </h2>
            <p className="text-gray-600">As a user, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of receiving promotional communications.</li>
              <li>Withdraw consent for data collection at any time.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-600">
              We implement strict security measures to protect your data from
              unauthorized access, alteration, or destruction. However, please
              note that no method of transmission over the internet is 100%
              secure.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              7. Updates to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy to reflect changes in our
              practices. Any updates will be posted on this page with a revised
              "Last Updated" date.
            </p>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <ul className="list-none text-gray-600">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@bookapp.com"
                  className="text-blue-600 hover:underline"
                >
                  support@bookapp.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +1 (234) 567-890
              </li>
              <li>
                <strong>Address:</strong> 123 Story Lane, Creativity City, USA
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
