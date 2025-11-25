export function getSessionId() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) return user.username;

  let guest = localStorage.getItem("guestId");
  if (guest) return guest;

  const newGuest = "guest-" + Math.random().toString(36).substring(2, 9);
  localStorage.setItem("guestId", newGuest);
  return newGuest;
}
