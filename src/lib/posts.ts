export type PostListItem = {
  slug?: string;
  date: string;
  title: string;
  /** When set, overrides the default date-based blur rule. */
  blurred?: boolean;
};

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "lines"; lines: readonly string[] }
  | { type: "heading"; text: string };

export type PublishedPost = PostListItem & {
  slug: string;
  content: readonly PostBlock[];
};

export const publishedPosts = [
  {
    slug: "design-in-the-era-of-agents-which-metaphor-are-we-selecting",
    date: "16/06/2026",
    title: "Design in the Era of Agents: Which Metaphor Are We Selecting?",
    content: [
      {
        type: "paragraph",
        text: "I’ve been stuck on a question that sounds abstract until you try to build something with it: does the perceptual metaphor initially chosen for a technology determine its evolutionary trajectory?",
      },
      {
        type: "paragraph",
        text: 'When a technological category is born, most of the time what we define as "the product" is more the representation of the underlying mechanism than the lower level itself.',
      },
      {
        type: "paragraph",
        text: "For you as a user, your phone is the object not how it works, like the computer is not the transistor, the software is not the code, and the Internet is not the TCP/IP protocol.",
      },
      {
        type: "paragraph",
        text: "For most people, the category coincides with its dominant interface. To make an analogy with Kant (not essential, but it does make the concept embarrassingly intuitive ;)), the interface has always been the phenomenal representation of the product, designed with the aim of defining the modalities of interaction with the object and the metaphor to which to associate them.",
      },
      {
        type: "paragraph",
        text: 'The dominant phenomenal representation of a technology does not merely make it usable: it unequivocally brings along the perceptual metaphor it evokes. And that metaphor — to which you associate the interface and consequently the product — does not only influence marketing or the initial UX. It influences what users expect, what designers consider natural, which problems seem important, and which directions seem "obvious". In essence, it tends to orient its future evolution, generating a true cultural inertia.',
      },
      {
        type: "paragraph",
        text: "One naturally wonders: how would certain product categories have evolved if we had changed the perceptual metaphor initially chosen for the design of the interface?",
      },
      {
        type: "paragraph",
        text: "It may seem counterintuitive, but the moment you associate an interface with a mental image, you identify the product within the interface itself. Consequently, the product expresses itself through that metaphor, and its natural evolution, by inertia, will tend to accommodate the expectations linked to that image.",
      },
      {
        type: "paragraph",
        text: "If the content within a computer is presented as a stacking of pages, the user will expect to be able to turn the page, organize them into archives or libraries, place a bookmark, or close the sheet and put it away. The metaphor of the page clearly refers to the card-based computers of the past: not because it was the only possibility, but because the initial perceptual metaphor generated a specific inertia.",
      },
      {
        type: "paragraph",
        text: 'But what if they had been boxes? One would expect to be able to stack them, a concept of a "full container" would emerge (an evolution towards the concept of containers), with objects of different typologies inside, not just pages, with entirely different shapes, sizes, and interactions with the screen space.',
      },
      {
        type: "paragraph",
        text: "Or again: how would the concept of social networks have evolved if the feed, instead of evoking an infinite page of multimedia content (as if it were a photo and video album), had chosen a different metaphor, like a large tree? How radically would the architecture of UI flows have changed, along with how users perceive the application, the associated mental images, and, consequently, what naturally becomes expected as an evolution?",
      },
      {
        type: "paragraph",
        text: "No one questions the metaphor of the page or the window. It is so deeply rooted that it seems inevitable, but this point of reflection serves to remind us that it was not inevitable at all. And here the question shifts from whether to how much the initial metaphor determines the evolutionary trajectory.",
      },
      {
        type: "paragraph",
        text: "If representation influences the direction of development, what metaphor are we choosing today for agents?",
      },
      { type: "heading", text: "Software as an Invisible Infrastructure" },
      {
        type: "paragraph",
        text: 'It rarely happens that products do not have a phenomenal representation to relate to; one never interfaces directly with the noumenon. But when a new category is born, especially if derived from existing products, the definition becomes more blurred: to what extent are we using the previous product? Is this new paradigm truly definable as a "product", or is it rather an infrastructure? If it can already lean on the phenomenal representation it derives from, does it make sense to design one custom-tailored to it?',
      },
      {
        type: "paragraph",
        text: "The answer to the last question is a resounding yes, precisely because of how determining the perceptual metaphor is for future developments.",
      },
      {
        type: "paragraph",
        text: "Let's try to apply this reflection to a concrete context: AI and MCP (Model Context Protocol).",
      },
      {
        type: "paragraph",
        text: 'The moment the value — and consequently the product — is no longer a static functionality (e.g., "this program cuts videos"), but is a dynamic workflow (the AI using MCP to connect Unity, Git, and the file system to create a game for you), are we selling the process or the output?',
      },
      {
        type: "paragraph",
        text: "Today, many people are still trying to represent AI to themselves as traditional software: they open ChatGPT just as they would open Photoshop or Excel. But if you take MCP, agents, tool calling, and service orchestration seriously, the product is no longer the software.",
      },
      {
        type: "lines",
        lines: ["The product becomes:", "a capability,", "a result,", "a transformation of the state of the world."],
      },
      {
        type: "paragraph",
        text: "The user no longer uses fifteen different pieces of software: they express an intention, and the AI decides how to achieve it. In this sense, software is effectively becoming an invisible infrastructure.",
      },
      { type: "heading", text: "The Paradox of the Perceptual Black Box" },
      {
        type: "paragraph",
        text: "If the user cannot see the available tools, does not know the functionalities, and does not know what is possible to do, how can a perception of the product be formed? (Leaving aside for a moment the purely UX-related implications, which would deserve an examination of their own).",
      },
      {
        type: "paragraph",
        text: "Historically, this situation is rare. In the GUI you saw the buttons, in a car you see the steering wheel, in Photoshop you see the tools: the interface itself taught the possibilities.",
      },
      {
        type: "paragraph",
        text: 'Moving towards a world of "workflow as a product", does the conversational interface perhaps become our raw way of relating directly to the noumenon, without any intermediary phenomenal representation? Does it mean that today we use the product without seeing it, in the most literal sense possible, without even a minimal surface (an object, an icon, a body) upon which to land our perception?',
      },
      {
        type: "paragraph",
        text: 'This generates a paradox: the AI is perfectly aware of the tools at its disposal and is autonomous in choosing or proposing the right tool to achieve a result; the user, however, not being aware of it, cannot ask for something they do not know they can do. It is a black box. The AI is perfectly capable of executing anything you ask, but does it make sense for there to be no interface proper to this specific transition in the level of abstraction?',
      },
      {
        type: "paragraph",
        text: 'The "naked-chat" we use today risks being simply the equivalent of the terminal before applications. Not because it lacks an interface adequate to the noumenon (the underlying layers we interact with are already phenomena, even if they become the noumenon of the product built on top of them), but because a phenomenal identity built over this infrastructure has not yet emerged.',
      },
      { type: "heading", text: "Which Metaphor for the Future?" },
      {
        type: "paragraph",
        text: "It makes sense to wonder how the phenomenal representation of this new category of products should be thought out, considering that we will tend to identify the product itself within its representation.",
      },
      {
        type: "paragraph",
        text: "What if the phenomenal representation were shifting from the set of tools to the agent that utilizes them?",
      },
      {
        type: "paragraph",
        text: "If representation influences evolution, then the way we depict AI agents in the coming years will profoundly condition their trajectory:",
      },
      {
        type: "lines",
        lines: [
          "If we represent them as chatbots, they will evolve toward better chatbots.",
          "If we represent them as personal assistants, they will evolve toward assistants.",
          "If we represent them as ambient operating systems, they will evolve toward invisible infrastructures integrated into space.",
        ],
      },
      {
        type: "paragraph",
        text: "The metaphor chosen to represent the noumenon is not neutral. It determines what society will expect from that technology and the direction toward which it will be pushed by inertia.",
      },
      {
        type: "paragraph",
        text: 'When a new technological category is born, what we call the "product" rarely coincides with its internal mechanism. Because of this, the most interesting questions to ask ourselves today are: what is the right metaphor to represent a system composed of hundreds of invisible tools orchestrated by an intelligence that acts on intentions rather than commands?',
      },
      {
        type: "paragraph",
        text: "And above all: which initial metaphor risks trapping agents in the wrong trajectory for the next twenty years?",
      },
    ],
  },
  {
    slug: "the-document-metaphor-was-right-but-was-it-inevitable",
    date: "19/06/2026",
    title: "Skeuomorphism Never Left: It Just Got Invisible",
    content: [
      {
        type: "paragraph",
        text: "The document metaphor was the right path to choose. But was it inevitable?",
      },
      {
        type: "paragraph",
        text: "The page was skeuomorphism before we had a word for it. We called it realism, then flat design, then convinced ourselves we had moved on. We hadn't, the filing cabinet just stopped looking like wood.",
      },
      {
        type: "paragraph",
        text: "The metaphor chosen at the time, rightly so, given that a computer wrote things and needed to let you save text and return to it later, was: page. Multiple pages aggregated? A folder. Multiple folders and pages aggregated and stored? An archive or library. Elegant.",
      },
      {
        type: "paragraph",
        text: "But what if the information store, meant to let you work on something else and then return to your previous work by creating separate compartments, had chosen the metaphor of trees, as if content were information written into the veins of a leaf? An aggregate of leaves kept together is a branch. The equivalent of the library becomes a tree. That would have led, in turn, to a desktop more like the layout of a garden than what we have now.",
      },
      {
        type: "paragraph",
        text: "Yes, metaphors influence how we perceive software, but they are not limited to that. This is harder to see in hindsight, since what was once the metaphor used to represent a new category has now become its definition: something we take for granted, as if it had been inevitable. Yet metaphors determine which evolutions of software seem natural and which seem unnatural.",
      },
      { type: "heading", text: "The Vocabulary of the Page" },
      {
        type: "paragraph",
        text: "The current document metaphor makes it almost inevitable to keep walking further down the road already taken, defining by inertia concepts such as: open, close, archive, copy, trash, browse, sort. All of it recalls document management.",
      },
      {
        type: "paragraph",
        text: "But what if we had opted for the metaphor of the leaf? I'm not questioning the choice of the page, stay with me to grasp the point. The operations that would have emerged naturally (literally, lol) would be something like: grow, prune, graft, propagate, cultivate, observe relationships, follow paths.",
      },
      {
        type: "paragraph",
        text: "Notice how tiring it is today to describe the saving of environments containing information without talking about archiving or files. I'll throw you a challenge: try to describe a file system without using words derived from document archiving. Normally we say: file, folder, directory, archive, library, document, trash, copy, move, path, explore. We don't even notice it anymore, but all of these come from the world of managing physical documents. The metaphor has become so dominant that it makes it hard to even imagine alternatives.",
      },
      {
        type: "paragraph",
        text: "Now imagine explaining to someone who has never seen a computer what's happening behind the scenes, but using a biological metaphor instead.",
      },
      {
        type: "lines",
        lines: [
          "From: \"I saved the file in the Projects folder.\"",
          "To: \"I grew this leaf on the Projects branch.\"",
          "From: \"I copied the file.\"",
          "To: \"I propagated this leaf.\"",
          "From: \"I moved the folder.\"",
          "To: \"I transplanted this branch.\"",
        ],
      },
      {
        type: "paragraph",
        text: "Sounds strange, right? Not because it's less correct. It sounds strange because for forty years we've been immersed in the archival metaphor.",
      },
      {
        type: "lines",
        lines: [
          "File → Leaf",
          "Folder → Branch",
          "Directory → Tree",
          "Library → Forest",
          "Copy → Propagation",
          "Move → Transplant",
          "Delete → Pruning",
          "Desktop → Garden layout",
        ],
      },
      {
        type: "paragraph",
        text: "But the more interesting consequence, more than the vocabulary, is that we probably would have started thinking of information as growing organisms rather than archived documents, and of the desktop as real, proper terrain (an interesting line of thought, in the perspective of finding a paradigm that works transversally from 2D interfaces to spatial computing, but that's perhaps another reflection). It seems like a trivial detail, but language changes how you analyze a problem. Have we ever stopped to think how much of our current way of conceiving information comes from the nature of information itself, and how much comes from the metaphor chosen to represent it?",
      },
      { type: "heading", text: "More Than Aesthetics" },
      {
        type: "paragraph",
        text: "In essence, we're not just talking about a change of aesthetics. It's a decision that touches perceived affordances, the mental models it evokes, the operations that seem obvious, and the future evolutions that seem logical.",
      },
      {
        type: "paragraph",
        text: "If software had adopted a biological metaphor instead of an archival one, would we have invented the same paradigms? Maybe yes, maybe no, but the question is intriguing. The metaphor may not determine evolution on its own, but it undeniably creates strong inertia toward certain directions and makes others less likely.",
      },
      {
        type: "paragraph",
        text: "The fact that it's hard to describe information management without archival language doesn't necessarily prove the metaphor caused the architecture, or that any alternative would have worked equally well. It could also be that the document metaphor succeeded precisely because it described a structure that was already technically convenient.",
      },
      {
        type: "paragraph",
        text: "So the honest version is not black and white. I'm not claiming the metaphor alone determines evolution. I'm asking: are we observing a property of the technology, or a metaphor that is crystallizing?",
      },
      { type: "heading", text: "The Invisible Skeuomorph" },
      {
        type: "paragraph",
        text: "It makes little sense in 2026 to argue about the choice made at the birth of computers. But this is the perfect moment, if not to determine then at least to question, the metaphor taking shape for AI agents and spatial computing.",
      },
      {
        type: "paragraph",
        text: "If today we represent agents as chat, what kinds of evolution are we making natural? And which ones are we making nearly invisible?",
      },
      {
        type: "paragraph",
        text: "Today it's difficult to talk about information management without using the language of archives. In ten years, it might be difficult to talk about AI without using the language of conversation, not because conversation is the only true form, but because we stopped seeing it as a metaphor at all.",
      },
      {
        type: "paragraph",
        text: "Once we've seen that the desktop wasn't so inevitable after all, it was the right choice, but not because there were no alternatives, are we sure that chat is?",
      },
    ],
  },
] as const satisfies readonly PublishedPost[];

const placeholderPosts = [
  { date: "01/12/2016", title: "How I write Integration Tests for Laravel Socialite powered Apps" },
  { date: "01/02/2018", title: "How to use Tailwind CSS in Vue together with CSS Modules" },
  { date: "01/10/2018", title: "How to Encrypt File Uploads with Laravel" },
  { date: "01/12/2018", title: "Create Mocks for API Clients in Laravel" },
  { date: "01/06/2019", title: "GitHub Actions for PHP Developers (HCL)" },
  { date: "01/12/2019", title: "Things 3 Setup" },
  { date: "01/08/2020", title: "Synology NAS Setup (2020)" },
  { date: "01/12/2020", title: "Getting Started with Bash Testing with Bats" },
  { date: "01/02/2021", title: "My Alfred Setup" },
  { date: "01/04/2021", title: "Auto Merge Dependabot Pull Requests with GitHub Actions" },
  { date: "01/05/2021", title: "Deployer on GitHub Actions" },
  { date: "01/12/2022", title: "My updated Things 3 Setup" },
  { date: "01/09/2023", title: "An Opinionated Personal Folder Structure" },
  { date: "01/03/2024", title: "Meal Planning in Things 3" },
] as const satisfies readonly PostListItem[];

/** Chronological order: oldest at index 0, newest at the end. */
export const posts = [...placeholderPosts, ...publishedPosts] as const satisfies readonly PostListItem[];

export function getPostsForDisplay(): PostListItem[] {
  return [...posts].toReversed();
}

export function getLatestPosts(count: number): PostListItem[] {
  return getPostsForDisplay().slice(0, count);
}

const BLUR_BEFORE_DATE = new Date(2026, 5, 1);

function parsePostDate(date: string): Date {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}

/** Posts before 1 June 2026 are blurred unless `blurred` is set explicitly. */
export function isPostBlurred(post: PostListItem): boolean {
  if (post.blurred !== undefined) {
    return post.blurred;
  }
  return parsePostDate(post.date) < BLUR_BEFORE_DATE;
}

export function getPostListItemClassName(post: PostListItem, extra?: string): string {
  const blur = isPostBlurred(post) ? " blur-[3px] opacity-60" : "";
  return `flex min-w-0 flex-col gap-0.5 sm:flex-row sm:gap-3${extra ?? ""}${blur}`;
}

export function getPostBySlug(slug: string): PublishedPost | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}

export function getPostHref(post: PostListItem) {
  return post.slug ? `/blog/${post.slug}` : "#";
}
