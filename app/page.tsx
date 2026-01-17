import Image from "next/image";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ProjectGrid from './components/ProjectGrid';

// Define the Project interface
interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  mainImage: string;
  projectVideo?: string;
}

// Fetch data directly in the component (Server Component)
async function getProjects() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');

  // Create directory if it doesn't exist to prevent errors
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames.map((filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      _id: filename.replace('.md', ''),
      title: data.title,
      category: data.category,
      status: data.status,
      mainImage: data.mainImage,
      projectVideo: data.projectVideo,
    } as Project;
  });

  return projects;
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
                <h1 className="text-[2.5rem] tracking-tighter text-[#8B0000]">RokoRobo</h1>
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

      <ProjectGrid projects={projects} />


      {/* FOOTER / CONTACT */}
      <div className="container footer-section">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>SIGNAL TRANSMISSION</h3>
            <p>ESTABLISH CONNECTION:</p>
            <a href="#" className="glitch-link">
              MAIL_SERVER
            </a>
            <a href="https://www.youtube.com/@rokorobo" target="_blank" className="glitch-link">
              NET_YOUTUBE
            </a>
            <a href="https://www.tiktok.com/@rokorobotic" target="_blank" className="glitch-link">
              NET_TIKTOK
            </a>
            <a href="https://soundcloud.com/rokorobo" target="_blank" className="glitch-link">
              SOUND_CLOUD
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
