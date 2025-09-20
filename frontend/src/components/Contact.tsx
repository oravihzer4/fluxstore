import type { FunctionComponent } from "react";
import { FaDiscord, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact: FunctionComponent = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8 text-center">
          <div className="d-flex flex-column align-items-center mb-3">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{ width: 70, height: 70 }}
            >
              <i className="fa-solid fa-envelope-open-text fa-2x"></i>
            </div>
            <h2 className="fw-bold mb-1">Contact Us</h2>
            <p className="lead mb-0">
              We're here to help! Reach out for support, feedback, or
              partnership opportunities.
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-lg border-0 rounded-2 p-4 bg-light">
            <div className="mb-4 d-flex align-items-center gap-3">
              <FaDiscord className="text-primary fs-2" />
              <a
                href="https://discord.gg/yourserver"
                target="_blank"
                rel="noreferrer"
                className="fs-5 text-decoration-none text-dark fw-semibold"
              >
                Discord Community
              </a>
            </div>
            <div className="mb-4 d-flex align-items-center gap-3">
              <FaGithub className="text-dark fs-2" />
              <a
                href="https://github.com/oravihzer4"
                target="_blank"
                rel="noreferrer"
                className="fs-5 text-decoration-none text-dark fw-semibold"
              >
                GitHub Profile
              </a>
            </div>
            <div className="mb-4 d-flex align-items-center gap-3">
              <FaEnvelope className="text-danger fs-2" />
              <a
                href="oravihzer4@gmail.com"
                className="fs-5 text-decoration-none text-dark fw-semibold"
              >
                Email Us
                <span className="opacity-25"> - oravihzer4@gmail.com</span>
              </a>
            </div>
            <div className="mb-4 d-flex align-items-center gap-3">
              <FaPhone className="text-success fs-2" />
              <span className="fs-5 fw-semibold">+972-54-592-0145</span>
            </div>
            <div className="text-center mt-4">
              <p className="small">
                We respond within 24 hours. For business inquiries, please use
                email.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .card:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.02);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
