import { useQuery } from '@tanstack/react-query';

interface ProfileData {
  profilePicUrl: string;
}

async function fetchProfilePic(username: string | null): Promise<ProfileData> {
  if (!username) {
    throw new Error('No username provided');
  }

  const response = await fetch(`/api/profile-pic?username=${username}`, {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) {
    let errorMessage = 'Failed to fetch profile picture';
    
    if (data.details) {
      try {
        const errorDetails = JSON.parse(data.details);
        errorMessage = errorDetails.description || data.error || errorMessage;
      } catch {
        errorMessage = data.error || errorMessage;
      }
    } else {
      errorMessage = data.error || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  if (!data.profilePicUrl) {
    throw new Error('No profile picture found');
  }

  return data;
}

export function useProfileFetchQuery(username: string | null) {
  return useQuery({
    queryKey: ['profile-pic', username],
    queryFn: () => fetchProfilePic(username),
    enabled: !!username,
    retry: false,
  });
}