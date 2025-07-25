import type { FunctionComponent } from "react";
import { FaDiscord, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact: FunctionComponent = () => {
  return (
    <div className="container p-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 text-center">
          <h1>Contact Us</h1>
          <p className="lead text-muted ">
            Let’s connect! Reach out anytime for support, collaboration, or
            community engagement.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4 d-flex align-items-center">
            <FaDiscord className="me-3 text-primary fs-4" />
            <a
              href="https://discord.gg/yourserver"
              target="_blank"
              rel="noreferrer"
              className="fs-5 text-decoration-none text-dark"
            >
              Join our Discord Community
            </a>
          </div>

          <div className="mb-4 d-flex align-items-center">
            <FaGithub className="me-3 text-dark fs-4" />
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="fs-5 text-decoration-none text-dark"
            >
              GitHub Profile
            </a>
          </div>

          <div className="mb-4 d-flex align-items-center">
            <FaEnvelope className="me-3 text-danger fs-4" />
            <a
              href="mailto:your@email.com"
              className="fs-5 text-decoration-none text-dark"
            >
              Email Us
            </a>
          </div>

          <div className="mb-4 d-flex align-items-center">
            <FaPhone className="me-3 text-success fs-4" />
            <span className="fs-5">+972-54-123-4567</span>
          </div>

          <p className="text-muted small mt-5">
            We usually respond within 24 hours. For business inquiries, please
            use email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
