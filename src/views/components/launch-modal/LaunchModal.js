import "./LaunchModal.scss"
import { ConvertTimeStampToLocal } from "../../../utils/Utils"
import Check from "../check/Check"

function LaunchModal({ launch, onClose }) {
  if (!launch) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{launch.mission_name}</h2>
          <span className="flight-number">Flight #{launch.flight_number}</span>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Launch Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Launch Date:</span>
                <span className="value">{ConvertTimeStampToLocal(launch.launch_date_unix)}</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value"><Check check={launch.launch_success} /></span>
              </div>
              <div className="info-item">
                <span className="label">Rocket:</span>
                <span className="value">{launch.rocket.rocket_name}</span>
              </div>
              <div className="info-item">
                <span className="label">Rocket Type:</span>
                <span className="value">{launch.rocket.rocket_type}</span>
              </div>
              <div className="info-item">
                <span className="label">Launch Site:</span>
                <span className="value">{launch.launch_site.site_name}</span>
              </div>
            </div>
          </div>

          {launch.details && (
            <div className="modal-section">
              <h3>Mission Description</h3>
              <p className="mission-description">{launch.details}</p>
            </div>
          )}

          {(launch.links?.video_link || launch.links?.article_link) && (
            <div className="modal-section">
              <h3>Resources</h3>
              <div className="links-grid">
                {launch.links.video_link && (
                  <a 
                    href={launch.links.video_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link video"
                  >
                    Watch Video
                  </a>
                )}
                {launch.links.article_link && (
                  <a 
                    href={launch.links.article_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link article"
                  >
                    Read Article
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LaunchModal
