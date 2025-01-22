import React from "react";

const License = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Licensing Information
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
              The Book App is distributed under specific licensing terms. By
              using this app, you agree to adhere to these terms. This
              information outlines the permissions, restrictions, and
              obligations related to the use of our platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              2. Permissions
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                You are allowed to use the app for personal, non-commercial
                purposes.
              </li>
              <li>
                You may upload, edit, and delete content (e.g., stories, reviews
                or images) as long as it complies with our terms of service.
              </li>
              <li>
                The app may be accessed and used on compatible devices as per
                the provided documentation.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              3. Restrictions
            </h2>
            <p className="text-gray-600">
              The following activities are strictly prohibited:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Copying, modifying, or distributing any part of the app’s source
                code without explicit permission.
              </li>
              <li>
                Using the app for illegal activities or to distribute malicious
                content.
              </li>
              <li>
                Reverse-engineering, decompiling, or attempting to extract the
                source code.
              </li>
              <li>Sharing or reselling your access to the app.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-gray-600">
              All content, including designs, code, and trademarks associated
              with the Book App, are the sole property of the app developers.
              Unauthorized use of any intellectual property is prohibited.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              5. Termination
            </h2>
            <p className="text-gray-600">
              Violation of this licensing agreement may result in the suspension
              or termination of your access to the app. We reserve the right to
              take legal action for any misuse of the app.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              6. Updates to Licensing Terms
            </h2>
            <p className="text-gray-600">
              We may revise our licensing terms from time to time. Updates will
              be posted here, and continued use of the app constitutes
              acceptance of the revised terms.
            </p>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Licensing Agreement, you can
              reach out to us:
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

export default License;
