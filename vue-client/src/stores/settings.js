import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const username = ref(localStorage.getItem("username") || "Someone");
  const quote = ref(
    localStorage.getItem("quote") || "Don't let yesterday take up too much of today."
  );
  const session = ref(localStorage.getItem("session") || 25);
  const shortBreak = ref(localStorage.getItem("shortBreak") || 5);
  const longBreak = ref(localStorage.getItem("longBreak") || 20);

  const validate = (username, quote, session, shortBreak, longBreak) => {
    if (!username) return { error: "Please enter a username" };
    if (!quote) return { error: "Please enter a quote" };
    if (!session) return { error: "Please enter a session length" };
    if (!shortBreak) return { error: "Please enter a short break length" };
    if (!longBreak) return { error: "Please enter a long break length" };

    if (session > 120) return { error: "Session length must be less than 2 hours" };
    if (shortBreak > 120) return { error: "Short break length must be less than 2 hours" };
    if (longBreak > 120) return { error: "Long break length must be less than 2 hours" };

    if (session < 1) return { error: "Session length must be at least 1 minute" };
    if (shortBreak < 1) return { error: "Short break length must be at least 1 minute" };
    if (longBreak < 1) return { error: "Long break length must be at least 1 minute" };

    return { ok: true };
  };

  const updateSettings = (newUsername, newQuote, newSession, newShortBreak, newLongBreak) => {
    const validation = validate(newUsername, newQuote, newSession, newShortBreak, newLongBreak);
    if (validation.error) return { error: validation.error };

    username.value = newUsername;
    quote.value = newQuote;
    session.value = newSession;
    shortBreak.value = newShortBreak;
    longBreak.value = newLongBreak;

    localStorage.setItem("username", newUsername);
    localStorage.setItem("quote", newQuote);
    localStorage.setItem("session", newSession);
    localStorage.setItem("shortBreak", newShortBreak);
    localStorage.setItem("longBreak", newLongBreak);

    return { ok: true };
  };

  return {
    username,
    quote,
    session,
    shortBreak,
    longBreak,
    updateSettings,
  };
});
