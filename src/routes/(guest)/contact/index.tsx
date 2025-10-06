import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  routeAction$,
  Form,
  zod$,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "~/components/Breadcrumbs/useBreadcrumbs";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

/**
 * Contact form validation schema
 */
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Contact form submission action
 */
export const useContactAction = routeAction$(async (values) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Here you would typically send an email or save to database
  console.log("Contact form submission:", values);

  // In production, integrate with email service like SendGrid, AWS SES, etc.
  // For now, we'll just return success
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
}, zod$(contactFormSchema));

export default component$(() => {
  const contactAction = useContactAction();
  const breadcrumbs = useBreadcrumbs();
  const { ref: heroRef } = useScrollAnimation();
  const { ref: formRef } = useScrollAnimation();
  const socialStaggerRef = useStaggerAnimation(100);
  const infoStaggerRef = useStaggerAnimation(150);
  const isSubmitting = useSignal(false);

  const handleSubmit = $(() => {
    isSubmitting.value = true;
  });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20"
      >
        <div class="hero-content text-center">
          <div class="max-w-3xl">
            <h1 class="mb-5 text-5xl font-bold">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p class="mb-8 text-lg">
              Have a project in mind? Want to collaborate? Or just want to say
              hello? I'd love to hear from you. Drop me a message and I'll get
              back to you as soon as possible.
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              <div class="badge badge-primary badge-lg">
                Open to Opportunities
              </div>
              <div class="badge badge-secondary badge-lg">
                Available for Freelance
              </div>
              <div class="badge badge-accent badge-lg">Quick Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section class="bg-base-200 py-20">
        <div class="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <div class="mb-8">
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div class="lg:col-span-2">
              <div ref={formRef} class="card bg-base-100 shadow-xl">
                <div class="card-body">
                  <h2 class="card-title text-2xl mb-4">Send Me a Message</h2>

                  {/* Success Message */}
                  {contactAction.value?.success && (
                    <div class="alert alert-success mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{contactAction.value.message}</span>
                    </div>
                  )}

                  {/* Form */}
                  <Form
                    action={contactAction}
                    onSubmit$={handleSubmit}
                    class="space-y-4"
                  >
                    {/* Name Field */}
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text font-semibold">
                          Your Name <span class="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        class={`input input-bordered w-full ${
                          contactAction.value?.fieldErrors?.name
                            ? "input-error"
                            : ""
                        }`}
                        required
                      />
                      {contactAction.value?.fieldErrors?.name && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {contactAction.value.fieldErrors.name}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Email Field */}
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text font-semibold">
                          Email Address <span class="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        class={`input input-bordered w-full ${
                          contactAction.value?.fieldErrors?.email
                            ? "input-error"
                            : ""
                        }`}
                        required
                      />
                      {contactAction.value?.fieldErrors?.email && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {contactAction.value.fieldErrors.email}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text font-semibold">
                          Subject <span class="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Project Inquiry"
                        class={`input input-bordered w-full ${
                          contactAction.value?.fieldErrors?.subject
                            ? "input-error"
                            : ""
                        }`}
                        required
                      />
                      {contactAction.value?.fieldErrors?.subject && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {contactAction.value.fieldErrors.subject}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Message Field */}
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text font-semibold">
                          Message <span class="text-error">*</span>
                        </span>
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project or what you'd like to discuss..."
                        class={`textarea textarea-bordered h-32 w-full ${
                          contactAction.value?.fieldErrors?.message
                            ? "textarea-error"
                            : ""
                        }`}
                        required
                      ></textarea>
                      {contactAction.value?.fieldErrors?.message && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {contactAction.value.fieldErrors.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      class="btn btn-primary btn-block"
                      disabled={isSubmitting.value || contactAction.isRunning}
                    >
                      {contactAction.isRunning ? (
                        <>
                          <span class="loading loading-spinner"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </Form>
                </div>
              </div>
            </div>

            {/* Contact Info & Social Links */}
            <div class="space-y-6">
              {/* Contact Information */}
              <div ref={infoStaggerRef} class="space-y-4">
                <div class="card bg-base-100 shadow-xl">
                  <div class="card-body">
                    <h3 class="card-title text-xl mb-4">Contact Information</h3>

                    {/* Email */}
                    <div class="flex items-start gap-3 mb-4">
                      <div class="bg-primary/10 rounded-lg p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold">Email</h4>
                        <a
                          href="mailto:hello@example.com"
                          class="link link-primary text-sm"
                        >
                          hello@example.com
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div class="flex items-start gap-3 mb-4">
                      <div class="bg-secondary/10 rounded-lg p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold">Location</h4>
                        <p class="text-sm text-base-content/70">
                          Jakarta, Indonesia
                        </p>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div class="flex items-start gap-3">
                      <div class="bg-accent/10 rounded-lg p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-semibold">Response Time</h4>
                        <p class="text-sm text-base-content/70">
                          Usually within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div class="card bg-base-100 shadow-xl">
                  <div class="card-body">
                    <h3 class="card-title text-xl mb-4">Connect With Me</h3>
                    <div ref={socialStaggerRef} class="space-y-3">
                      {/* GitHub */}
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline w-full justify-start gap-3 hover:btn-primary"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline w-full justify-start gap-3 hover:btn-info"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                      </a>

                      {/* Twitter/X */}
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline w-full justify-start gap-3 hover:btn-accent"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline w-full justify-start gap-3 hover:btn-secondary"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>

                {/* Availability Status */}
                <div class="alert alert-success shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 class="font-bold">Currently Available</h3>
                    <div class="text-xs">
                      Open for new projects & collaborations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Contact - Let's Work Together",
  meta: [
    {
      name: "description",
      content:
        "Get in touch for project inquiries, collaborations, or just to say hello. I'm always open to discussing new opportunities and ideas.",
    },
    {
      name: "keywords",
      content:
        "contact, get in touch, hire developer, project inquiry, collaboration, freelance",
    },
    {
      property: "og:title",
      content: "Contact - Let's Work Together",
    },
    {
      property: "og:description",
      content:
        "Get in touch for project inquiries, collaborations, or opportunities.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};
