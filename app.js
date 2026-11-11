const form = document.querySelector("#card-form");
const nameInput = document.querySelector("#person-name");
const ageInput = document.querySelector("#person-age");
const hobbyInput = document.querySelector("#person-hobby");
const coverName = document.querySelector("#cover-name");
const greeting = document.querySelector("#inside-greeting");
const output = document.querySelector("#message-output");
const copyButton = document.querySelector("#copy-button");
const againButton = document.querySelector("#again-button");
const printButton = document.querySelector("#print-button");
const toast = document.querySelector("#toast");

let selectedStyle = "witty";
let lastMessage = "";
let variation = 0;

const templates = {
  witty: [
    (n,a,h) => `Happy Birthday, ${n}! 🎉\n\nThey say age is just a number. In your case, it's a pretty impressive one! At ${a}, you still have plenty of time to master ${h}. Until then, keep pretending you know what you're doing! 😂`,
    (n,a,h) => `Another trip around the sun, ${n}! 🥳\n\nYou're now ${a}, which means you're officially old enough to know better — but clearly still young enough to do it anyway. Keep enjoying ${h}; it's cheaper than therapy (probably).`,
    (n,a,h) => `Happy Birthday, ${n}! 🎂\n\nYour talent for ${h} gets stronger every year. Your ability to remember why you walked into a room? Let's not talk about that. Have the best day!`
  ],
  savage: [
    (n,a,h) => `Dear ${n},\n\nAnother year older, but let's not confuse that with becoming wiser. Your obsession with ${h} is still going strong. At ${a}, at least you're consistent at something! 🤣`,
    (n,a,h) => `Breaking news: ${n} has levelled up to age ${a}! 🚨\n\nNew features include making strange noises when standing up and telling people how things were better before. Still no update to the ${h} addiction. Happy birthday!`,
    (n,a,h) => `Happy Birthday, ${n}!\n\nYou're not getting old — you're becoming a classic. Like an old phone: a little slower, occasionally confused, but somehow still obsessed with ${h}.`
  ],
  playful: [
    (n,a,h) => `It's party time, ${n}! 🥳\n\nMay your cake be sweet, your gifts expensive, and your ${h} adventures completely ridiculous! Remember, calories don't count on birthdays. 🎂`,
    (n,a,h) => `Happy Birthday, ${n}!\n\nToday, your only responsibilities are to smile, eat cake and talk about ${h} as much as humanly possible. Tomorrow can worry about itself!`,
    (n,a,h) => `A very happy birthday to you, ${n}! 🎈\n\nMay your day be 10% birthday wishes, 20% presents and 70% doing absolutely whatever you want — especially ${h}.`
  ],
  sweet: [
    (n,a,h) => `To the amazing ${n},\n\nMay your days be filled with happiness, laughter and endless opportunities to enjoy ${h}. You're not getting older, just becoming a limited edition! ❤️`,
    (n,a,h) => `Happy Birthday, ${n}! 💝\n\nThe world is brighter with you in it. Keep being kind, keep laughing, and never lose the joy you find in ${h}. You're one of a kind — and thankfully, there's no return policy!`,
    (n,a,h) => `Cheers to you, ${n}!\n\nWishing you a year full of good people, great memories and plenty of time for ${h}. May your happiness multiply faster than the candles on your cake!`
  ],
  roast: [
    (n,a,h) => `Hey ${n}!\n\nCongratulations on reaching level ${a}! Unfortunately, your maturity is still stuck on level 12. Keep enjoying ${h} and being the wonderfully ridiculous person we all know! 🌶️`,
    (n,a,h) => `Happy Birthday, ${n}!\n\nYou're ${a} now. Time to act mature! Just kidding. We all know you'll be busy with ${h} instead. Never change — mostly because we're curious what happens next.`,
    (n,a,h) => `Dear ${n},\n\nAnother year older and still no sign of becoming a responsible adult. Your commitment to ${h} is admirable; your commitment to sensible decisions remains under review. Have a brilliant birthday!`
  ]
};

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function createMessage() {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    showToast("Add their name to get started.");
    return;
  }
  const age = ageInput.value.trim() || "another year";
  const hobby = hobbyInput.value.trim() || "having fun";
  const choices = templates[selectedStyle];
  const index = variation % choices.length;
  const opening = choices[index](name, age, hobby);
  lastMessage = `${opening}\n\nHere's to another year of great memories, big laughs and absolutely no grown-up responsibilities!\n\nStay awesome! ❤️`;
  variation += 1;
  coverName.textContent = name.toUpperCase();
  greeting.textContent = `Dear ${name},`;
  output.textContent = lastMessage;
  copyButton.disabled = false;
  againButton.disabled = false;
  showToast("Your birthday card is ready! ✨");
}

document.querySelectorAll(".style-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".style-option").forEach(option => {
      option.classList.remove("selected");
      option.setAttribute("aria-pressed", "false");
    });
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    selectedStyle = button.dataset.style;
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  variation = 0;
  createMessage();
});
againButton.addEventListener("click", createMessage);
copyButton.addEventListener("click", async () => {
  if (!lastMessage) return;
  try {
    await navigator.clipboard.writeText(lastMessage);
    showToast("Message copied to your clipboard!");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = lastMessage;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    showToast("Message copied!");
  }
});
printButton.addEventListener("click", () => window.print());

// Keep the card's cover name in sync while the visitor types.
nameInput.addEventListener("input", () => {
  coverName.textContent = nameInput.value.trim().toUpperCase() || "YOUR NAME HERE";
});
