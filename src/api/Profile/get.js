import { load } from '../../storage/load';
import { authFetch } from '../auth/authFetch';
import { apiUrl } from '../constants';

const action = '?_bookings=true&_venues=true';
const name = load('profile')?.name;

export async function getProfiles() {
  try {
    const getProfilesUrl = `${apiUrl}/profiles${action}`;
    const response = await authFetch(getProfilesUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch venues: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
}

export async function getProfile(name) {
  if (!name) {
    throw new Error('Requires a name');
  }

  const getProfileUrl = `${apiUrl}/profiles/${name}`;

  try {
    const response = await authFetch(getProfileUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile venues: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile venues:', error);
    throw error;
  }
}
