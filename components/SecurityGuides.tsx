"use client";

import { BookMarked, FileCheck2, Fingerprint, Radar, ScanSearch, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface GuideStep {
  title: string;
  detail: string;
}

interface Guide {
  title: string;
  summary: string;
  steps: GuideStep[];
}

interface Reference {
  name: string;
  note: string;
  url?: string;
}

interface Bucket {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  guides: Guide[];
  frameworks: Reference[];
  tools: Reference[];
}

const BUCKETS: Bucket[] = [
  {
    id: "code-and-contract-security",
    icon: ScanSearch,
    title: "Code & contract security",
    summary: "Everything that has to be right before a contract ever touches real funds.",
    guides: [
      {
        title: "Writing and formatting the contract",
        summary: "Before an audit even starts, the contract needs to follow the conventions reviewers and tools expect.",
        steps: [
          {
            title: "Start from the official language reference",
            detail:
              "The Solidity documentation (docs.soliditylang.org) is the canonical source for syntax, the type system, and version-specific behavior. Check it before trusting a tutorial or blog post.",
          },
          {
            title: "Follow the official style guide",
            detail:
              "Solidity's own style guide defines file layout order (pragma, imports, interfaces, libraries, then contracts), and within a contract: state variables, events, errors, modifiers, constructor, then functions grouped external, public, internal, private.",
          },
          {
            title: "Document every function with NatSpec",
            detail:
              "The Ethereum Natural Language Specification format (/// or /** */ comments using @notice, @dev, @param, @return tags) generates human-readable docs and is what auditors expect to see explaining intent, not just implementation.",
          },
          {
            title: "Build on audited reference implementations",
            detail:
              "Don't write access control, token, or escrow logic from scratch. Start from OpenZeppelin Contracts, which are widely reviewed and follow consistent style and security conventions.",
          },
          {
            title: "Follow checks-effects-interactions",
            detail:
              "Validate conditions first, update the contract's own state second, and only then call external contracts or transfer funds. This ordering convention prevents most reentrancy issues before an audit ever finds them.",
          },
          {
            title: "Structure the project with a standard framework",
            detail:
              "Foundry or Hardhat impose a conventional folder structure (contracts/, scripts/, test/) that reviewers and tooling already know how to navigate.",
          },
          {
            title: "Run the formatter and linter before requesting review",
            detail:
              "solhint and prettier-plugin-solidity catch style violations automatically, so a human review can focus on logic, not formatting.",
          },
        ],
      },
      {
        title: "Running a smart contract audit",
        summary: "The sequence a reviewer works through before signing off on production code.",
        steps: [
          {
            title: "Map the attack surface",
            detail:
              "List every external call, every function that moves funds or changes state, and every place the contract reads outside data.",
          },
          {
            title: "Check reentrancy",
            detail: "Trace each external call to see whether state updates happen before or after it, and flag any call-then-update ordering.",
          },
          {
            title: "Check the arithmetic",
            detail: "Confirm overflow protection is actually active, watching for unchecked blocks that quietly disable it.",
          },
          {
            title: "Verify access control",
            detail: "Confirm every privileged function checks msg.sender against a defined role, not tx.origin, and that role assignment itself is protected.",
          },
          {
            title: "Stress-test the business logic",
            detail: "Run the contract through the cases the happy path doesn't cover: partial shipments, disputes, cancellations.",
          },
          {
            title: "Check oracle dependencies",
            detail: "Find every place external data enters the contract and ask what happens if that data is wrong, late, or manipulated.",
          },
          {
            title: "Look for denial-of-service vectors",
            detail: "Unbounded loops or external calls that can be forced to fail and block the entire function.",
          },
          {
            title: "Review upgrade paths",
            detail: "For proxies: check storage-layout compatibility and confirm who is actually able to trigger an upgrade.",
          },
          {
            title: "Re-test after every fix",
            detail: "Each finding gets a fix and a regression test, not just a line item in a report.",
          },
        ],
      },
      {
        title: "Proving the contract behaves correctly",
        summary: "Going beyond a one-time audit into ongoing verification.",
        steps: [
          {
            title: "Write down the invariants",
            detail: "The properties that must always hold, for example: \"escrowed funds only leave through executePayment.\"",
          },
          {
            title: "Fuzz test",
            detail: "Run thousands of randomized inputs against the contract and confirm the invariants hold under all of them.",
          },
          {
            title: "Formally verify the highest-value invariants",
            detail: "Where tooling supports it, prove the property mathematically rather than testing it probabilistically.",
          },
          {
            title: "Cover every state transition",
            detail: "Including the ones that are supposed to fail; confirm they actually revert.",
          },
          {
            title: "Deploy in stages",
            detail: "Testnet, then a capped-value mainnet pilot, then full production.",
          },
        ],
      },
    ],
    frameworks: [
      {
        name: "Solidity documentation",
        note: "The official language reference.",
        url: "https://docs.soliditylang.org/",
      },
      {
        name: "Solidity Style Guide",
        note: "Canonical file and code layout conventions.",
        url: "https://docs.soliditylang.org/en/latest/style-guide.html",
      },
      {
        name: "NatSpec Format",
        note: "The comment format for documenting functions and contracts.",
        url: "https://docs.soliditylang.org/en/latest/natspec-format.html",
      },
      {
        name: "OWASP Smart Contract Top 10",
        note: "The most common vulnerability classes, ranked.",
        url: "https://owasp.org/www-project-smart-contract-top-10/",
      },
      {
        name: "SWC Registry",
        note: "Smart Contract Weakness Classification, the taxonomy auditors reference by ID.",
        url: "https://swcregistry.io/",
      },
      {
        name: "ConsenSys Smart Contract Best Practices",
        note: "The widely used baseline coding guide.",
        url: "https://consensys.github.io/smart-contract-best-practices/",
      },
    ],
    tools: [
      { name: "Foundry", note: "Dev framework with built-in fuzzing and test tooling.", url: "https://book.getfoundry.sh/" },
      { name: "Hardhat", note: "Alternative dev framework and task runner.", url: "https://hardhat.org/docs" },
      {
        name: "solhint / prettier-plugin-solidity",
        note: "Linting and formatting, run before human review.",
        url: "https://protofire.github.io/solhint/",
      },
      { name: "OpenZeppelin Contracts", note: "Audited, reusable base implementations.", url: "https://docs.openzeppelin.com/contracts/" },
      { name: "Slither", note: "Static analysis (Trail of Bits).", url: "https://github.com/crytic/slither" },
      { name: "Mythril / MythX", note: "Symbolic execution and vulnerability scanning.", url: "https://github.com/Consensys/mythril" },
      { name: "Echidna", note: "Property-based fuzz testing (Trail of Bits).", url: "https://github.com/crytic/echidna" },
      { name: "Certora Prover", note: "Formal verification of contract invariants.", url: "https://www.certora.com/" },
    ],
  },
  {
    id: "identity-and-access",
    icon: Fingerprint,
    title: "Identity & access",
    summary: "Who, or what system, is allowed to do what, and how that's enforced.",
    guides: [
      {
        title: "Implementing access control",
        summary: "Replacing a single owner key with permissions that match how the business actually operates.",
        steps: [
          {
            title: "Define the roles the business needs",
            detail: "Before writing any code: who can confirm delivery, who can approve, who can pause.",
          },
          {
            title: "Implement role-based access control",
            detail: "e.g. OpenZeppelin AccessControl, instead of a single owner key controlling everything.",
          },
          {
            title: "Require multiple signatures",
            detail: "For high-value or administrative actions, so no single signer can act alone.",
          },
          {
            title: "Add a timelock to privileged changes",
            detail: "A mandatory delay before admin functions take effect, so a compromised key can't act instantly.",
          },
          {
            title: "Map roles to enterprise identity",
            detail: "SSO/SAML/OIDC instead of raw wallet addresses, wherever an off-chain identity layer sits in front.",
          },
          {
            title: "Add KYC/AML gating where required",
            detail: "For counterparties where regulation requires verifying who's on the other side before a contract activates.",
          },
          {
            title: "Build a scoped emergency pause",
            detail: "Restricted triggers, and a logged audit trail of exactly who used it and when.",
          },
        ],
      },
      {
        title: "Managing keys and custody",
        summary: "Protecting the credentials that can move funds or change contract behavior.",
        steps: [
          {
            title: "Inventory every wallet",
            detail: "Anything that can move funds or change contract state needs to be on the list.",
          },
          {
            title: "Put treasury and admin functions behind a multi-sig",
            detail: "No single person should be able to move significant value alone.",
          },
          {
            title: "Use hardware security modules or cold storage",
            detail: "For long-term holdings that don't need to move frequently.",
          },
          {
            title: "Separate duties",
            detail: "The wallet paying gas isn't the same wallet holding treasury funds.",
          },
          {
            title: "Write and test a key-rotation runbook",
            detail: "For when a signer leaves the organization or a device is compromised, and actually rehearse it.",
          },
        ],
      },
    ],
    frameworks: [
      { name: "NIST SP 800-63", note: "Digital identity guidelines.", url: "https://pages.nist.gov/800-63-3/" },
      {
        name: "NIST SP 800-53 (AC family)",
        note: "Access control requirements.",
        url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      },
      {
        name: "OWASP ASVS",
        note: "Application Security Verification Standard, access control section.",
        url: "https://owasp.org/www-project-application-security-verification-standard/",
      },
    ],
    tools: [
      {
        name: "OpenZeppelin AccessControl / Ownable2Step",
        note: "Role-based permission contracts.",
        url: "https://docs.openzeppelin.com/contracts/access-control",
      },
      { name: "Safe (formerly Gnosis Safe)", note: "Multi-signature wallet infrastructure.", url: "https://safe.global/" },
      { name: "Fireblocks / BitGo", note: "Institutional key custody and MPC." },
      { name: "AWS KMS / CloudHSM", note: "Hardware-backed key management." },
      { name: "Hardware keys (YubiKey, Ledger)", note: "Physical signer protection." },
    ],
  },
  {
    id: "data-and-infrastructure-integrity",
    icon: Radar,
    title: "Data & infrastructure integrity",
    summary: "The real-world data feeding the contract, and the systems it runs on, need the same scrutiny as the code.",
    guides: [
      {
        title: "Assessing oracle and data-feed integrity",
        summary: "A contract can only act on the data it's given, so that data has to be hard to fake.",
        steps: [
          {
            title: "Identify every off-chain dependency",
            detail: "Every condition in the contract that depends on data from outside the chain.",
          },
          {
            title: "Check for single points of failure",
            detail: "Whether any of those conditions rely on just one data source.",
          },
          {
            title: "Add aggregation where value justifies it",
            detail: "Median or majority-vote across independent feeds rather than trusting one.",
          },
          {
            title: "Add staleness checks",
            detail: "Reject data older than an acceptable window instead of assuming it's still current.",
          },
          {
            title: "Add deviation thresholds",
            detail: "Flag an anomalous reading instead of letting the contract auto-execute on it.",
          },
        ],
      },
      {
        title: "Hardening infrastructure and nodes",
        summary: "The servers and endpoints connecting the business to the network need production-grade treatment.",
        steps: [
          {
            title: "Map every RPC provider, node, and gateway",
            detail: "Everything that connects the business to the network belongs on this map.",
          },
          {
            title: "Add redundant providers",
            detail: "So a single outage doesn't stall settlement.",
          },
          {
            title: "Put DDoS protection and rate limiting in front of public endpoints",
            detail: "The same baseline any production system needs.",
          },
          {
            title: "Segment the network",
            detail: "Transaction-signing systems sit apart from everything else.",
          },
          {
            title: "Bring patching and monitoring up to standard",
            detail: "Node and validator infrastructure held to the same bar as any other production system.",
          },
        ],
      },
      {
        title: "Testing the integration surface",
        summary: "Often the riskiest part of the system, because it's rarely scrutinized as closely as the contract itself.",
        steps: [
          {
            title: "Map the APIs and middleware",
            detail: "Everything connecting ERP and finance systems to the blockchain layer.",
          },
          {
            title: "Test authentication and authorization",
            detail: "On every one of those integration points, not just the obvious ones.",
          },
          {
            title: "Validate every input",
            detail: "Anything crossing from off-chain systems into on-chain calls needs to be checked, not trusted.",
          },
          {
            title: "Check for replay risk",
            detail: "Whether a captured request can simply be resent.",
          },
          {
            title: "Review error handling",
            detail: "For information leakage, like stack traces or internal infrastructure details exposed to a caller.",
          },
        ],
      },
    ],
    frameworks: [
      {
        name: "NIST SP 800-53 (SC family)",
        note: "System and communications protection.",
        url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      },
      {
        name: "OWASP API Security Top 10",
        note: "For the integration surface specifically.",
        url: "https://owasp.org/API-Security/editions/2023/en/0x00-header/",
      },
    ],
    tools: [
      { name: "Chainlink", note: "Decentralized oracle network.", url: "https://docs.chain.link/" },
      { name: "Pyth Network", note: "Low-latency price and market data feeds.", url: "https://docs.pyth.network/" },
      { name: "Forta", note: "Real-time on-chain threat detection.", url: "https://forta.org/" },
      { name: "Infura / Alchemy / QuickNode", note: "Redundant RPC infrastructure." },
      { name: "Cloudflare / AWS Shield", note: "DDoS protection." },
    ],
  },
  {
    id: "operations-and-compliance",
    icon: FileCheck2,
    title: "Operations & compliance",
    summary: "What happens after go-live: watching the system and proving what happened to auditors and regulators.",
    guides: [
      {
        title: "Building monitoring and incident response",
        summary: "Catching a problem in minutes instead of finding it in a quarterly reconciliation.",
        steps: [
          {
            title: "Define what normal looks like",
            detail: "Typical approval timing, typical destination addresses: the baseline anomalies get measured against.",
          },
          {
            title: "Build alerts for deviations",
            detail: "Off-pattern approvals, withdrawals to unrecognized addresses, repeated failed calls that suggest probing.",
          },
          {
            title: "Write a pause/freeze runbook",
            detail: "Naming exactly who is authorized to act, and under what conditions.",
          },
          {
            title: "Run a tabletop exercise",
            detail: "Simulate a compromised key or a manipulated oracle feed before it happens for real.",
          },
          {
            title: "Update the runbook after every exercise",
            detail: "And after every real incident. A runbook that never changes hasn't been tested honestly.",
          },
        ],
      },
      {
        title: "Preparing for regulatory and audit review",
        summary: "Enterprise adoption depends on being able to show exactly what happened, when, and under whose authority.",
        steps: [
          {
            title: "Identify the applicable frameworks",
            detail: "SOX, SOC 2, or industry-specific rules the business already answers to.",
          },
          {
            title: "Map on-chain events to controls",
            detail: "Tie each relevant contract event to the specific control it satisfies.",
          },
          {
            title: "Decide what stays on-chain",
            detail: "Versus what's kept off a public ledger, like commercially sensitive terms or personal data.",
          },
          {
            title: "Produce audit-ready reports",
            detail: "Tying every state transition to a responsible party and a timestamp.",
          },
        ],
      },
    ],
    frameworks: [
      {
        name: "NIST Cybersecurity Framework (CSF) 2.0",
        note: "Overall program structure.",
        url: "https://www.nist.gov/cyberframework",
      },
      { name: "SOC 2", note: "Trust-services criteria most enterprise counterparties will ask about." },
      { name: "ISO/IEC 27001", note: "Information security management system certification." },
      {
        name: "FATF Travel Rule guidance",
        note: "Relevant wherever value transfer crosses institutional boundaries.",
        url: "https://www.fatf-gafi.org/en/topics/virtual-assets.html",
      },
    ],
    tools: [
      { name: "OpenZeppelin Defender", note: "Contract operations, monitoring, and admin automation.", url: "https://docs.openzeppelin.com/defender/" },
      { name: "Tenderly", note: "Transaction simulation and monitoring.", url: "https://tenderly.co/" },
      { name: "Chainalysis / TRM Labs / Elliptic", note: "On-chain monitoring and compliance analytics." },
    ],
  },
];

function ReferenceName({ reference }: { reference: Reference }) {
  if (reference.url) {
    return (
      <a
        href={reference.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-400"
      >
        {reference.name}
      </a>
    );
  }
  return <span className="font-medium text-slate-800">{reference.name}</span>;
}

export function SecurityGuides() {
  return (
    <div className="space-y-6">
      {/* Jump nav */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3">
        {BUCKETS.map((bucket) => (
          <a
            key={bucket.id}
            href={`#${bucket.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <bucket.icon className="h-3.5 w-3.5 text-slate-400" />
            {bucket.title}
          </a>
        ))}
      </div>

      {BUCKETS.map((bucket) => (
        <section
          key={bucket.id}
          id={bucket.id}
          className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600">
              <bucket.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{bucket.title}</h2>
              <p className="text-sm text-slate-500">{bucket.summary}</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {bucket.guides.map((guide) => (
              <div key={guide.title} className="rounded-xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-900">{guide.title}</p>
                <p className="mt-1 text-sm text-slate-500">{guide.summary}</p>

                <ol className="mt-5 space-y-4">
                  {guide.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                        <p className="mt-0.5 text-sm text-slate-500">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5">
                <BookMarked className="h-3.5 w-3.5 text-slate-400" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Frameworks &amp; standards</p>
              </div>
              <ul className="mt-2.5 space-y-2">
                {bucket.frameworks.map((ref) => (
                  <li key={ref.name} className="text-sm">
                    <ReferenceName reference={ref} />
                    <span className="text-slate-500">: {ref.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-slate-400" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tools</p>
              </div>
              <ul className="mt-2.5 space-y-2">
                {bucket.tools.map((ref) => (
                  <li key={ref.name} className="text-sm">
                    <ReferenceName reference={ref} />
                    <span className="text-slate-500">: {ref.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <p className="text-center text-xs text-slate-400">
        Named as common industry reference points, not endorsements. Evaluate fit for your own stack and risk
        profile.
      </p>
    </div>
  );
}
