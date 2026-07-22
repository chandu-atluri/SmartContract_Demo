interface Term {
  term: string;
  definition: string;
}

const TERMS: Term[] = [
  {
    term: "Audit trail",
    definition: "The permanent, timestamped record of every action a contract has taken.",
  },
  {
    term: "Blockchain",
    definition:
      "A shared record of transactions duplicated across many independent computers, making it very hard for one party to alter history unnoticed.",
  },
  {
    term: "Escrow",
    definition: "Funds held by the contract itself rather than either party, released only once agreed conditions are met.",
  },
  {
    term: "Ethereum",
    definition: "The blockchain network this demo is built on. A shared, public computer that many independent parties run copies of.",
  },
  {
    term: "Gas",
    definition:
      "The fee paid to the network to process a transaction. Think of it as postage for every action a contract takes; the cost varies with network congestion.",
  },
  {
    term: "Layer 2",
    definition: "A secondary network built on top of Ethereum that processes transactions more cheaply and settles back to it, for example Arbitrum or Base.",
  },
  {
    term: "Mainnet",
    definition: "The live, production Ethereum network where real value moves.",
  },
  {
    term: "Multi-sig (multi-signature)",
    definition: "A wallet that requires more than one key to approve an action, so no single person can move funds alone.",
  },
  {
    term: "Node",
    definition: "A single computer running a copy of the network. The more independent nodes there are, the harder the network is to tamper with.",
  },
  {
    term: "On-chain / off-chain",
    definition: "On-chain means recorded permanently on the blockchain. Off-chain means it lives in a traditional system instead.",
  },
  {
    term: "Oracle",
    definition:
      "A trusted service that feeds real-world data, like a delivery confirmation, onto the blockchain, since a smart contract can't see outside itself.",
  },
  {
    term: "Private key (signing key)",
    definition:
      "The credential that proves control of a wallet. Whoever holds it can act on the wallet's behalf, so losing it or having it stolen is the crypto equivalent of losing the only signed copy of a check.",
  },
  {
    term: "RPC (Remote Procedure Call)",
    definition: "The technical connection point applications use to read from, or send transactions to, the network.",
  },
  {
    term: "Smart contract",
    definition: "Self-executing code deployed to a blockchain that runs exactly as written, with no ability for a human to quietly change the outcome after the fact.",
  },
  {
    term: "Smart contract audit",
    definition: "An independent security review of a contract's code before it is trusted with real funds.",
  },
  {
    term: "Solidity",
    definition: "The programming language most Ethereum smart contracts are written in.",
  },
  {
    term: "Stablecoin",
    definition: "A digital token designed to hold a stable value, usually pegged 1:1 to a currency like the US dollar, for example USDC.",
  },
  {
    term: "Testnet",
    definition: "A practice version of the network, functionally identical to mainnet, where nothing of real value is at stake.",
  },
  {
    term: "Wallet",
    definition: "An account on the network, controlled by a private key, that can hold funds or trigger a contract's functions.",
  },
];

export function GlossaryTerms() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {TERMS.map((t) => (
          <div key={t.term} className="border-b border-slate-100 pb-5">
            <dt className="text-sm font-semibold text-slate-900">{t.term}</dt>
            <dd className="mt-1.5 text-sm text-slate-500">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
