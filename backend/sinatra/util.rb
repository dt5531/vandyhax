require 'unirest'
require 'shellwords'

TLDS = ["abbott", "abogado", "ac", "academy", "accountants", "active", "actor", "ad", "adult", "ae", "aero", "af", "ag", "agency", "ai", "airforce", "al", "allfinanz", "alsace", "am", "amsterdam", "an", "android", "ao", "apartments", "aq", "aquarelle", "ar", "archi", "army", "arpa", "as", "asia", "associates", "at", "attorney", "au", "auction", "audio", "autos", "aw", "ax", "axa", "az", "ba", "band", "bank", "bar", "barclaycard", "barclays", "bargains", "bayern", "bb", "bbc", "bd", "be", "beer", "berlin", "best", "bf", "bg", "bh", "bi", "bid", "bike", "bingo", "bio", "biz", "bj", "black", "blackfriday", "bloomberg", "blue", "bm", "bmw", "bn", "bnpparibas", "bo", "boats", "boo", "boutique", "br", "brussels", "bs", "bt", "budapest", "build", "builders", "business", "buzz", "bv", "bw", "by", "bz", "bzh", "ca", "cab", "cal", "camera", "camp", "cancerresearch", "canon", "capetown", "capital", "caravan", "cards", "care", "career", "careers", "cartier", "casa", "cash", "casino", "cat", "catering", "cbn", "cc", "cd", "center", "ceo", "cern", "cf", "cfd", "cg", "ch", "channel", "chat", "cheap", "chloe", "christmas", "chrome", "church", "ci", "citic", "city", "ck", "cl", "claims", "cleaning", "click", "clinic", "clothing", "club", "cm", "cn", "co", "coach", "codes", "coffee", "college", "cologne", "com", "community", "company", "computer", "condos", "construction", "consulting", "contractors", "cooking", "cool", "coop", "country", "courses", "cr", "credit", "creditcard", "cricket", "crs", "cruises", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cz", "dabur", "dad", "dance", "dating", "datsun", "day", "dclk", "de", "deals", "degree", "delivery", "democrat", "dental", "dentist", "desi", "design", "dev", "diamonds", "diet", "digital", "direct", "directory", "discount", "dj", "dk", "dm", "dnp", "do", "docs", "domains", "doosan", "durban", "dvag", "dz", "eat", "ec", "edu", "education", "ee", "eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epson", "equipment", "er", "erni", "es", "esq", "estate", "et", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "fail", "fan", "fans", "farm", "fashion", "feedback", "fi", "finance", "financial", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flights", "florist", "flowers", "flsmidth", "fly", "fm", "fo", "foo", "football", "forex", "forsale", "foundation", "fr", "frl", "frogans", "fund", "furniture", "futbol", "ga", "gal", "gallery", "garden", "gb", "gbiz", "gd", "gdn", "ge", "gent", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "gl", "glass", "gle", "global", "globo", "gm", "gmail", "gmo", "gmx", "gn", "goldpoint", "goo", "goog", "google", "gop", "gov", "gp", "gq", "gr", "graphics", "gratis", "green", "gripe", "gs", "gt", "gu", "guide", "guitars", "guru", "gw", "gy", "hamburg", "hangout", "haus", "healthcare", "help", "here", "hermes", "hiphop", "hiv", "hk", "hm", "hn", "holdings", "holiday", "homes", "horse", "host", "hosting", "house", "how", "hr", "ht", "hu", "ibm", "id", "ie", "ifm", "il", "im", "immo", "immobilien", "in", "industries", "infiniti", "info", "ing", "ink", "institute", "insure", "int", "international", "investments", "io", "iq", "ir", "irish", "is", "it", "iwc", "java", "jcb", "je", "jetzt", "jm", "jo", "jobs", "joburg", "jp", "juegos", "kaufen", "kddi", "ke", "kg", "kh", "ki", "kim", "kitchen", "kiwi", "km", "kn", "koeln", "kp", "kr", "krd", "kred", "kw", "ky", "kyoto", "kz", "la", "lacaixa", "land", "lat", "latrobe", "lawyer", "lb", "lc", "lds", "lease", "leclerc", "legal", "lgbt", "li", "lidl", "life", "lighting", "limited", "limo", "link", "lk", "loans", "london", "lotte", "lotto", "lr", "ls", "lt", "ltda", "lu", "luxe", "luxury", "lv", "ly", "ma", "madrid", "maif", "maison", "management", "mango", "market", "marketing", "markets", "marriott", "mc", "md", "me", "media", "meet", "melbourne", "meme", "memorial", "menu", "mg", "mh", "miami", "mil", "mini", "mk", "ml", "mm", "mn", "mo", "mobi", "moda", "moe", "monash", "money", "mormon", "mortgage", "moscow", "motorcycles", "mov", "mp", "mq", "mr", "ms", "mt", "mtpc", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "nagoya", "name", "navy", "nc", "ne", "net", "network", "neustar", "new", "news", "nexus", "nf", "ng", "ngo", "nhk", "ni", "nico", "ninja", "nissan", "nl", "no", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "okinawa", "om", "one", "ong", "onl", "online", "ooo", "oracle", "org", "organic", "osaka", "otsuka", "ovh", "pa", "page", "paris", "partners", "parts", "party", "pe", "pf", "pg", "ph", "pharmacy", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pink", "pizza", "pk", "pl", "place", "plumbing", "pm", "pn", "pohl", "poker", "porn", "post", "pr", "praxi", "press", "pro", "prod", "productions", "prof", "properties", "property", "ps", "pt", "pub", "pw", "py", "qa", "qpon", "quebec", "re", "realtor", "recipes", "red", "rehab", "reise", "reisen", "reit", "ren", "rentals", "repair", "report", "republican", "rest", "restaurant", "reviews", "rich", "rio", "rip", "ro", "rocks", "rodeo", "rs", "rsvp", "ru", "ruhr", "rw", "ryukyu", "sa", "saarland", "sale", "samsung", "sarl", "saxo", "sb", "sc", "sca", "scb", "schmidt", "school", "schule", "schwarz", "science", "scot", "sd", "se", "services", "sew", "sexy", "sg", "sh", "shiksha", "shoes", "shriram", "si", "singles", "site", "sj", "sk", "sky", "sl", "sm", "sn", "so", "social", "software", "sohu", "solar", "solutions", "soy", "space", "spiegel", "spreadbetting", "sr", "st", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "sx", "sy", "sydney", "systems", "sz", "taipei", "tatar", "tattoo", "tax", "tc", "td", "tech", "technology", "tel", "temasek", "tennis", "tf", "tg", "th", "tienda", "tips", "tires", "tirol", "tj", "tk", "tl", "tm", "tn", "to", "today", "tokyo", "tools", "top", "toshiba", "town", "toys", "tr", "trade", "trading", "training", "travel", "trust", "tt", "tui", "tv", "tw", "tz", "ua", "ug", "uk", "university", "uno", "uol", "us", "uy", "uz", "va", "vacations", "vc", "ve", "vegas", "ventures", "versicherung", "vet", "vg", "vi", "viajes", "video", "villas", "vision", "vlaanderen", "vn", "vodka", "vote", "voting", "voto", "voyage", "vu", "wales", "wang", "watch", "webcam", "website", "wed", "wedding", "wf", "whoswho", "wien", "wiki", "williamhill", "wme", "work", "works", "world", "ws", "wtc", "wtf", "xin", "xxx", "xyz", "yachts", "yandex", "ye", "yodobashi", "yoga", "yokohama", "youtube", "yt", "za", "zip", "zm", "zone", "zuerich", "zw"]
REQUIRED = ["com", "net", "org", "biz", "me", "xxx"]

def valid_domain(name)
  response = Unirest.get "https://domainr.p.mashape.com/json/info?client_id=punny-domains&q=#{name}",
    headers:{
    "X-Mashape-Key" => "2eEUDYpFw8msh7MLUhaUgonqN8W8p1sMTQwjsnwWiueugfs4EO",
    "Accept" => "application/json"
  }
    response.code == 200 and response.body["availability"] == "available"
end

def match_phrase(phrase)
  phrase.gsub!(/\s/, '')
  matches = TLDS.map {|tld|
    [(phrase.sub(/#{tld}$/, ".#{tld}") if phrase.match(/#{tld}$/)),
     (phrase.sub(/(.*)#{tld}(.*)/, "\\1.#{tld}/\\2") if phrase.match(/(.*)#{tld}(.*)/))]
  }.flatten.reject(&:nil?)
  matches.concat(REQUIRED.map {|t| "#{phrase}.#{t}"}).uniq
end

def find_unused(phrase)
  match_phrase(phrase).select {|p| valid_domain(p.split('/').first)}
end

def pungen(phrase, profane="")
  pungenbin = File.expand_path('../../pungen_make_pun.py', __FILE__)
  phrases = %x[/usr/bin/env python #{pungenbin} #{Shellwords.escape(phrase)} #{profane}].split(/\n/).map {|s|
    s.strip.gsub(/^\[[^\]]*\]\s*/, '')
  }
  if profane != ""
    phrases.drop(1)
  else
    phrases
  end
end
