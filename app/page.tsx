import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";

// Define the Project interface
interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  mainImage: any;
}

// Fetch data directly in the component (Server Component)
async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id,
    title,
    category,
    status,
    mainImage
  }`;
  return client.fetch(query);
}

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <>
      <div className="container hero-card">
        <div className="sidebar">
          <div className="vertical-text">D2 // SIGNAL OPERATIONS GROUP</div>
        </div>
        <div className="main-content">
          <div className="header-row">
            <div className="logo-section">
              <div className="logo-icon">
                {/* CSS Triangle Logo */}
                <div className="tri-outer"></div>
                <div className="tri-inner"></div>
              </div>
              <div className="logo-text">
                <h1>ISC</h1>
                <p>INDUSTRIAL SIGNAL CORE</p>
              </div>
            </div>
            <div className="meta-info">
              <div className="meta-item">
                <span className="label">INDEX</span>
              </div>
              <div className="meta-item">
                <span className="label">SIGNAL DEVELOPMENT</span>
                <div className="icon-cross">+</div>
              </div>
              <div className="meta-item lab-test">
                <span className="label">LAB TEST</span>
                <div className="value">24:B</div>
              </div>
            </div>
          </div>

          <div className="content-row">
            <div className="primary-info">
              <div className="huge-text">A2</div>
              <div className="sub-info">
                <div className="date">APRIL 2030</div>
                <div className="dot-matrix"></div>
              </div>
              <h2>
                CORE SIGNAL
                <br />
                CONTROL
              </h2>
            </div>
            <div className="secondary-info">
              <div className="routing-info">
                <span className="label">SIGNAL ROUTING</span>
                <div className="corner-marker">¬</div>
              </div>
              <div className="huge-text-pge">PGE</div>
              <div className="barcode-section">
                <span className="label">RIGHT DIRECTION</span>
                <div className="barcode"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner Markers */}
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="container section-header">
        <h2>// DATA ARCHIVES</h2>
        <div className="line-fill"></div>
        <span>SECURE_ACCESS</span>
      </div>

      <div className="container projects-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project._id} className="project-card">
              <div className="card-header">
                <span>FILE_0{index + 1}</span>
                <span>[{project.status || "UNKNOWN"}]</span>
              </div>
              <div className="card-image h-[400px]">
                {project.mainImage && (
                  <Image
                    src={urlFor(project.mainImage).width(400).url()}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                  />
                )}
                <div className="crosshair"></div>
              </div>
              <div className="card-footer">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))
        ) : (
          // Fallback if no projects exist yet
          <div className="project-card">
            <div className="card-header">
              <span>SYSTEM_MSG</span>
              <span>[EMPTY]</span>
            </div>
            <div className="card-image h-[400px]">
              <div className="crosshair"></div>
            </div>
            <div className="card-footer">
              <h3>NO_DATA_FOUND</h3>
              <p>PLEASE INITIALIZE DATABASE</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER / CONTACT */}
      <div className="container footer-section">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>SIGNAL TRANSMISSION</h3>
            <p>ESTABLISH CONNECTION:</p>
            <a href="#" className="glitch-link">
              MAIL_SERVER
            </a>
            <a href="#" className="glitch-link">
              NET_LINKEDIN
            </a>
            <a href="#" className="glitch-link">
              GIT_HUB_REPO
            </a>
          </div>
          <div className="footer-col status-col">
            <h3>SYSTEM STATUS</h3>
            <div className="status-row">
              <span>CORE_TEMP</span>
              <span className="dynamic-value">45.2°C</span>
            </div>
            <div className="status-row">
              <span>UPTIME</span>
              <span className="dynamic-value">99.9%</span>
            </div>
            <div className="status-row">
              <span>SECURITY</span>
              <span className="secure">OPTIMAL</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>ISC // INDUSTRIAL SIGNAL CORE © 2030</span>
          <span>END_OF_LINE</span>
        </div>
      </div>
    </>
  );
}
