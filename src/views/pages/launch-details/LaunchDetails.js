import { useEffect, useState } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import "./LaunchDetails.scss"
import Axios from "../../../Axios"
import { ConvertTimeStampToLocal } from "../../../utils/Utils"
import { transformSingleLaunch } from "../../../utils/transformLaunchData"
import Header from "../../components/header/Header"
import Menu from "../../components/menu/Menu"
import Loading from "../../components/loading/Loading"

function LaunchDetails() {
  const { id } = useParams()
  const history = useHistory()
  const [launch, setLaunch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const fetchLaunch = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await Axios.get(`launch/${id}/`)
        if (mounted) {
          setLaunch(transformSingleLaunch(response.data))
        }
      } catch (err) {
        console.error("Error fetching launch details:", err)
        if (mounted) {
          setError(err.response?.status === 404 ? "not-found" : "generic")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchLaunch()

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) {
    return <Loading />
  }

  return (
    <article className="launch-details">
      {error ? (
        <section className="launch-details-card">
          <div className="launch-details-error">
            {error === "not-found" ? (
              <>
                <h1>Launch not found</h1>
                <p>We couldn't load the details for this launch. It may have been removed or the link may be invalid.</p>
              </>
            ) : (
              <>
                <h1>Something went wrong</h1>
                <p>We couldn't load the details for this launch. Please try again.</p>
              </>
            )}
            <Link to="/all-launches" className="launch-details-link">Back to All Launches</Link>
          </div>
        </section>
      ) : (
        <>
          <section className="launch-details-card">
            <div className="launch-details-header">
              <button
                type="button"
                className="launch-details-back"
                onClick={() => (history.length > 1 ? history.goBack() : history.push("/all-launches"))}
              >
                &#8592; Back
              </button>
              <h1>{launch.mission_name}</h1>
              <span className="launch-details-status">{launch.status_name || (launch.launch_success === true ? "Successful" : launch.launch_success === false ? "Failed" : "Unknown")}</span>
            </div>
            <div className="launch-details-body">
              <div className="launch-details-detail">
                <span className="label">Flight</span>
                <span className="value">{launch.flight_number || "—"}</span>
              </div>
              <div className="launch-details-detail">
                <span className="label">Launch Date</span>
                <span className="value">{ConvertTimeStampToLocal(launch.launch_date_unix)}</span>
              </div>
              <div className="launch-details-detail">
                <span className="label">Rocket Name</span>
                <span className="value">{launch.rocket.rocket_name}</span>
              </div>
              <div className="launch-details-detail">
                <span className="label">Rocket Type</span>
                <span className="value">{launch.rocket.rocket_type}</span>
              </div>
              <div className="launch-details-detail">
                <span className="label">Site Name</span>
                <span className="value">{launch.launch_site.site_name_long || launch.launch_site.site_name}</span>
              </div>
              <div className="launch-details-detail">
                <span className="label">Launch Success</span>
                <span className="value">{launch.launch_success === true ? "Yes" : launch.launch_success === false ? "No" : "Unknown"}</span>
              </div>
            </div>
            <div className="launch-details-description">
              <h2>Details</h2>
              <p>{launch.details || "No details available for this launch."}</p>
            </div>
            {(launch.links.article_link || launch.links.video_link) && (
              <div className="launch-details-links">
                <h2>Links</h2>
                {launch.links.article_link && (
                  <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer" className="launch-details-link">Read Article</a>
                )}
                {launch.links.video_link && (
                  <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer" className="launch-details-link">Watch Video</a>
                )}
              </div>
            )}
          </section>
          <div className="boxes">
            <aside>
              <Header />
              <Menu vertical />
            </aside>
          </div>
        </>
      )}
    </article>
  )
}

export default LaunchDetails