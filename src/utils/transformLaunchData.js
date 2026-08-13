/**
 * Transforms Space Devs API data to match the old SpaceX API schema
 * This ensures backward compatibility with existing components
 */
export const transformLaunchData = (spaceDevsData) => {
  if (!spaceDevsData || !spaceDevsData.results) {
    return [];
  }

  return spaceDevsData.results.map((launch, index) => {
    // Extract flight number from launch id or use index
    const flightNumber = launch.flight_number || index + 1;
    
    // Convert ISO date string to Unix timestamp
    const launchDateUnix = launch.net ? Math.floor(new Date(launch.net).getTime() / 1000) : null;
    
    // Determine launch success based on status
    const launchSuccess = launch.status?.id === 3 ? true : 
                         launch.status?.id === 4 || launch.status?.id === 7 ? false : 
                         null;
    
    return {
      flight_number: flightNumber,
      mission_name: launch.name || '',
      launch_date_unix: launchDateUnix,
      launch_date_utc: launch.net || '',
      launch_success: launchSuccess,
      rocket: {
        rocket_id: launch.rocket?.configuration?.id || '',
        rocket_name: launch.rocket?.configuration?.name || 'Unknown',
        rocket_type: launch.rocket?.configuration?.variant || launch.rocket?.configuration?.family || 'Unknown'
      },
      launch_site: {
        site_id: launch.pad?.id || '',
        site_name: launch.pad?.name || 'Unknown',
        site_name_long: launch.pad?.location?.name || ''
      },
      details: launch.mission?.description || '',
      links: {
        mission_patch: null,
        mission_patch_small: null,
        article_link: launch.mission?.info_urls?.[0] || null,
        video_link: launch.mission?.vid_urls?.[0] || null
      }
    };
  });
};
