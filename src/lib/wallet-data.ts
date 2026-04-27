export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  chain: string;
  balance: number;
  price: number;
  change24h: number;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: "send" | "receive" | "swap";
  asset: string;
  amount: number;
  value: number;
  address: string;
  timestamp: number;
  status: "completed" | "pending" | "failed";
}

export const assets: CryptoAsset[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", chain: "Bitcoin", balance: 0.4821, price: 67420, change24h: 2.34, icon: "₿", color: "#F7931A" },
  { id: "eth", symbol: "ETH", name: "Ethereum", chain: "Ethereum", balance: 3.215, price: 3520, change24h: 1.12, icon: "Ξ", color: "#627EEA" },
  { id: "bnb", symbol: "BNB", name: "BNB", chain: "BSC", balance: 12.4, price: 612, change24h: -0.84, icon: "B", color: "#F3BA2F" },
  { id: "sol", symbol: "SOL", name: "Solana", chain: "Solana", balance: 48.7, price: 178, change24h: 4.21, icon: "◎", color: "#9945FF" },
  { id: "matic", symbol: "MATIC", name: "Polygon", chain: "Polygon", balance: 1240, price: 0.72, change24h: -1.45, icon: "⬡", color: "#8247E5" },
  { id: "usdt", symbol: "USDT", name: "Tether", chain: "Ethereum", balance: 2840.5, price: 1.0, change24h: 0.01, icon: "₮", color: "#26A17B" },
];

export const transactions: Transaction[] = [
  { id: "1", type: "receive", asset: "ETH", amount: 0.5, value: 1760, address: "0x742d…3a8c", timestamp: Date.now() - 1000 * 60 * 30, status: "completed" },
  { id: "2", type: "send", asset: "USDT", amount: 250, value: 250, address: "0x9e1c…f2b1", timestamp: Date.now() - 1000 * 60 * 60 * 5, status: "completed" },
  { id: "3", type: "swap", asset: "BNB → ETH", amount: 2, value: 1224, address: "Internal", timestamp: Date.now() - 1000 * 60 * 60 * 26, status: "completed" },
  { id: "4", type: "receive", asset: "SOL", amount: 12, value: 2136, address: "5fHn…Ky3v", timestamp: Date.now() - 1000 * 60 * 60 * 48, status: "completed" },
  { id: "5", type: "send", asset: "BTC", amount: 0.012, value: 809, address: "bc1q…m2k7", timestamp: Date.now() - 1000 * 60 * 60 * 72, status: "pending" },
];

export const dapps = [
  { id: "uniswap", name: "Uniswap", category: "DEX", url: "https://app.uniswap.org", color: "#FF007A", icon: "🦄" },
  { id: "opensea", name: "OpenSea", category: "NFT", url: "https://opensea.io", color: "#2081E2", icon: "🌊" },
  { id: "aave", name: "Aave", category: "Lending", url: "https://app.aave.com", color: "#B6509E", icon: "👻" },
  { id: "pancake", name: "PancakeSwap", category: "DEX", url: "https://pancakeswap.finance", color: "#D1884F", icon: "🥞" },
  { id: "lido", name: "Lido", category: "Staking", url: "https://lido.fi", color: "#00A3FF", icon: "💧" },
  { id: "curve", name: "Curve", category: "DEX", url: "https://curve.fi", color: "#A5A4F6", icon: "📈" },
];

export const totalBalance = () =>
  assets.reduce((sum, a) => sum + a.balance * a.price, 0);

export const formatCurrency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const formatCrypto = (n: number, symbol: string) =>
  `${n.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${symbol}`;
