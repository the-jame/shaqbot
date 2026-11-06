// Rules for turning "=why <question>" into the statement before "because".
// Covers the common shapes; returns null when unsure so main.js can use its fallback.

const BE = new Set(["is", "are", "am", "was", "were"]);
const HAVE = new Set(["has", "have", "had"]);
const DO = new Set(["do", "does", "did"]);
const MODALS = new Set(["can", "could", "will", "would", "should", "shall", "may", "might", "must"]);

const NO_APOS = {
  isnt: "isn't", arent: "aren't", wasnt: "wasn't", werent: "weren't", hasnt: "hasn't", havent: "haven't",
  hadnt: "hadn't", dont: "don't", doesnt: "doesn't", didnt: "didn't", cant: "can't", couldnt: "couldn't",
  wont: "won't", wouldnt: "wouldn't", shouldnt: "shouldn't", mustnt: "mustn't", cannot: "can't",
};

const SWAP = {
  my: "your", your: "my", mine: "yours", yours: "mine", myself: "yourself", yourself: "myself",
  i: "you", me: "you", "i'm": "you're", im: "you're", "you're": "I'm", youre: "I'm",
  "i'll": "you'll", "you'll": "I'll", "i've": "you've", "you've": "I've", "i'd": "you'd", "you'd": "I'd",
};

const PRONOUNS = new Set("i you u he she it we they there everyone everybody nobody someone somebody anyone anybody everything nothing something".split(" "));
const DETS = new Set("the a an my your his her its our their this that these those some any every each no another both all".split(" "));
const PREPS = new Set("in on at to for from with by about into onto over under near behind between through during without against inside outside across toward towards after before around".split(" "));
const ADVERBS = new Set("not never always still just even also only really already ever too so very now again suddenly actually literally often usually finally probably definitely simply somehow constantly forever completely".split(" "));
const CLAUSE = new Set("who which whose and or but when where while if because then".split(" "));
const ADJECTIVES = new Set("big small little large huge tiny old new young fat skinny tall short long red blue green black white yellow orange purple pink brown grey gray golden stupid dumb smart good bad evil angry mad sad happy ugly pretty beautiful cute weird random whole entire first last next other same dead fake real sexy hot cold dirty clean rich poor famous local great gay straight fucking damn goddamn shitty giant fresh stale wet dry loud quiet fast slow lazy crazy sick drunk naked sleepy hungry annoying tired sweaty greasy moldy".split(" "));
const NOT_VERB = new Set("in on at to for from with by about into onto under near behind between through during without inside outside across toward towards the a an and or but who which that when where while if because".split(" "));

// Common present-tense verbs that happen to end in "ed", so "did ... need" doesn't become "need".
const PRESENT_ED = new Set("need feed seed weed speed bleed breed shed embed wed proceed exceed succeed".split(" "));

const IRREGULAR = {
  have: "had", do: "did", go: "went", say: "said", get: "got", make: "made", know: "knew", think: "thought",
  take: "took", see: "saw", come: "came", give: "gave", find: "found", tell: "told", become: "became",
  leave: "left", feel: "felt", bring: "brought", begin: "began", keep: "kept", hold: "held", write: "wrote",
  stand: "stood", hear: "heard", let: "let", mean: "meant", set: "set", meet: "met", run: "ran", pay: "paid",
  sit: "sat", speak: "spoke", lie: "lied", lead: "led", read: "read", grow: "grew", lose: "lost", fall: "fell",
  send: "sent", build: "built", understand: "understood", draw: "drew", break: "broke", spend: "spent",
  cut: "cut", rise: "rose", drive: "drove", buy: "bought", wear: "wore", choose: "chose", eat: "ate",
  drink: "drank", sleep: "slept", fly: "flew", swim: "swam", sing: "sang", ring: "rang", sink: "sank",
  throw: "threw", catch: "caught", teach: "taught", fight: "fought", hide: "hid", bite: "bit", steal: "stole",
  forget: "forgot", forgive: "forgave", win: "won", sell: "sold", shoot: "shot", hit: "hit", put: "put",
  hurt: "hurt", cost: "cost", shut: "shut", quit: "quit", spread: "spread", lay: "laid", deal: "dealt",
  dig: "dug", feed: "fed", hang: "hung", light: "lit", ride: "rode", seek: "sought", shake: "shook",
  shine: "shone", stick: "stuck", strike: "struck", swear: "swore", tear: "tore", wake: "woke", weep: "wept",
  blow: "blew", beat: "beat", bleed: "bled", bend: "bent", bet: "bet", bind: "bound", breed: "bred",
  creep: "crept", flee: "fled", fling: "flung", freeze: "froze", grind: "ground", lend: "lent", slide: "slid",
  spin: "spun", split: "split", spit: "spat", sting: "stung", swing: "swung", undo: "undid", withdraw: "withdrew",
  shit: "shit", cum: "came", mistake: "mistook", forbid: "forbade", arise: "arose", sweep: "swept", sneak: "snuck",
};
const PAST_FORMS = new Set(Object.values(IRREGULAR));

function toPast(verb) {
  const v = verb.toLowerCase();
  if (IRREGULAR[v]) return IRREGULAR[v];
  if (/e$/.test(v)) return v + "d";
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + "ied";
  const groups = v.match(/[aeiouy]+/g) || [];
  if (groups.length === 1 && /[^aeiou][aeiou][^aeiouwxy]$/.test(v)) return v + v[v.length - 1] + "ed";
  return v + "ed";
}

function toThird(verb) {
  const v = verb.toLowerCase();
  if (v === "have") return "has";
  if (v === "do") return "does";
  if (v === "go") return "goes";
  if (v === "be") return "is";
  if (/(s|x|z|ch|sh|o)$/.test(v)) return v + "es";
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + "ies";
  return v + "s";
}

function isPastVerb(verb) {
  const v = verb.toLowerCase();
  if (PAST_FORMS.has(v)) return true;
  return v.endsWith("ed") && !PRESENT_ED.has(v);
}

function negative(aux) {
  return { can: "can't", will: "won't", shall: "shall not", am: "am not", may: "may not", might: "might not" }[aux] || aux + "n't";
}

function split(tok) {
  const m = tok.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);
  return { pre: m[1], core: m[2], post: m[3] };
}

function norm(word) {
  return word.toLowerCase().replace(/[’‘]/g, "'");
}

function swapToken(tok, subject) {
  const { pre, core, post } = split(tok);
  const key = norm(core);
  let out = null;
  if (key === "you" || key === "u") out = subject ? "I" : "me";
  else if (SWAP[key]) out = SWAP[key];
  if (out === null) return tok;
  if (core !== "I" && /^[A-Z]/.test(core) && out !== "I" && !/^I'/.test(out)) out = out[0].toUpperCase() + out.slice(1);
  return pre + out + post;
}

function classifyAux(raw) {
  let w = norm(raw);
  if (NO_APOS[w]) w = NO_APOS[w];
  let neg = false;
  if (w.endsWith("n't")) {
    neg = true;
    w = w.slice(0, -3);
    if (w === "ca") w = "can";
    else if (w === "wo") w = "will";
    else if (w === "sha") w = "shall";
  }
  if (BE.has(w)) return { type: "be", base: w, neg };
  if (HAVE.has(w)) return { type: "have", base: w, neg };
  if (DO.has(w)) return { type: "do", base: w, neg };
  if (MODALS.has(w)) return { type: "modal", base: w, neg };
  return null;
}

function subjectLength(rest, names) {
  const w = rest.map(t => norm(split(t).core));
  const n = w.length;
  if (!n) return 0;
  if (PRONOUNS.has(w[0])) return 1;

  // "did Poop Sucko die": a run of capitalized words is a proper name, not a verb.
  if (!DETS.has(w[0]) && !/'s$/.test(w[0]) && /^[A-Z]/.test(split(rest[0]).core)) {
    let j = 0;
    while (j < n && /^[A-Z]/.test(split(rest[j]).core)) j++;
    if (j > 0 && j < n) return j;
  }

  if (!DETS.has(w[0]) && !/'s$/.test(w[0])) {
    let best = 0;
    for (const name of names) {
      const parts = name.toLowerCase().split(/\s+/).filter(Boolean);
      if (parts.length <= best || parts.length > n) continue;
      if (parts.every((part, i) => part === w[i])) best = parts.length;
    }
    if (best) return best;
  }

  if (DETS.has(w[0]) || /'s$/.test(w[0])) {
    // "is that true" / "did this work" / "is that a lizard": these are pronouns, not determiners.
    if (["this", "that", "these", "those"].includes(w[0]) &&
        (n === 2 || DETS.has(w[1]) || PREPS.has(w[1]) || ADVERBS.has(w[1]) || /ing$/.test(w[1]))) {
      return 1;
    }
    let j = 1;
    while (j < n && (/['’]s$/.test(w[j]) || ADJECTIVES.has(w[j]) || /^\d+$/.test(w[j]))) j++;
    if (j >= n) return 0;
    if (PREPS.has(w[j]) || ADVERBS.has(w[j]) || CLAUSE.has(w[j]) || DETS.has(w[j]) || classifyAux(w[j])) return 0;
    j++;
    if (w[j] === "of") {
      j++;
      if (DETS.has(w[j])) j++;
      if (j >= n) return 0;
      j++;
    }
    return j;
  }

  if (PREPS.has(w[0]) || ADVERBS.has(w[0]) || CLAUSE.has(w[0])) return 0;
  return 1;
}

function questionToStatement(text, names = []) {
  const tokens = String(text || "").replace(/\?+\s*$/, "").trim().split(/\s+/).filter(Boolean);
  if (tokens.length < 2) return null;

  const aux = classifyAux(split(tokens[0]).core);
  if (!aux) return tokens.map((t, i) => swapToken(t, i === 0)).join(" ");

  const rest = tokens.slice(1);
  const length = subjectLength(rest, names);
  if (!length || length >= rest.length) return null;

  const subjectTokens = rest.slice(0, length);
  const tail = rest.slice(length);
  const subjectKey = length === 1 ? norm(split(subjectTokens[0]).core) : "";
  const wasYou = subjectKey === "you" || subjectKey === "u";
  const wasI = subjectKey === "i";

  const subject = subjectTokens.map(t => swapToken(t, true)).join(" ");
  const swappedTail = tail.map(t => swapToken(t, false));

  let base = aux.base;
  const neg = aux.neg;

  if (aux.type === "be") {
    if (wasYou && base === "are") base = "am";
    else if (wasYou && base === "were") base = "was";
    else if (wasI && base === "am") base = "are";
    else if (wasI && base === "was") base = "were";
    return [subject, neg ? negative(base) : base, ...swappedTail].join(" ");
  }

  if (aux.type === "have") return [subject, neg ? negative(base) : base, ...swappedTail].join(" ");

  // Modals and do/does/did need a verb right after the subject. If a function word is there,
  // the subject is probably longer than the common patterns can safely parse.
  if (NOT_VERB.has(norm(split(swappedTail[0]).core))) return null;

  if (aux.type === "modal") return [subject, neg ? negative(base) : base, ...swappedTail].join(" ");
  if (neg) return [subject, negative(base), ...swappedTail].join(" ");

  const verbCore = norm(split(swappedTail[0]).core);
  if (ADVERBS.has(verbCore)) return [subject, base, ...swappedTail].join(" ");

  // "did poop sucko died": the real verb is probably the already-past word at the end,
  // so the earlier words are part of a name we can't parse. Let the fallback handle it.
  if (base === "did" && swappedTail.length >= 2 &&
      isPastVerb(norm(split(swappedTail[swappedTail.length - 1]).core)) && !isPastVerb(verbCore)) {
    return null;
  }

  const { pre, post } = split(swappedTail[0]);
  const verb = (base === "did" || base === "do" || base === "does") && isPastVerb(verbCore)
    ? verbCore
    : base === "did" ? toPast(verbCore)
    : base === "does" ? toThird(verbCore)
    : verbCore;
  return [subject, pre + verb + post, ...swappedTail.slice(1)].join(" ");
}

module.exports = { questionToStatement, toPast, toThird };
