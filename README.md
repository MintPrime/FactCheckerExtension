# AIFactCheckerExtension v0.112 - The Legally Distinct Paper Clip "Klippy"!

The **"Klippy" Fact Checker Extension** is an AI browser extension for fact checking (using Google Gemini*). Select or paste text or a screenshot and send it to the Legally Distinct "Klippy" (gemini) who will search online to verify whether your fact is true.

Functions:
- Select text in a browser and select "Klippy's" Fact Checking function to call on him to check your fact.
- Call on "Klippy" through the extension button (maybe a dedicated bookmark, toggleable of course) to access him and all his features on demand. Paste text manually or even provide a screenshot of a fact for him to check. You can also ask him other questions and Gemin- "Klippy" will... "gladly" answer!

Architecture 
- JavaScript-Extension-Shell for a browser integration.
- "Klippy's" side bar and window implemented using Angular.
- Back-end through Node.js: the Gemini*-API-key, prompt and data processing and caching.
- text extraction from images using the python library RapidOCR.

AI Workload
- Gemini* does a preliminary processing round on the input:
- > Checks, whether the input is a real fact or statement and not a joke or opinion. Non-facts will not be processed further.
- > Normalisation of the input to create concrete statements, use said statements to perform online research.

*Other AI services could be easily used, Gemini was chosen because of pricing and direct integration/access to google search.

Potential token cost:
$/1 000 000 tokens
- **INPUT** - 0.75$ for text
- **OUTPUT** - 4.50$ for text
**Google Search** - 5000 free search queries/month. 14$/1000 further queries.

**minimising reasoning/deep thinking is important to save on tokens, as these count as output tokens.
