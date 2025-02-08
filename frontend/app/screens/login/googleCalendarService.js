import { useAuth } from "@clerk/clerk-expo";

export async function getGoogleAccessToken() {
  try {
    const { getToken } = useAuth(); // ✅ Correct way to get the OAuth token

    if (!getToken) {
      console.error("❌ Clerk's getToken() method is undefined.");
      return null;
    }

    console.log("🔄 Attempting to retrieve Google OAuth token...");

    // Attempt to retrieve OAuth token from Clerk
    const token = await getToken({ template: "oauth_google" });

    if (token) {
      console.log("✅ Google Access Token Retrieved:", token);
      return token;
    } else {
      console.warn("⚠️ Google OAuth token is null or undefined.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching Google OAuth token:", error);
    return null;
  }
}

export async function fetchGoogleCalendarEvents() {
  const accessToken = await getGoogleAccessToken();

  if (!accessToken) {
    console.error("⚠️ No access token available for Google Calendar.");
    return;
  }

  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`❌ Error fetching calendar events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Google Calendar Events:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching Google Calendar events:", error);
    return null;
  }
}
